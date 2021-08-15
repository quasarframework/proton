// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! Tauri is a framework for building tiny, blazing fast binaries for all major desktop platforms.
//! Developers can integrate any front-end framework that compiles to HTML, JS and CSS for building their user interface.
//! The backend of the application is a rust-sourced binary with an API that the front-end can interact with.
//!
//! # Cargo features
//!
//! The following are a list of Cargo features that can be enabled or disabled:
//!
//! - **wry** *(enabled by default)*: Enables the [wry](https://github.com/tauri-apps/wry) runtime. Only disable it if you want a custom runtime.
//! - **reqwest-client**: Uses `reqwest` as HTTP client on the `http` APIs. Improves performance, but increases the bundle size.
//! - **cli**: Enables usage of `clap` for CLI argument parsing. Enabled by default if the `cli` config is defined on the `tauri.conf.json` file.
//! - **system-tray**: Enables application system tray API. Enabled by default if the `systemTray` config is defined on the `tauri.conf.json` file.
//! - **updater**: Enables the application auto updater. Enabled by default if the `updater` config is defined on the `tauri.conf.json` file.

#![allow(
    // Clippy bug: https://github.com/rust-lang/rust-clippy/issues/7422
    clippy::nonstandard_macro_braces,
)]
#![warn(missing_docs, rust_2018_idioms)]
#![cfg_attr(doc_cfg, feature(doc_cfg))]

/// The Tauri error enum.
pub use error::Error;
pub use tauri_macros::{command, generate_handler};

pub mod api;
pub(crate) mod app;
/// Async runtime.
pub mod async_runtime;
pub mod command;
/// The Tauri API endpoints.
mod endpoints;
mod error;
mod event;
mod hooks;
mod manager;
pub mod plugin;
/// Tauri window.
pub mod window;
use tauri_runtime as runtime;
/// The Tauri-specific settings for your runtime e.g. notification permission status.
pub mod settings;
mod state;
#[cfg(feature = "updater")]
#[cfg_attr(doc_cfg, doc(cfg(feature = "updater")))]
pub mod updater;

#[cfg(feature = "wry")]
#[cfg_attr(doc_cfg, doc(cfg(feature = "wry")))]
pub use tauri_runtime_wry::Wry;

/// `Result<T, ::tauri::Error>`
pub type Result<T> = std::result::Result<T, Error>;

/// A task to run on the main thread.
pub type SyncTask = Box<dyn FnOnce() + Send>;

use crate::{
  event::{Event as EmittedEvent, EventHandler},
  runtime::window::PendingWindow,
};
use serde::Serialize;
use std::{collections::HashMap, sync::Arc};

// Export types likely to be used by the application.
pub use runtime::menu::CustomMenuItem;

#[cfg(target_os = "macos")]
#[cfg_attr(doc_cfg, doc(cfg(target_os = "macos")))]
pub use runtime::menu::NativeImage;

pub use {
  self::api::assets::Assets,
  self::app::{App, AppHandle, Builder, CloseRequestApi, Event, GlobalWindowEvent, PathResolver},
  self::hooks::{
    Invoke, InvokeError, InvokeHandler, InvokeMessage, InvokeResolver, InvokeResponse, OnPageLoad,
    PageLoadPayload, SetupHook,
  },
  self::runtime::{
    webview::{WebviewAttributes, WindowBuilder},
    window::{
      dpi::{LogicalPosition, LogicalSize, PhysicalPosition, PhysicalSize, Pixel, Position, Size},
      WindowEvent,
    },
    ClipboardManager, GlobalShortcutManager, Icon, RunIteration, Runtime, UserAttentionType,
  },
  self::state::{State, StateManager},
  self::window::{Monitor, Window},
};
#[cfg(feature = "system-tray")]
#[cfg_attr(doc_cfg, doc(cfg(feature = "system-tray")))]
pub use {
  self::app::tray::{SystemTrayEvent, SystemTrayHandle},
  self::runtime::{
    menu::{SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu},
    SystemTray,
  },
};
pub use {
  self::app::WindowMenuEvent,
  self::runtime::menu::{Menu, MenuItem, Submenu},
  self::window::menu::MenuEvent,
};

pub use tauri_utils::{config::{Config, WindowUrl}, PackageInfo};

/// Reads the config file at compile time and generates a [`Context`] based on its content.
///
/// The default config file path is a `tauri.conf.json` file inside the Cargo manifest directory of
/// the crate being built.
///
/// # Custom Config Path
///
/// You may pass a string literal to this macro to specify a custom path for the Tauri config file.
/// If the path is relative, it will be search for relative to the Cargo manifest of the compiling
/// crate.
///
/// # Note
///
/// This macro should not be called if you are using [`tauri-build`] to generate the context from
/// inside your build script as it will just cause excess computations that will be discarded. Use
/// either the [`tauri-build] method or this macro - not both.
///
/// [`tauri-build`]: https://docs.rs/tauri-build
pub use tauri_macros::generate_context;

/// Include a [`Context`] that was generated by [`tauri-build`] inside your build script.
///
/// You should either use [`tauri-build`] and this macro to include the compile time generated code,
/// or [`generate_context!`]. Do not use both at the same time, as they generate the same code and
/// will cause excess computations that will be discarded.
///
/// [`tauri-build`]: https://docs.rs/tauri-build
#[macro_export]
macro_rules! tauri_build_context {
  () => {
    include!(concat!(env!("OUT_DIR"), "/tauri-build-context.rs"))
  };
}

/// User supplied data required inside of a Tauri application.
///
/// # Stability
/// This is the output of the `tauri::generate_context!` macro, and is not considered part of the stable API.
/// Unless you know what you are doing and are prepared for this type to have breaking changes, do not create it yourself.
#[derive(Debug)]
pub struct Context<A: Assets> {
  pub(crate) config: Config,
  pub(crate) assets: Arc<A>,
  pub(crate) default_window_icon: Option<Vec<u8>>,
  pub(crate) system_tray_icon: Option<Icon>,
  pub(crate) package_info: crate::api::PackageInfo,
}

impl<A: Assets> Context<A> {
  /// The config the application was prepared with.
  #[inline(always)]
  pub fn config(&self) -> &Config {
    &self.config
  }

  /// A mutable reference to the config the application was prepared with.
  #[inline(always)]
  pub fn config_mut(&mut self) -> &mut Config {
    &mut self.config
  }

  /// The assets to be served directly by Tauri.
  #[inline(always)]
  pub fn assets(&self) -> Arc<A> {
    self.assets.clone()
  }

  /// A mutable reference to the assets to be served directly by Tauri.
  #[inline(always)]
  pub fn assets_mut(&mut self) -> &mut Arc<A> {
    &mut self.assets
  }

  /// The default window icon Tauri should use when creating windows.
  #[inline(always)]
  pub fn default_window_icon(&self) -> Option<&[u8]> {
    self.default_window_icon.as_deref()
  }

  /// A mutable reference to the default window icon Tauri should use when creating windows.
  #[inline(always)]
  pub fn default_window_icon_mut(&mut self) -> &mut Option<Vec<u8>> {
    &mut self.default_window_icon
  }

  /// The icon to use on the system tray UI.
  #[inline(always)]
  pub fn system_tray_icon(&self) -> Option<&Icon> {
    self.system_tray_icon.as_ref()
  }

  /// A mutable reference to the icon to use on the system tray UI.
  #[inline(always)]
  pub fn system_tray_icon_mut(&mut self) -> &mut Option<Icon> {
    &mut self.system_tray_icon
  }

  /// Package information.
  #[inline(always)]
  pub fn package_info(&self) -> &crate::api::PackageInfo {
    &self.package_info
  }

  /// A mutable reference to the package information.
  #[inline(always)]
  pub fn package_info_mut(&mut self) -> &mut crate::api::PackageInfo {
    &mut self.package_info
  }

  /// Create a new [`Context`] from the minimal required items.
  #[inline(always)]
  pub fn new(
    config: Config,
    assets: Arc<A>,
    default_window_icon: Option<Vec<u8>>,
    system_tray_icon: Option<Icon>,
    package_info: crate::api::PackageInfo,
  ) -> Self {
    Self {
      config,
      assets,
      default_window_icon,
      system_tray_icon,
      package_info,
    }
  }
}

// TODO: expand these docs
/// Manages a running application.
pub trait Manager<R: Runtime>: sealed::ManagerBase<R> {
  /// The [`Config`] the manager was created with.
  fn config(&self) -> Arc<Config> {
    self.manager().config()
  }

  /// Emits a event to all windows.
  fn emit_all<S: Serialize + Clone>(&self, event: &str, payload: S) -> Result<()> {
    self.manager().emit_filter(event, payload, |_| true)
  }

  /// Emits an event to a window with the specified label.
  fn emit_to<S: Serialize + Clone>(&self, label: &str, event: &str, payload: S) -> Result<()> {
    self
      .manager()
      .emit_filter(event, payload, |w| label == w.label())
  }

  /// Listen to a global event.
  fn listen_global<F>(&self, event: impl Into<String>, handler: F) -> EventHandler
  where
    F: Fn(EmittedEvent) + Send + 'static,
  {
    self.manager().listen(event.into(), None, handler)
  }

  /// Listen to a global event only once.
  fn once_global<F>(&self, event: impl Into<String>, handler: F) -> EventHandler
  where
    F: Fn(EmittedEvent) + Send + 'static,
  {
    self.manager().once(event.into(), None, handler)
  }

  /// Trigger a global event.
  fn trigger_global(&self, event: &str, data: Option<String>) {
    self.manager().trigger(event, None, data)
  }

  /// Remove an event listener.
  fn unlisten(&self, handler_id: EventHandler) {
    self.manager().unlisten(handler_id)
  }

  /// Fetch a single window from the manager.
  fn get_window(&self, label: &str) -> Option<Window<R>> {
    self.manager().get_window(label)
  }

  /// Fetch all managed windows.
  fn windows(&self) -> HashMap<String, Window<R>> {
    self.manager().windows()
  }

  /// Add `state` to the state managed by the application.
  /// See [`crate::Builder#manage`] for instructions.
  fn manage<T>(&self, state: T)
  where
    T: Send + Sync + 'static,
  {
    self.manager().state().set(state);
  }

  /// Gets the managed state for the type `T`. Panics if the type is not managed.
  fn state<T>(&self) -> State<'_, T>
  where
    T: Send + Sync + 'static,
  {
    self.manager().inner.state.get()
  }

  /// Tries to get the managed state for the type `T`. Returns `None` if the type is not managed.
  fn try_state<T>(&self) -> Option<State<'_, T>>
  where
    T: Send + Sync + 'static,
  {
    self.manager().inner.state.try_get()
  }
}

/// Prevent implementation details from leaking out of the [`Manager`] trait.
pub(crate) mod sealed {
  use crate::{app::AppHandle, manager::WindowManager};
  use tauri_runtime::{Runtime, RuntimeHandle};

  /// A running [`Runtime`] or a dispatcher to it.
  pub enum RuntimeOrDispatch<'r, R: Runtime> {
    /// Reference to the running [`Runtime`].
    Runtime(&'r R),

    /// Handle to the running [`Runtime`].
    RuntimeHandle(R::Handle),

    /// A dispatcher to the running [`Runtime`].
    Dispatch(R::Dispatcher),
  }

  /// Managed handle to the application runtime.
  pub trait ManagerBase<R: Runtime> {
    /// The manager behind the [`Managed`] item.
    fn manager(&self) -> &WindowManager<R>;

    fn runtime(&self) -> RuntimeOrDispatch<'_, R>;
    fn app_handle(&self) -> AppHandle<R>;

    /// Creates a new [`Window`] on the [`Runtime`] and attaches it to the [`Manager`].
    fn create_new_window(
      &self,
      pending: crate::PendingWindow<R>,
    ) -> crate::Result<crate::Window<R>> {
      use crate::runtime::Dispatch;
      let labels = self.manager().labels().into_iter().collect::<Vec<_>>();
      let pending = self
        .manager()
        .prepare_window(self.app_handle(), pending, &labels)?;
      match self.runtime() {
        RuntimeOrDispatch::Runtime(runtime) => runtime.create_window(pending).map_err(Into::into),
        RuntimeOrDispatch::RuntimeHandle(handle) => {
          handle.create_window(pending).map_err(Into::into)
        }
        RuntimeOrDispatch::Dispatch(mut dispatcher) => {
          dispatcher.create_window(pending).map_err(Into::into)
        }
      }
      .map(|window| self.manager().attach_window(self.app_handle(), window))
    }
  }
}

#[cfg(test)]
mod test {
  use proptest::prelude::*;

  proptest! {
    #![proptest_config(ProptestConfig::with_cases(10000))]
    #[test]
    // check to see if spawn executes a function.
    fn check_spawn_task(task in "[a-z]+") {
      // create dummy task function
      let dummy_task = async move {
        format!("{}-run-dummy-task", task);
      };
      // call spawn
      crate::async_runtime::spawn(dummy_task);
    }
  }
}
