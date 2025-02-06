---
'tauri-runtime-wry': 'patch:bug'
---

`Runtime::run_iteration` no longer sets `ControlFlow::Exit` upon `tao::Event::MainEventsCleared`. This allows `run_iteration` to actually suspend and not busy-loop when called in a loop.
