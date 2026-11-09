const $ = id => document.getElementById(id);
const COLORS = ["blue","red","yellow","green","pink","purple","cyan","orange","grey"];
let tabs = [], activity = {}, selected = new Set();

function keyOf(t, mode) {
  if (mode === "domain") return domainOf(t.url);
  if (mode === "window") return "Window " + t.windowId;
  if (mode === "none") return "All tabs";
  return categorize(t.url, t.title);
}
function lastUsed(t) { return activity[t.id] || t.lastAccessed || Date.now(); }
function ago(ms) { const m = Math.round((Date.now() - ms) / 60000); return m < 60 ? m + "m" : Math.round(m / 60) + "h"; }

function filtered() {
  const q = $("search").value.toLowerCase(), st = $("status").value;
  const seen = {}; tabs.forEach(t => seen[t.url] = (seen[t.url] || 0) + 1);
  return tabs.filter(t => {
    if (q && !(t.title + " " + t.url).toLowerCase().includes(q)) return false;
    if (st === "idle") return Date.now() - lastUsed(t) > 30 * 60000;
    if (st === "dupes") return seen[t.url] > 1;
    if (st === "sleeping") return t.discarded;
    if (st === "audible") return t.audible;
    if (st === "pinned") return t.pinned;
    return true;
  });
}

function render() {
  const mode = $("groupBy").value, list = filtered(), groups = {};
  list.forEach(t => (groups[keyOf(t, mode)] ||= []).push(t));
  $("count").textContent = `${list.length}/${tabs.length} tabs`;
  $("list").innerHTML = "";
  Object.entries(groups).sort((a, b) => b[1].length - a[1].length).forEach(([name, items]) => {
    const g = document.createElement("div"); g.className = "grp";
    const allSel = items.every(t => selected.has(t.id));
    g.innerHTML = `<div class="gh"><input type="checkbox" ${allSel ? "checked" : ""}>${name}<span>${items.length}</span></div>`;
    g.querySelector("input").onchange = e => { items.forEach(t => e.target.checked ? selected.add(t.id) : selected.delete(t.id)); render(); };
    items.forEach(t => {
      const r = document.createElement("div"); r.className = "tab" + (t.discarded ? " zz" : "");
      r.innerHTML = `<input type="checkbox" ${selected.has(t.id) ? "checked" : ""}><img src="${t.favIconUrl || ""}" onerror="this.style.visibility='hidden'"><span class="t" title="${t.url}"></span><small>${ago(lastUsed(t))}</small><button class="x">✖</button>`;
      r.querySelector(".t").textContent = (t.pinned ? "📌 " : "") + (t.audible ? "🔊 " : "") + t.title;
      r.querySelector("input").onchange = e => { e.target.checked ? selected.add(t.id) : selected.delete(t.id); render(); };
      r.querySelector(".t").onclick = () => { chrome.tabs.update(t.id, { active: true }); chrome.windows.update(t.windowId, { focused: true }); };
      r.querySelector(".x").onclick = async () => { await chrome.tabs.remove(t.id); load(); };
      g.appendChild(r);
    });
    $("list").appendChild(g);
  });
}

async function load() {
  tabs = await chrome.tabs.query({});
  activity = (await chrome.storage.local.get("activity")).activity || {};
  const ids = new Set(tabs.map(t => t.id)); selected.forEach(id => ids.has(id) || selected.delete(id));
  render();
}
const sel = () => [...selected];

async function groupTabs(ids, title, color) {
  const byWin = {}; tabs.filter(t => ids.includes(t.id)).forEach(t => (byWin[t.windowId] ||= []).push(t.id));
  for (const tabIds of Object.values(byWin)) {
    const groupId = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(groupId, { title, color, collapsed: false });
  }
}

$("selAll").onclick = () => { const f = filtered(); const all = f.every(t => selected.has(t.id)); f.forEach(t => all ? selected.delete(t.id) : selected.add(t.id)); render(); };
$("doClose").onclick = async () => { if (!selected.size || !confirm(`Close ${selected.size} tab(s)?`)) return; await chrome.tabs.remove(sel()); selected.clear(); load(); };
$("doSleep").onclick = async () => { for (const id of sel()) await chrome.tabs.discard(id).catch(() => {}); selected.clear(); load(); };
$("doGroup").onclick = async () => {
  if (!selected.size) return;
  const name = prompt("Group name:", keyOf(tabs.find(t => t.id === sel()[0]), $("groupBy").value)); if (name === null) return;
  await groupTabs(sel(), name, COLORS[Math.floor(Math.random() * COLORS.length)]); selected.clear(); load();
};
$("autoGroup").onclick = async () => {
  const groups = {}; tabs.filter(t => !t.pinned).forEach(t => (groups[keyOf(t, "category")] ||= []).push(t.id));
  let i = 0; for (const [name, ids] of Object.entries(groups)) await groupTabs(ids, name, COLORS[i++ % COLORS.length]);
  load();
};
$("ungroup").onclick = async () => { const ids = tabs.filter(t => t.groupId !== -1).map(t => t.id); if (ids.length) await chrome.tabs.ungroup(ids); load(); };
["search", "groupBy", "status"].forEach(id => $(id).addEventListener("input", render));

// Settings
const D = { autoClose: true, idleMinutes: 60, keepPinned: true, keepAudible: true, keepGrouped: false, sleepInstead: false, whitelist: [] };
$("tabSettings").onclick = async () => {
  const show = $("settingsView").hidden; $("settingsView").hidden = !show; $("mainView").hidden = show;
  if (!show) return;
  const { settings = {}, closedLog = [] } = await chrome.storage.local.get(["settings", "closedLog"]); const s = { ...D, ...settings };
  ["autoClose", "keepPinned", "keepAudible", "keepGrouped", "sleepInstead"].forEach(k => $(k).checked = s[k]);
  $("idleMinutes").value = s.idleMinutes; $("whitelist").value = s.whitelist.join(", ");
  $("closedLog").innerHTML = closedLog.length ? "" : "<small>None yet</small>";
  closedLog.forEach(c => { const a = document.createElement("a"); a.href = "#"; a.textContent = "↩ " + c.title; a.title = "Reopen " + c.url; a.onclick = () => chrome.tabs.create({ url: c.url }); $("closedLog").appendChild(a); });
};
$("save").onclick = async () => {
  const s = { idleMinutes: Math.max(5, +$("idleMinutes").value || 60), whitelist: $("whitelist").value.split(",").map(x => x.trim()).filter(Boolean) };
  ["autoClose", "keepPinned", "keepAudible", "keepGrouped", "sleepInstead"].forEach(k => s[k] = $(k).checked);
  await chrome.storage.local.set({ settings: s }); $("save").textContent = "✅ Saved"; setTimeout(() => $("save").textContent = "💾 Save", 1200);
};
load();
