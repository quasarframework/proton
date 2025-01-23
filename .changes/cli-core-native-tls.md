---
tauri-cli: patch:bug
tauri: patch:bug
---

Fixed an issue that caused Tauri's CLI to enable tauri's `native-tls` feature even though it wasn't needed. Moved `reqwest` to a mobile-only dependency in `tauri` and enabled its `rustls-tls` feature flag.
