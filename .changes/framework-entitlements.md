---
'tauri-cli': 'patch:enhance'
---

Added conditional logic to MacOS codesigning where only executables get the entitlements file when being signed. This solves an issue where the app may not launch when using 3rd party frameworks if certain entitlements are added. Ex: multicast support (must be applied for through apple developer, and the framework would not have that capability).