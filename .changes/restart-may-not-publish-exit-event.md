---
"tauri": patch:bug
---

`AppHandle::restart()` may not send `RunEvent::Exit` event before exiting the application.
