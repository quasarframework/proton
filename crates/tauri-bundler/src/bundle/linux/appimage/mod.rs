// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use std::{
  fs,
  path::{Path, PathBuf},
};

use crate::Settings;

mod experimental;
mod linuxdeploy;

// TODO: This needs to be a config, not an env var post PoC
pub fn bundle_project(settings: &Settings) -> crate::Result<Vec<PathBuf>> {
  if std::env::var("TAURI_NEW_APPIMAGE").unwrap_or("false".to_string()) == "true" {
    experimental::bundle_project(settings)
  } else {
    linuxdeploy::bundle_project(settings)
  }
}

fn write_and_make_executable(path: &Path, data: Vec<u8>) -> std::io::Result<()> {
  use std::os::unix::fs::PermissionsExt;

  fs::write(path, data)?;
  fs::set_permissions(path, fs::Permissions::from_mode(0o770))?;

  Ok(())
}
