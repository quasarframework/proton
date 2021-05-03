// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(doc_cfg, feature(doc_cfg))]

pub use anyhow::Result;

use std::path::{Path, PathBuf};

#[cfg(feature = "codegen")]
mod codegen;

#[cfg(feature = "codegen")]
pub use codegen::context::CodegenContext;

/// The attributes used on the build.
pub struct Attributes {
  #[allow(dead_code)]
  window_icon_path: PathBuf,
}

impl Default for Attributes {
  fn default() -> Self {
    Self {
      window_icon_path: PathBuf::from("icons/icon.ico"),
    }
  }
}

impl Attributes {
  /// Creates the default attribute set.
  pub fn new() -> Self {
    Self::default()
  }

  /// Sets the icon to use on the window. Currently only used on Windows.
  /// It must be in `ico` format. Defaults to `icons/icon.ico`.
  pub fn window_icon_path<P: AsRef<Path>>(mut self, window_icon_path: P) -> Self {
    self.window_icon_path = window_icon_path.as_ref().into();
    self
  }
}

/// Run all build time helpers for your Tauri Application.
///
/// The current helpers include the following:
/// * Generates a Windows Resource file when targeting Windows.
///
/// # Platforms
///
/// [`build()`] should be called inside of `build.rs` regardless of the platform:
/// * New helpers may target more platforms in the future.
/// * Platform specific code is handled by the helpers automatically.
/// * A build script is required in order to activate some cargo environmental variables that are
///   used when generating code and embedding assets - so [`build()`] may as well be called.
///
/// In short, this is saying don't put the call to [`build()`] behind a `#[cfg(windows)]`.
///
/// # Panics
///
/// If any of the build time helpers fail, they will [`std::panic!`] with the related error message.
/// This is typically desirable when running inside a build script; see [`try_build`] for no panics.
pub fn build() {
  if let Err(error) = try_build(Attributes::default()) {
    panic!("error found during tauri-build: {}", error);
  }
}

/// Non-panicking [`build()`].
#[allow(unused_variables)]
pub fn try_build(attributes: Attributes) -> Result<()> {
  #[cfg(windows)]
  {
    use anyhow::{anyhow, Context};
    use winres::WindowsResource;

    if attibutes.window_icon_path.exists() {
      let mut res = WindowsResource::new();
      res.set_icon_with_id(
        attributes.window_icon_path.into_os_string().into_string(),
        "32512",
      );
      res.compile().with_context(|| {
        "failed to compile icons/icon.ico into a Windows Resource file during tauri-build"
      })?;
    } else {
      return Err(anyhow!("no icons/icon.ico file found; required for generating a Windows Resource file during tauri-build"));
    }
  }

  Ok(())
}
