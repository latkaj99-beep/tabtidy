<div align="center">

<img src="icons/icon128.png" alt="TabTidy logo" width="128" height="128">

# TabTidy

### Tab Organizer & Auto-Closer for Chrome

**Stay organized. Filter tabs by topic, domain or status. Group, sleep or close them in bulk, and let unused tabs close themselves.**

![Manifest](https://img.shields.io/badge/Manifest-V3-4338CA?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-7C3AED?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-14B8A6?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/dependencies-zero-4338CA?style=for-the-badge)
![Privacy](https://img.shields.io/badge/data-100%25%20local-14B8A6?style=for-the-badge)

[Features](#-features) •
[Installation](#-installation) •
[Usage](#-how-to-use) •
[Settings](#%EF%B8%8F-settings) •
[How it works](#-how-it-works) •
[Customize](#-customizing-topic-categories) •
[Privacy](#-privacy) •
[Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Why TabTidy?](#-why-tabtidy)
- [Features](#-features)
- [Installation](#-installation)
- [How to Use](#-how-to-use)
  - [The popup at a glance](#the-popup-at-a-glance)
  - [Searching tabs](#searching-tabs)
  - [Viewing tabs by topic, domain or window](#viewing-tabs-by-topic-domain-or-window)
  - [Status filters](#status-filters)
  - [Selecting tabs](#selecting-tabs)
  - [Bulk actions](#bulk-actions)
  - [Auto-grouping](#auto-grouping)
  - [Per-tab actions](#per-tab-actions)
- [Settings](#%EF%B8%8F-settings)
- [Auto-Close: Rules in Detail](#-auto-close-rules-in-detail)
- [Topic Categories](#-topic-categories)
- [Customizing Topic Categories](#-customizing-topic-categories)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [Permissions Explained](#-permissions-explained)
- [Privacy](#-privacy)
- [Browser Compatibility](#-browser-compatibility)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [License](#-license)

---

## 💡 Why TabTidy?

Most of us end the day with dozens of open tabs: an article we meant to read, three copies of the same doc, a video paused hours ago, a shopping cart we forgot about. Every tab costs memory, attention and time spent hunting for the one you need.

**TabTidy** fixes this in two ways:

1. **It organizes what you have.** Every open tab is sorted into a topic (Work, Dev, Social, Video, Shopping, News, Learning, AI, Email, Other), or by domain or window. You can filter, search and act on whole groups at once.
2. **It cleans up after you.** Tabs you haven't used for a set time are closed (or put to sleep) automatically. Your pinned tabs, tabs playing audio and favorite sites are protected, and anything closed can be reopened from a history list.

No account, no servers, no tracking. Everything runs inside your browser.

---

## ✨ Features

### 🗂️ Organize
| Feature | Description |
|---|---|
| **Topic view** | Tabs are sorted into 10 topic categories based on their URL and title. |
| **Domain view** | Tabs are grouped by website (e.g. `github.com`, `youtube.com`), with `www.` removed. |
| **Window view** | Tabs are grouped by the browser window they live in. |
| **Flat view** | One list of every tab, no grouping. |
| **Live counter** | The header shows how many tabs match your filters out of the total (e.g. `12/47 tabs`). |
| **Groups sorted by size** | The largest groups appear first, so the biggest clutter is always at the top. |

### 🔍 Filter
| Filter | Shows |
|---|---|
| **Search** | Tabs whose title or URL contains your text (case-insensitive). |
| **All tabs** | Every open tab in every window. |
| **Idle > 30 min** | Tabs you haven't used for more than 30 minutes. |
| **Duplicates** | Tabs whose URL is open more than once. |
| **Sleeping** | Tabs that have been discarded (unloaded from memory). |
| **Playing audio** | Tabs currently playing sound. |
| **Pinned** | Pinned tabs. |

### ⚡ Act
| Action | What it does |
|---|---|
| **☑ All** | Selects (or deselects) every tab that matches the current filter. |
| **🧩 Group** | Puts the selected tabs into a named, colored Chrome tab group. |
| **💤 Sleep** | Discards the selected tabs to free memory. They stay in the tab bar and reload when clicked. |
| **✖ Close** | Closes the selected tabs, after a confirmation prompt. |
| **✨ Auto-group all by topic** | Groups every unpinned tab into a colored Chrome tab group named after its topic. |
| **Ungroup all** | Removes all tabs from their tab groups. |

### 🤖 Automate
| Feature | Description |
|---|---|
| **Auto-close unused tabs** | Closes tabs that have not been used for a time you choose (default: 60 minutes). |
| **Sleep mode** | Optionally sleep idle tabs instead of closing them. |
| **Protection rules** | Keep pinned tabs, tabs playing audio and grouped tabs safe. |
| **Domain whitelist** | Domains that are never auto-closed (e.g. `gmail.com, notion.so`). |
| **Recently closed** | The last 50 auto-closed tabs, reopenable with one click. |

### 🎨 Design
- Clean, modern popup with the TabTidy indigo → violet → teal gradient.
- Card-style groups with count badges.
- Favicons, 📌 pinned and 🔊 audio markers, and "last used" times on every tab.
- Sleeping tabs are shown faded so you can spot them at a glance.

---

## 📦 Installation

### Option 1: Load unpacked (developer mode)

1. **Download** this repository:
   - Click the green **Code** button → **Download ZIP**, then unzip it, **or**
   - Clone it:
     ```bash
     git clone https://github.com/latkaj99-beep/tabtidy.git
     ```
2. Open Chrome and go to:
   ```
   chrome://extensions
   ```
3. Turn on **Developer mode** (top-right toggle).
4. Click **Load unpacked**.
5. Select the folder that contains `manifest.json`.
6. Pin TabTidy to your toolbar: click the 🧩 puzzle icon → click the 📌 pin next to **TabTidy**.

That's it. Click the TabTidy icon to open the popup.

### Option 2: Chrome Web Store
*Coming soon.*

### Updating
After pulling new changes (`git pull`) or replacing the files, go to `chrome://extensions` and click the **↻ Reload** button on the TabTidy card.

---

## 🧭 How to Use

### The popup at a glance

```
┌──────────────────────────────────────────┐
│ [logo] TabTidy              12/47 tabs ⚙️ │  ← header, counter, settings
├──────────────────────────────────────────┤
│ 🔍 Search title or URL…                   │  ← search box
│ [ By topic ▾ ]   [ All tabs ▾ ]           │  ← view + status filter
│ [☑ All] [🧩 Group] [💤 Sleep] [✖ Close]   │  ← bulk actions
│ [✨ Auto-group all by topic] [Ungroup all]│
├──────────────────────────────────────────┤
│ ☐ Dev                               8    │  ← group header (select all)
│   ☐ 🌐 Pull request #42 · repo   3m   ✖  │  ← tab row
│   ☐ 🌐 How to use Array.map…     1h   ✖  │
│ ☐ Video                             5    │
│   ☐ 🌐 🔊 Lo-fi beats to study…  0m   ✖  │
└──────────────────────────────────────────┘
```

### Searching tabs
Type in the **search box**. The list updates as you type and keeps only tabs whose **title or URL** contains your text. Search works together with the view and status filters.

### Viewing tabs by topic, domain or window
Use the first dropdown:

- **By topic**: Work, Dev, Social, Video, Shopping, News, Learning, AI, Email, Other.
- **By domain**: one group per website.
- **By window**: one group per Chrome window.
- **No grouping**: a single list.

### Status filters
Use the second dropdown to narrow the list:

- **Idle > 30 min**: find tabs you've forgotten about.
- **Duplicates**: find every URL that's open more than once, then close the extras.
- **Sleeping**: see which tabs are unloaded.
- **Playing audio**: find the tab making noise.
- **Pinned**: see your pinned tabs.

### Selecting tabs
- Tick the **checkbox on a tab** to select it.
- Tick the **checkbox on a group header** to select every tab in that group.
- Click **☑ All** to select every tab matching the current filters. Click it again to deselect them.

Your selection is kept while you change filters, so you can build a selection across several searches.

### Bulk actions
With tabs selected:

- **🧩 Group** asks for a group name (pre-filled with the topic or domain of the first selected tab) and creates a Chrome tab group with a random color. If the selected tabs are in different windows, one group is made per window.
- **💤 Sleep** discards the tabs. They stay in your tab bar but stop using memory until you click them.
- **✖ Close** asks *"Close N tab(s)?"* and closes them if you confirm.

### Auto-grouping
**✨ Auto-group all by topic** sorts every unpinned tab into Chrome tab groups named after their topic, each with its own color. **Ungroup all** undoes it.

### Per-tab actions
- **Click a tab's title** to jump to that tab and bring its window to the front.
- **Click ✖** on a row to close just that tab.
- The small time next to each tab (e.g. `3m`, `2h`) shows when it was last used.

---

## ⚙️ Settings

Click the **⚙️** icon in the popup header to open Settings. Click it again to go back.

| Setting | Default | Description |
|---|---|---|
| **Auto-handle unused tabs** | ✅ On | Turns automatic closing/sleeping on or off. |
| **After N minutes unused** | `60` | How long a tab must go unused before it's handled. Minimum `5`. |
| **Sleep (discard) instead of closing** | ⬜ Off | Idle tabs are put to sleep instead of closed. |
| **Keep pinned tabs** | ✅ On | Pinned tabs are never auto-handled. |
| **Keep tabs playing audio** | ✅ On | Tabs playing sound are never auto-handled. |
| **Keep grouped tabs** | ⬜ Off | Tabs inside a Chrome tab group are never auto-handled. |
| **Never close these domains** | *(empty)* | Comma-separated list, e.g. `gmail.com, notion.so, calendar.google.com`. |

Click **💾 Save** to apply your changes. The button shows **✅ Saved** for a moment to confirm.

### Recently auto-closed
Below the settings is a list of the **last 50 tabs** TabTidy closed automatically. Click any entry (**↩ title**) to reopen it in a new tab.

> Tabs you close yourself with the ✖ buttons are not added to this list. Use Chrome's own history (`Ctrl+Shift+T` / `Cmd+Shift+T`) for those.

---

## 🧹 Auto-Close: Rules in Detail

Every **1 minute**, TabTidy checks all open tabs. A tab is closed (or slept, if sleep mode is on) only when **all** of these are true:

1. Auto-handling is **turned on**.
2. The tab is **not the active tab** in its window.
3. The tab is **not pinned** (if *Keep pinned tabs* is on).
4. The tab is **not playing audio** (if *Keep tabs playing audio* is on).
5. The tab is **not in a tab group** (if *Keep grouped tabs* is on).
6. The tab's domain does **not** contain any whitelisted domain.
7. The tab has **not been used** for at least the configured number of minutes.

A tab counts as "used" when you **switch to it**, when it is **opened**, or when it **finishes loading** a page.

In sleep mode, tabs that are already asleep are skipped. In close mode, each closed tab's title, URL and time are saved to the *Recently auto-closed* list.

> **Tip:** If you want to try auto-close without losing anything, turn on **Sleep instead of closing** first.

---

## 🏷️ Topic Categories

A tab's topic is decided by checking its **URL and title** (lowercase) against a keyword list. The **first matching category wins**, in this order:

| Topic | Example keywords |
|---|---|
| **Work** | docs.google, notion, slack, trello, asana, jira, office, outlook, teams, zoom, drive.google, calendar, linkedin, figma |
| **Dev** | github, gitlab, stackoverflow, localhost, npmjs, developer., mdn, vercel, codepen, python, docs., api |
| **Social** | facebook, instagram, twitter, x.com, tiktok, reddit, whatsapp, discord, telegram, snapchat, pinterest |
| **Video** | youtube, netflix, twitch, vimeo, primevideo, disney |
| **Shopping** | amazon, ebay, aliexpress, etsy, jumia, temu, shop, store, cart |
| **News** | news, bbc, cnn, hespress, aljazeera, reuters, nytimes, theguardian |
| **Learning** | coursera, udemy, khan, wikipedia, edx, skool, course, tutorial, learn |
| **AI** | claude.ai, chatgpt, openai, gemini, perplexity, huggingface |
| **Email** | mail., gmail, outlook.live, proton |
| **Other** | anything that doesn't match |

> Because the first match wins, a tab like `mail.google.com` that also contains a Work keyword may land in **Work**. You can reorder categories to change this. See below.

---

## 🛠️ Customizing Topic Categories

All categories live in **`categories.js`**:

```js
const CATEGORIES = {
  "Work":  ["docs.google", "notion", "slack", /* ... */],
  "Dev":   ["github", "gitlab", "stackoverflow", /* ... */],
  // ...
};
```

### Add a keyword
```js
"Dev": ["github", "gitlab", "stackoverflow", "bitbucket"],
```

### Add a new category
```js
"Finance": ["bank", "paypal", "stripe", "binance", "invoice"],
```

### Change priority
Categories are checked **top to bottom**. Move a category higher to make it win over others.

After editing, reload the extension at `chrome://extensions` (↻).

---

## 🔧 How It Works

TabTidy is built on **Chrome Manifest V3** with **plain JavaScript**: no frameworks, no build step, no dependencies.

### Architecture

```
            ┌────────────────────────┐
            │      background.js     │  service worker
            │  • tracks tab activity │
            │  • 1-min alarm sweep   │
            │  • auto-close / sleep  │
            └──────────┬─────────────┘
                       │ chrome.storage.local
                       │  settings · activity · closedLog
            ┌──────────┴─────────────┐
            │   popup.html / .js     │  user interface
            │  • search & filters    │
            │  • group / sleep / close│
            │  • settings panel      │
            └──────────┬─────────────┘
                       │
            ┌──────────┴─────────────┐
            │     categories.js      │  shared helpers
            │  categorize() domainOf()│
            └────────────────────────┘
```

### Activity tracking
`background.js` listens to `tabs.onActivated`, `tabs.onCreated` and `tabs.onUpdated` (when a page finishes loading) and stores a **last-used timestamp** per tab ID in `chrome.storage.local` under the key `activity`. Entries are removed when tabs close. On install, every existing tab is stamped with the current time so nothing is closed immediately.

### The sweep
A `chrome.alarms` alarm named `sweep` fires **every minute**. It reads your settings, compares each tab's last-used time with your limit, applies the protection rules, and closes or discards tabs that qualify. If a tab has no recorded activity, Chrome's own `lastAccessed` value is used.

### Stored data

| Key | Contents |
|---|---|
| `settings` | Your options (auto-close, minutes, protections, whitelist). |
| `activity` | `{ tabId: lastUsedTimestamp }` |
| `closedLog` | Up to 50 entries of `{ title, url, at }` for auto-closed tabs. |

---

## 📁 Project Structure

```
tabtidy/
├── manifest.json        # Extension manifest (MV3): permissions, icons, popup, worker
├── background.js        # Service worker: activity tracking + auto-close sweep
├── categories.js        # Topic keyword map + categorize() + domainOf() helpers
├── popup.html           # Popup markup: main view + settings view
├── popup.css            # Popup styles (indigo / violet / teal theme)
├── popup.js             # Popup logic: filters, rendering, bulk actions, settings
├── icons/
│   ├── logo.svg         # Vector logo
│   ├── icon16.png       # Toolbar icon
│   ├── icon32.png       # Toolbar icon (HiDPI)
│   ├── icon48.png       # Extensions page icon
│   └── icon128.png      # Store / install icon
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── PRIVACY.md
└── .gitignore
```

---

## 🔐 Permissions Explained

TabTidy asks for the **minimum** permissions it needs:

| Permission | Why it's needed |
|---|---|
| `tabs` | Read tab titles and URLs to show, filter and categorize them; switch to, close and discard tabs. |
| `tabGroups` | Create, name, color and remove Chrome tab groups. |
| `storage` | Save your settings, activity times and the recently-closed list locally. |
| `alarms` | Run the auto-close check every minute, even when the popup is closed. |

TabTidy does **not** request host permissions, does **not** inject scripts into web pages, and does **not** read page contents.

---

## 🛡️ Privacy

- **100% local.** All data stays in `chrome.storage.local` on your computer.
- **No network requests.** TabTidy never sends anything anywhere.
- **No analytics, no tracking, no accounts.**
- **Open source.** Every line of code is in this repository for you to check.

See [PRIVACY.md](PRIVACY.md) for the full policy.

---

## 🌐 Browser Compatibility

| Browser | Status |
|---|---|
| Google Chrome (recent versions) | ✅ Supported |
| Microsoft Edge | ✅ Should work (Chromium, MV3) |
| Brave | ✅ Should work (Chromium, MV3) |
| Opera / Vivaldi | ⚠️ Should work; tab groups support varies |
| Firefox | ❌ Not supported (no `tabGroups` API) |

---

## ❓ Troubleshooting & FAQ

**The popup is empty or shows an error.**
Go to `chrome://extensions`, find TabTidy and click **Errors** to see details. Click **↻ Reload** and try again.

**A tab I'm using got closed.**
Raise the idle time in Settings, add its domain to the whitelist, pin the tab, or turn on *Sleep instead of closing*. You can reopen it from **Recently auto-closed**.

**Auto-close isn't doing anything.**
Check that *Auto-handle unused tabs* is on and you clicked **💾 Save**. Remember the check runs every minute and only affects tabs unused for longer than your limit. Active tabs are never closed.

**"Sleep" didn't work on some tabs.**
Chrome can't discard the tab you're currently viewing, and some special pages (like `chrome://` pages) can't be discarded.

**A site is in the wrong topic.**
Edit `categories.js`. See [Customizing Topic Categories](#-customizing-topic-categories).

**Grouping put my tabs into several groups.**
Chrome tab groups can't span windows, so TabTidy makes one group per window.

**Does it slow down my browser?**
No. The background check runs once a minute and does very little work. Sleeping tabs actually frees memory.

---

## 🗺️ Roadmap

Ideas for future versions (contributions welcome!):

- [ ] Custom categories editor inside Settings
- [ ] Save and restore tab sessions
- [ ] Keyboard shortcuts for the popup and bulk actions
- [ ] "Close duplicates" one-click button
- [ ] Per-domain idle times
- [ ] Export / import settings
- [ ] Dark mode
- [ ] Statistics (tabs closed, memory saved)
- [ ] Chrome Web Store release
- [ ] Translations (Arabic, French, Spanish…)

---

## 🤝 Contributing

Contributions are welcome! Bug reports, feature ideas, new category keywords and code are all appreciated.

1. **Fork** the repository.
2. Create a branch: `git checkout -b feature/my-idea`
3. Make your changes and test them by loading the folder unpacked in Chrome.
4. Commit: `git commit -m "Add my idea"`
5. Push: `git push origin feature/my-idea`
6. Open a **Pull Request**.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for code style and guidelines.

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history.

**v1.0.0** – First release: topic/domain/window views, status filters, search, bulk group/sleep/close, auto-group by topic, auto-close with protection rules and whitelist, recently-closed list, logo and themed UI.

---

## 📄 License

Released under the [MIT License](LICENSE). You are free to use, modify and share it.

---

<div align="center">

**If TabTidy helps you stay organized, please give it a ⭐ on GitHub!**

Made with 💜 for everyone with too many tabs open.

</div>
