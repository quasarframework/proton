---
'tauri': 'patch:bug'
---

`Webview::navigate` and `WebviewWindow::navigate` borrows `&self` instead of unnecessarily borrowing `&mut self`.
