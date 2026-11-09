// Topic categories: matched against domain + title (lowercase).
const CATEGORIES = {
  "Work":      ["docs.google","notion","slack","trello","asana","jira","office","outlook","teams","zoom","drive.google","calendar","linkedin","figma"],
  "Dev":       ["github","gitlab","stackoverflow","localhost","npmjs","developer.","mdn","vercel","codepen","python","docs.","api"],
  "Social":    ["facebook","instagram","twitter","x.com","tiktok","reddit","whatsapp","discord","telegram","snapchat","pinterest"],
  "Video":     ["youtube","netflix","twitch","vimeo","primevideo","disney"],
  "Shopping":  ["amazon","ebay","aliexpress","etsy","jumia","temu","shop","store","cart"],
  "News":      ["news","bbc","cnn","hespress","aljazeera","reuters","nytimes","theguardian"],
  "Learning":  ["coursera","udemy","khan","wikipedia","edx","skool","course","tutorial","learn"],
  "AI":        ["claude.ai","chatgpt","openai","gemini","perplexity","huggingface"],
  "Email":     ["mail.","gmail","outlook.live","proton"]
};
function categorize(url = "", title = "") {
  const s = (url + " " + title).toLowerCase();
  for (const [cat, keys] of Object.entries(CATEGORIES)) if (keys.some(k => s.includes(k))) return cat;
  return "Other";
}
function domainOf(url) { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "other"; } }
if (typeof self !== "undefined") { self.categorize = categorize; self.domainOf = domainOf; self.CATEGORIES = CATEGORIES; }
