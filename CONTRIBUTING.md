# Contributing to TabTidy

Thanks for helping make TabTidy better! 💜

## Ways to contribute
- 🐛 **Report bugs:** open an issue with steps to reproduce, what you expected, what happened, and your browser version.
- 💡 **Suggest features:** open an issue describing the problem it solves.
- 🏷️ **Improve categories:** add keywords or categories in `categories.js`.
- 🧑‍💻 **Submit code:** fix a bug or build something from the Roadmap.

## Development setup
1. Fork and clone the repo.
2. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the repo folder.
3. Edit files, then click **↻ Reload** on the TabTidy card to see changes.
4. Debug the popup: right-click the popup → **Inspect**.
5. Debug the background worker: on `chrome://extensions`, click **service worker** under TabTidy.

There is no build step and no dependencies.

## Code style
- Plain modern JavaScript (ES2020+), no frameworks.
- 2-space indentation, double quotes, semicolons.
- Keep functions small and names clear.
- Use the CSS variables in `popup.css` (`--indigo`, `--violet`, `--teal`…) for colors.
- Don't add new permissions unless truly needed, and explain why in your PR.
- Never add network requests or tracking. TabTidy is 100% local.

## Pull requests
1. Create a branch from `main`: `git checkout -b fix/short-description`.
2. Keep each PR focused on one change.
3. Test in Chrome: open the popup, try filters and actions, check the service worker console for errors.
4. Update `README.md` and `CHANGELOG.md` if behavior changes.
5. Describe what you changed and why.

## Code of conduct
Be kind, patient and respectful. Everyone is welcome.
