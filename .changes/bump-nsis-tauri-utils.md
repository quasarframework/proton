---
tauri-bundler: 'patch:bug'
---

Bumped `nsis-tauri-utils` to `0.4.2` which fixes the following bugs:
- Fixed launch on start checkbox in nsis installer does not work well with applications that require elevated permissions
- Fixed nsis installer may fail to install if launched by updater plugin
