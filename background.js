importScripts("categories.js");
const DEFAULTS = { autoClose: true, idleMinutes: 60, keepPinned: true, keepAudible: true, keepGrouped: false, sleepInstead: false, whitelist: [] };

async function getSettings() { return { ...DEFAULTS, ...(await chrome.storage.local.get("settings")).settings }; }
async function getActivity() { return (await chrome.storage.local.get("activity")).activity || {}; }
async function touch(tabId) { const a = await getActivity(); a[tabId] = Date.now(); await chrome.storage.local.set({ activity: a }); }

chrome.runtime.onInstalled.addListener(async () => {
  chrome.alarms.create("sweep", { periodInMinutes: 1 });
  const a = {}; (await chrome.tabs.query({})).forEach(t => a[t.id] = Date.now());
  await chrome.storage.local.set({ activity: a });
});
chrome.runtime.onStartup.addListener(() => chrome.alarms.create("sweep", { periodInMinutes: 1 }));
chrome.tabs.onActivated.addListener(({ tabId }) => touch(tabId));
chrome.tabs.onCreated.addListener(t => touch(t.id));
chrome.tabs.onUpdated.addListener((id, info) => { if (info.status === "complete") touch(id); });
chrome.tabs.onRemoved.addListener(async id => { const a = await getActivity(); delete a[id]; await chrome.storage.local.set({ activity: a }); });

chrome.alarms.onAlarm.addListener(async ({ name }) => {
  if (name !== "sweep") return;
  const s = await getSettings(); if (!s.autoClose) return;
  const a = await getActivity(), now = Date.now(), limit = s.idleMinutes * 60000;
  const tabs = await chrome.tabs.query({});
  for (const t of tabs) {
    if (t.active || (s.keepPinned && t.pinned) || (s.keepAudible && t.audible) || (s.keepGrouped && t.groupId !== -1)) continue;
    if (s.whitelist.some(w => w && domainOf(t.url).includes(w))) continue;
    const last = a[t.id] || t.lastAccessed || now;
    if (now - last < limit) continue;
    if (s.sleepInstead) { if (!t.discarded) chrome.tabs.discard(t.id).catch(() => {}); }
    else {
      const { closedLog = [] } = await chrome.storage.local.get("closedLog");
      closedLog.unshift({ title: t.title, url: t.url, at: now });
      await chrome.storage.local.set({ closedLog: closedLog.slice(0, 50) });
      chrome.tabs.remove(t.id).catch(() => {});
    }
  }
});
