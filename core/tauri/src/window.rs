// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! The Tauri window types and functions.

pub(crate) mod menu;

pub use menu::{MenuEvent, MenuHandle};

use crate::{
  app::AppHandle,
  command::{CommandArg, CommandItem},
  event::{Event, EventHandler},
  hooks::{InvokePayload, InvokeResponder},
  manager::WindowManager,
  runtime::{
    http::{Request as HttpRequest, Response as HttpResponse},
    menu::Menu,
    monitor::Monitor as RuntimeMonitor,
    webview::{WebviewAttributes, WindowBuilder as _},
    window::{
      dpi::{PhysicalPosition, PhysicalSize, Position, Size},
      DetachedWindow, JsEventListenerKey, PendingWindow, WindowEvent,
    },
    Dispatch, RuntimeHandle, UserAttentionType,
  },
  sealed::ManagerBase,
  sealed::RuntimeOrDispatch,
  utils::config::WindowUrl,
  EventLoopMessage, Icon, Invoke, InvokeError, InvokeMessage, InvokeResolver, Manager,
  PageLoadPayload, Runtime,
};

use serde::Serialize;
#[cfg(windows)]
use windows::Win32::Foundation::HWND;

use tauri_macros::default_runtime;

use std::{
  fmt,
  hash::{Hash, Hasher},
  path::PathBuf,
  sync::Arc,
};

#[derive(Clone, Serialize)]
struct WindowCreatedEvent {
  label: String,
}

/// Monitor descriptor.
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Monitor {
  pub(crate) name: Option<String>,
  pub(crate) size: PhysicalSize<u32>,
  pub(crate) position: PhysicalPosition<i32>,
  pub(crate) scale_factor: f64,
}

impl From<RuntimeMonitor> for Monitor {
  fn from(monitor: RuntimeMonitor) -> Self {
    Self {
      name: monitor.name,
      size: monitor.size,
      position: monitor.position,
      scale_factor: monitor.scale_factor,
    }
  }
}

impl Monitor {
  /// Returns a human-readable name of the monitor.
  /// Returns None if the monitor doesn't exist anymore.
  pub fn name(&self) -> Option<&String> {
    self.name.as_ref()
  }

  /// Returns the monitor's resolution.
  pub fn size(&self) -> &PhysicalSize<u32> {
    &self.size
  }

  /// Returns the top-left corner position of the monitor relative to the larger full screen area.
  pub fn position(&self) -> &PhysicalPosition<i32> {
    &self.position
  }

  /// Returns the scale factor that can be used to map logical pixels to physical pixels, and vice versa.
  pub fn scale_factor(&self) -> f64 {
    self.scale_factor
  }
}

/// A runtime handle or dispatch used to create new windows.
#[derive(Debug, Clone)]
pub enum RuntimeHandleOrDispatch<R: Runtime> {
  /// Handle to the running [`Runtime`].
  RuntimeHandle(R::Handle),

  /// A dispatcher to the running [`Runtime`].
  Dispatch(R::Dispatcher),
}

/// A builder for a webview window managed by Tauri.
#[default_runtime(crate::Wry, wry)]
pub struct WindowBuilder<R: Runtime> {
  manager: WindowManager<R>,
  runtime: RuntimeHandleOrDispatch<R>,
  app_handle: AppHandle<R>,
  label: String,
  pub(crate) window_builder: <R::Dispatcher as Dispatch<EventLoopMessage>>::WindowBuilder,
  pub(crate) webview_attributes: WebviewAttributes,
  web_resource_request_handler: Option<Box<dyn Fn(&HttpRequest, &mut HttpResponse) + Send + Sync>>,
}

impl<R: Runtime> fmt::Debug for WindowBuilder<R> {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    f.debug_struct("WindowBuilder")
      .field("manager", &self.manager)
      .field("runtime", &self.runtime)
      .field("app_handle", &self.app_handle)
      .field("label", &self.label)
      .field("window_builder", &self.window_builder)
      .field("webview_attributes", &self.webview_attributes)
      .finish()
  }
}

impl<R: Runtime> ManagerBase<R> for WindowBuilder<R> {
  fn manager(&self) -> &WindowManager<R> {
    &self.manager
  }

  fn runtime(&self) -> RuntimeOrDispatch<'_, R> {
    match &self.runtime {
      RuntimeHandleOrDispatch::RuntimeHandle(r) => RuntimeOrDispatch::RuntimeHandle(r.clone()),
      RuntimeHandleOrDispatch::Dispatch(d) => RuntimeOrDispatch::Dispatch(d.clone()),
    }
  }

  fn managed_app_handle(&self) -> AppHandle<R> {
    self.app_handle.clone()
  }
}

impl<R: Runtime> WindowBuilder<R> {
  /// Initializes a webview window builder with the given window label and URL to load on the webview.
  pub fn new<M: Manager<R>, L: Into<String>>(manager: &M, label: L, url: WindowUrl) -> Self {
    let runtime = match manager.runtime() {
      RuntimeOrDispatch::Runtime(r) => RuntimeHandleOrDispatch::RuntimeHandle(r.handle()),
      RuntimeOrDispatch::RuntimeHandle(h) => RuntimeHandleOrDispatch::RuntimeHandle(h),
      RuntimeOrDispatch::Dispatch(d) => RuntimeHandleOrDispatch::Dispatch(d),
    };
    let app_handle = manager.app_handle();
    Self {
      manager: manager.manager().clone(),
      runtime,
      app_handle,
      label: label.into(),
      window_builder: <R::Dispatcher as Dispatch<EventLoopMessage>>::WindowBuilder::new(),
      webview_attributes: WebviewAttributes::new(url),
      web_resource_request_handler: None,
    }
  }

  /// Defines a closure to be executed when the webview makes an HTTP request for a web resource, allowing you to modify the response.
  ///
  /// Currently only implemented for the `tauri` URI protocol.
  ///
  /// **NOTE:** Currently this is **not** executed when using external URLs such as a development server,
  /// but it might be implemented in the future. **Always** check the request URL.
  ///
  /// # Examples
  ///
  /// ```rust,no_run
  /// use tauri::{
  ///   utils::config::{Csp, CspDirectiveSources, WindowUrl},
  ///   runtime::http::header::HeaderValue,
  ///   window::WindowBuilder,
  /// };
  /// use std::collections::HashMap;
  /// tauri::Builder::default()
  ///   .setup(|app| {
  ///     WindowBuilder::new(app, "core", WindowUrl::App("index.html".into()))
  ///       .on_web_resource_request(|request, response| {
  ///         if request.uri().starts_with("tauri://") {
  ///           // if we have a CSP header, Tauri is loading an HTML file
  ///           //  for this example, let's dynamically change the CSP
  ///           if let Some(csp) = response.headers_mut().get_mut("Content-Security-Policy") {
  ///             // use the tauri helper to parse the CSP policy to a map
  ///             let mut csp_map: HashMap<String, CspDirectiveSources> = Csp::Policy(csp.to_str().unwrap().to_string()).into();
  ///             csp_map.entry("script-src".to_string()).or_insert_with(Default::default).push("'unsafe-inline'");
  ///             // use the tauri helper to get a CSP string from the map
  ///             let csp_string = Csp::from(csp_map).to_string();
  ///             *csp = HeaderValue::from_str(&csp_string).unwrap();
  ///           }
  ///         }
  ///       })
  ///       .build()
  ///       .unwrap();
  ///     Ok(())
  ///   });
  /// ```
  pub fn on_web_resource_request<F: Fn(&HttpRequest, &mut HttpResponse) + Send + Sync + 'static>(
    mut self,
    f: F,
  ) -> Self {
    self.web_resource_request_handler.replace(Box::new(f));
    self
  }

  /// Creates a new webview window.
  pub fn build(mut self) -> crate::Result<Window<R>> {
    let web_resource_request_handler = self.web_resource_request_handler.take();
    let pending = PendingWindow::new(
      self.window_builder.clone(),
      self.webview_attributes.clone(),
      self.label.clone(),
    )?;
    let labels = self.manager().labels().into_iter().collect::<Vec<_>>();
    let pending = self.manager().prepare_window(
      self.managed_app_handle(),
      pending,
      &labels,
      web_resource_request_handler,
    )?;
    let window = match self.runtime() {
      RuntimeOrDispatch::Runtime(runtime) => runtime.create_window(pending),
      RuntimeOrDispatch::RuntimeHandle(handle) => handle.create_window(pending),
      RuntimeOrDispatch::Dispatch(mut dispatcher) => dispatcher.create_window(pending),
    }
    .map(|window| {
      self
        .manager()
        .attach_window(self.managed_app_handle(), window)
    })?;

    self.manager().emit_filter(
      "tauri://window-created",
      None,
      Some(WindowCreatedEvent {
        label: window.label().into(),
      }),
      |w| w != &window,
    )?;

    Ok(window)
  }

  // --------------------------------------------- Window builder ---------------------------------------------

  /// Sets the menu for the window.
  #[must_use]
  pub fn menu(mut self, menu: Menu) -> Self {
    self.window_builder = self.window_builder.menu(menu);
    self
  }

  /// Show window in the center of the screen.
  #[must_use]
  pub fn center(mut self) -> Self {
    self.window_builder = self.window_builder.center();
    self
  }

  /// The initial position of the window's.
  #[must_use]
  pub fn position(mut self, x: f64, y: f64) -> Self {
    self.window_builder = self.window_builder.position(x, y);
    self
  }

  /// Window size.
  #[must_use]
  pub fn inner_size(mut self, width: f64, height: f64) -> Self {
    self.window_builder = self.window_builder.inner_size(width, height);
    self
  }

  /// Window min inner size.
  #[must_use]
  pub fn min_inner_size(mut self, min_width: f64, min_height: f64) -> Self {
    self.window_builder = self.window_builder.min_inner_size(min_width, min_height);
    self
  }

  /// Window max inner size.
  #[must_use]
  pub fn max_inner_size(mut self, max_width: f64, max_height: f64) -> Self {
    self.window_builder = self.window_builder.max_inner_size(max_width, max_height);
    self
  }

  /// Whether the window is resizable or not.
  #[must_use]
  pub fn resizable(mut self, resizable: bool) -> Self {
    self.window_builder = self.window_builder.resizable(resizable);
    self
  }

  /// The title of the window in the title bar.
  #[must_use]
  pub fn title<S: Into<String>>(mut self, title: S) -> Self {
    self.window_builder = self.window_builder.title(title);
    self
  }

  /// Whether to start the window in fullscreen or not.
  #[must_use]
  pub fn fullscreen(mut self, fullscreen: bool) -> Self {
    self.window_builder = self.window_builder.fullscreen(fullscreen);
    self
  }

  /// Whether the window will be initially hidden or focused.
  #[must_use]
  pub fn focus(mut self) -> Self {
    self.window_builder = self.window_builder.focus();
    self
  }

  /// Whether the window should be maximized upon creation.
  #[must_use]
  pub fn maximized(mut self, maximized: bool) -> Self {
    self.window_builder = self.window_builder.maximized(maximized);
    self
  }

  /// Whether the window should be immediately visible upon creation.
  #[must_use]
  pub fn visible(mut self, visible: bool) -> Self {
    self.window_builder = self.window_builder.visible(visible);
    self
  }

  /// Whether the the window should be transparent. If this is true, writing colors
  /// with alpha values different than `1.0` will produce a transparent window.
  #[cfg(any(not(target_os = "macos"), feature = "macos-private-api"))]
  #[cfg_attr(
    doc_cfg,
    doc(cfg(any(not(target_os = "macos"), feature = "macos-private-api")))
  )]
  #[must_use]
  pub fn transparent(mut self, transparent: bool) -> Self {
    self.window_builder = self.window_builder.transparent(transparent);
    self
  }

  /// Whether the window should have borders and bars.
  #[must_use]
  pub fn decorations(mut self, decorations: bool) -> Self {
    self.window_builder = self.window_builder.decorations(decorations);
    self
  }

  /// Whether the window should always be on top of other windows.
  #[must_use]
  pub fn always_on_top(mut self, always_on_top: bool) -> Self {
    self.window_builder = self.window_builder.always_on_top(always_on_top);
    self
  }

  /// Sets the window icon.
  pub fn icon(mut self, icon: Icon) -> crate::Result<Self> {
    self.window_builder = self.window_builder.icon(icon.try_into()?)?;
    Ok(self)
  }

  /// Sets whether or not the window icon should be added to the taskbar.
  #[must_use]
  pub fn skip_taskbar(mut self, skip: bool) -> Self {
    self.window_builder = self.window_builder.skip_taskbar(skip);
    self
  }

  /// Sets a parent to the window to be created.
  ///
  /// A child window has the WS_CHILD style and is confined to the client area of its parent window.
  ///
  /// For more information, see <https://docs.microsoft.com/en-us/windows/win32/winmsg/window-features#child-windows>
  #[cfg(windows)]
  #[must_use]
  pub fn parent_window(mut self, parent: HWND) -> Self {
    self.window_builder = self.window_builder.parent_window(parent);
    self
  }

  /// Set an owner to the window to be created.
  ///
  /// From MSDN:
  /// - An owned window is always above its owner in the z-order.
  /// - The system automatically destroys an owned window when its owner is destroyed.
  /// - An owned window is hidden when its owner is minimized.
  ///
  /// For more information, see <https://docs.microsoft.com/en-us/windows/win32/winmsg/window-features#owned-windows>
  #[cfg(windows)]
  #[must_use]
  pub fn owner_window(mut self, owner: HWND) -> Self {
    self.window_builder = self.window_builder.owner_window(owner);
    self
  }

  // ------------------------------------------- Webview attributes -------------------------------------------

  /// Sets the init script.
  #[must_use]
  pub fn initialization_script(mut self, script: &str) -> Self {
    self
      .webview_attributes
      .initialization_scripts
      .push(script.to_string());
    self
  }

  /// Data directory for the webview.
  #[must_use]
  pub fn data_directory(mut self, data_directory: PathBuf) -> Self {
    self
      .webview_attributes
      .data_directory
      .replace(data_directory);
    self
  }

  /// Disables the file drop handler. This is required to use drag and drop APIs on the front end on Windows.
  #[must_use]
  pub fn disable_file_drop_handler(mut self) -> Self {
    self.webview_attributes.file_drop_handler_enabled = false;
    self
  }

  /// Enables clipboard access for the page rendered on **Linux** and **Windows**.
  ///
  /// **macOS** doesn't provide such method and is always enabled by default,
  /// but you still need to add menu item accelerators to use shortcuts.
  #[must_use]
  pub fn enable_clipboard_access(mut self) -> Self {
    self.webview_attributes.clipboard = true;
    self
  }
}

// TODO: expand these docs since this is a pretty important type
/// A webview window managed by Tauri.
///
/// This type also implements [`Manager`] which allows you to manage other windows attached to
/// the same application.
#[default_runtime(crate::Wry, wry)]
#[derive(Debug)]
pub struct Window<R: Runtime> {
  /// The webview window created by the runtime.
  window: DetachedWindow<EventLoopMessage, R>,
  /// The manager to associate this webview window with.
  manager: WindowManager<R>,
  pub(crate) app_handle: AppHandle<R>,
}

#[cfg(any(windows, target_os = "macos"))]
#[cfg_attr(doc_cfg, doc(cfg(any(windows, target_os = "macos"))))]
unsafe impl<R: Runtime> raw_window_handle::HasRawWindowHandle for Window<R> {
  #[cfg(windows)]
  fn raw_window_handle(&self) -> raw_window_handle::RawWindowHandle {
    let mut handle = raw_window_handle::Win32Handle::empty();
    handle.hwnd = self.hwnd().expect("failed to get window `hwnd`");
    raw_window_handle::RawWindowHandle::Win32(handle)
  }

  #[cfg(target_os = "macos")]
  fn raw_window_handle(&self) -> raw_window_handle::RawWindowHandle {
    let mut handle = raw_window_handle::AppKitHandle::empty();
    handle.ns_window = self
      .ns_window()
      .expect("failed to get window's `ns_window`");
    raw_window_handle::RawWindowHandle::AppKit(handle)
  }
}

impl<R: Runtime> Clone for Window<R> {
  fn clone(&self) -> Self {
    Self {
      window: self.window.clone(),
      manager: self.manager.clone(),
      app_handle: self.app_handle.clone(),
    }
  }
}

impl<R: Runtime> Hash for Window<R> {
  /// Only use the [`Window`]'s label to represent its hash.
  fn hash<H: Hasher>(&self, state: &mut H) {
    self.window.label.hash(state)
  }
}

impl<R: Runtime> Eq for Window<R> {}
impl<R: Runtime> PartialEq for Window<R> {
  /// Only use the [`Window`]'s label to compare equality.
  fn eq(&self, other: &Self) -> bool {
    self.window.label.eq(&other.window.label)
  }
}

impl<R: Runtime> Manager<R> for Window<R> {}
impl<R: Runtime> ManagerBase<R> for Window<R> {
  fn manager(&self) -> &WindowManager<R> {
    &self.manager
  }

  fn runtime(&self) -> RuntimeOrDispatch<'_, R> {
    RuntimeOrDispatch::Dispatch(self.dispatcher())
  }

  fn managed_app_handle(&self) -> AppHandle<R> {
    self.app_handle.clone()
  }
}

impl<'de, R: Runtime> CommandArg<'de, R> for Window<R> {
  /// Grabs the [`Window`] from the [`CommandItem`]. This will never fail.
  fn from_command(command: CommandItem<'de, R>) -> Result<Self, InvokeError> {
    Ok(command.message.window())
  }
}

impl<R: Runtime> Window<R> {
  /// Create a new window that is attached to the manager.
  pub(crate) fn new(
    manager: WindowManager<R>,
    window: DetachedWindow<EventLoopMessage, R>,
    app_handle: AppHandle<R>,
  ) -> Self {
    Self {
      window,
      manager,
      app_handle,
    }
  }

  /// Initializes a webview window builder with the given window label and URL to load on the webview.
  ///
  /// Data URLs are only supported with the `window-data-url` feature flag.
  pub fn builder<M: Manager<R>, L: Into<String>>(
    manager: &M,
    label: L,
    url: WindowUrl,
  ) -> WindowBuilder<R> {
    WindowBuilder::<R>::new(manager, label.into(), url)
  }

  /// Creates a new webview window.
  ///
  /// Data URLs are only supported with the `window-data-url` feature flag.
  ///
  /// See [`Self::builder`] for an API with extended functionality.
  #[deprecated(
    since = "1.0.0-rc.4",
    note = "The `builder` function offers an easier API with extended functionality"
  )]
  pub fn create_window<F>(
    &mut self,
    label: String,
    url: WindowUrl,
    setup: F,
  ) -> crate::Result<Window<R>>
  where
    F: FnOnce(
      <R::Dispatcher as Dispatch<EventLoopMessage>>::WindowBuilder,
      WebviewAttributes,
    ) -> (
      <R::Dispatcher as Dispatch<EventLoopMessage>>::WindowBuilder,
      WebviewAttributes,
    ),
  {
    let mut builder = WindowBuilder::<R>::new(self, label, url);
    let (window_builder, webview_attributes) =
      setup(builder.window_builder, builder.webview_attributes);
    builder.window_builder = window_builder;
    builder.webview_attributes = webview_attributes;
    builder.build()
  }

  pub(crate) fn invoke_responder(&self) -> Arc<InvokeResponder<R>> {
    self.manager.invoke_responder()
  }

  /// The current window's dispatcher.
  pub(crate) fn dispatcher(&self) -> R::Dispatcher {
    self.window.dispatcher.clone()
  }

  /// Runs the given closure on the main thread.
  pub fn run_on_main_thread<F: FnOnce() + Send + 'static>(&self, f: F) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .run_on_main_thread(f)
      .map_err(Into::into)
  }

  /// How to handle this window receiving an [`InvokeMessage`].
  pub fn on_message(self, payload: InvokePayload) -> crate::Result<()> {
    let manager = self.manager.clone();
    match payload.cmd.as_str() {
      "__initialized" => {
        let payload: PageLoadPayload = serde_json::from_value(payload.inner)?;
        manager.run_on_page_load(self, payload);
      }
      _ => {
        let message = InvokeMessage::new(
          self.clone(),
          manager.state(),
          payload.cmd.to_string(),
          payload.inner,
        );
        let resolver = InvokeResolver::new(self, payload.callback, payload.error);

        let invoke = Invoke { message, resolver };
        if let Some(module) = &payload.tauri_module {
          let module = module.to_string();
          crate::endpoints::handle(module, invoke, manager.config(), manager.package_info());
        } else if payload.cmd.starts_with("plugin:") {
          manager.extend_api(invoke);
        } else {
          manager.run_invoke_handler(invoke);
        }
      }
    }

    Ok(())
  }

  /// The label of this window.
  pub fn label(&self) -> &str {
    &self.window.label
  }

  /// Emits an event to both the JavaScript and the Rust listeners.
  pub fn emit_and_trigger<S: Serialize + Clone>(
    &self,
    event: &str,
    payload: S,
  ) -> crate::Result<()> {
    self.trigger(event, Some(serde_json::to_string(&payload)?));
    self.emit(event, payload)
  }

  pub(crate) fn emit_internal<S: Serialize>(
    &self,
    event: &str,
    source_window_label: Option<&str>,
    payload: S,
  ) -> crate::Result<()> {
    self.eval(&format!(
      "window['{}']({{event: {}, windowLabel: {}, payload: {}}})",
      self.manager.event_emit_function_name(),
      serde_json::to_string(event)?,
      serde_json::to_string(&source_window_label)?,
      serde_json::to_value(payload)?,
    ))?;
    Ok(())
  }

  /// Emits an event to the JavaScript listeners on the current window.
  ///
  /// The event is only delivered to listeners that used the `WebviewWindow#listen` method on the @tauri-apps/api `window` module.
  pub fn emit<S: Serialize + Clone>(&self, event: &str, payload: S) -> crate::Result<()> {
    self
      .manager
      .emit_filter(event, Some(self.label()), payload, |w| {
        w.has_js_listener(None, event) || w.has_js_listener(Some(self.label().into()), event)
      })?;
    Ok(())
  }

  /// Listen to an event on this window.
  ///
  /// This listener only receives events that are triggered using the
  /// [`trigger`](Window#method.trigger) and [`emit_and_trigger`](Window#method.emit_and_trigger) methods or
  /// the `appWindow.emit` function from the @tauri-apps/api `window` module.
  pub fn listen<F>(&self, event: impl Into<String>, handler: F) -> EventHandler
  where
    F: Fn(Event) + Send + 'static,
  {
    let label = self.window.label.clone();
    self.manager.listen(event.into(), Some(label), handler)
  }

  /// Unlisten to an event on this window.
  pub fn unlisten(&self, handler_id: EventHandler) {
    self.manager.unlisten(handler_id)
  }

  /// Listen to an event on this window a single time.
  pub fn once<F>(&self, event: impl Into<String>, handler: F) -> EventHandler
  where
    F: FnOnce(Event) + Send + 'static,
  {
    let label = self.window.label.clone();
    self.manager.once(event.into(), Some(label), handler)
  }

  /// Triggers an event to the Rust listeners on this window.
  ///
  /// The event is only delivered to listeners that used the [`listen`](Window#method.listen) method.
  pub fn trigger(&self, event: &str, data: Option<String>) {
    let label = self.window.label.clone();
    self.manager.trigger(event, Some(label), data)
  }

  /// Evaluates JavaScript on this window.
  pub fn eval(&self, js: &str) -> crate::Result<()> {
    self.window.dispatcher.eval_script(js).map_err(Into::into)
  }

  /// Registers a window event listener.
  pub fn on_window_event<F: Fn(&WindowEvent) + Send + 'static>(&self, f: F) {
    self.window.dispatcher.on_window_event(f);
  }

  /// Registers a menu event listener.
  pub fn on_menu_event<F: Fn(MenuEvent) + Send + 'static>(&self, f: F) -> uuid::Uuid {
    let menu_ids = self.window.menu_ids.clone();
    self.window.dispatcher.on_menu_event(move |event| {
      f(MenuEvent {
        menu_item_id: menu_ids
          .lock()
          .unwrap()
          .get(&event.menu_item_id)
          .unwrap()
          .clone(),
      })
    })
  }

  pub(crate) fn register_js_listener(&self, window_label: Option<String>, event: String, id: u64) {
    self
      .window
      .js_event_listeners
      .lock()
      .unwrap()
      .entry(JsEventListenerKey {
        window_label,
        event,
      })
      .or_insert_with(Default::default)
      .insert(id);
  }

  pub(crate) fn unregister_js_listener(&self, id: u64) {
    let mut empty = None;
    let mut js_listeners = self.window.js_event_listeners.lock().unwrap();
    for (key, ids) in js_listeners.iter_mut() {
      if ids.contains(&id) {
        ids.remove(&id);
        if ids.is_empty() {
          empty.replace(key.clone());
        }
        break;
      }
    }

    if let Some(key) = empty {
      js_listeners.remove(&key);
    }
  }

  /// Whether this window registered a listener to an event from the given window and event name.
  pub(crate) fn has_js_listener(&self, window_label: Option<String>, event: &str) -> bool {
    self
      .window
      .js_event_listeners
      .lock()
      .unwrap()
      .contains_key(&JsEventListenerKey {
        window_label,
        event: event.into(),
      })
  }

  /// Opens the developer tools window (Web Inspector).
  /// The devtools is only enabled on debug builds or with the `devtools` feature flag.
  ///
  /// ## Platform-specific
  ///
  /// - **macOS**: This is a private API on macOS,
  /// so you cannot use this if your application will be published on the App Store.
  ///
  /// # Examples
  ///
  /// ```rust,no_run
  /// use tauri::Manager;
  /// tauri::Builder::default()
  ///   .setup(|app| {
  ///     #[cfg(debug_assertions)]
  ///     app.get_window("main").unwrap().open_devtools();
  ///     Ok(())
  ///   });
  /// ```
  #[cfg(any(debug_assertions, feature = "devtools"))]
  #[cfg_attr(doc_cfg, doc(cfg(any(debug_assertions, feature = "devtools"))))]
  pub fn open_devtools(&self) {
    self.window.dispatcher.open_devtools();
  }

  // Getters

  /// Gets a handle to the window menu.
  pub fn menu_handle(&self) -> MenuHandle<R> {
    MenuHandle {
      ids: self.window.menu_ids.clone(),
      dispatcher: self.dispatcher(),
    }
  }

  /// Returns the scale factor that can be used to map logical pixels to physical pixels, and vice versa.
  pub fn scale_factor(&self) -> crate::Result<f64> {
    self.window.dispatcher.scale_factor().map_err(Into::into)
  }

  /// Returns the position of the top-left hand corner of the window's client area relative to the top-left hand corner of the desktop.
  pub fn inner_position(&self) -> crate::Result<PhysicalPosition<i32>> {
    self.window.dispatcher.inner_position().map_err(Into::into)
  }

  /// Returns the position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.
  pub fn outer_position(&self) -> crate::Result<PhysicalPosition<i32>> {
    self.window.dispatcher.outer_position().map_err(Into::into)
  }

  /// Returns the physical size of the window's client area.
  ///
  /// The client area is the content of the window, excluding the title bar and borders.
  pub fn inner_size(&self) -> crate::Result<PhysicalSize<u32>> {
    self.window.dispatcher.inner_size().map_err(Into::into)
  }

  /// Returns the physical size of the entire window.
  ///
  /// These dimensions include the title bar and borders. If you don't want that (and you usually don't), use inner_size instead.
  pub fn outer_size(&self) -> crate::Result<PhysicalSize<u32>> {
    self.window.dispatcher.outer_size().map_err(Into::into)
  }

  /// Gets the window's current fullscreen state.
  pub fn is_fullscreen(&self) -> crate::Result<bool> {
    self.window.dispatcher.is_fullscreen().map_err(Into::into)
  }

  /// Gets the window's current maximized state.
  pub fn is_maximized(&self) -> crate::Result<bool> {
    self.window.dispatcher.is_maximized().map_err(Into::into)
  }

  /// Gets the window’s current decoration state.
  pub fn is_decorated(&self) -> crate::Result<bool> {
    self.window.dispatcher.is_decorated().map_err(Into::into)
  }

  /// Gets the window’s current resizable state.
  pub fn is_resizable(&self) -> crate::Result<bool> {
    self.window.dispatcher.is_resizable().map_err(Into::into)
  }

  /// Gets the window's current vibility state.
  pub fn is_visible(&self) -> crate::Result<bool> {
    self.window.dispatcher.is_visible().map_err(Into::into)
  }

  /// Returns the monitor on which the window currently resides.
  ///
  /// Returns None if current monitor can't be detected.
  pub fn current_monitor(&self) -> crate::Result<Option<Monitor>> {
    self
      .window
      .dispatcher
      .current_monitor()
      .map(|m| m.map(Into::into))
      .map_err(Into::into)
  }

  /// Returns the primary monitor of the system.
  ///
  /// Returns None if it can't identify any monitor as a primary one.
  pub fn primary_monitor(&self) -> crate::Result<Option<Monitor>> {
    self
      .window
      .dispatcher
      .primary_monitor()
      .map(|m| m.map(Into::into))
      .map_err(Into::into)
  }

  /// Returns the list of all the monitors available on the system.
  pub fn available_monitors(&self) -> crate::Result<Vec<Monitor>> {
    self
      .window
      .dispatcher
      .available_monitors()
      .map(|m| m.into_iter().map(Into::into).collect())
      .map_err(Into::into)
  }

  /// Returns the native handle that is used by this window.
  #[cfg(target_os = "macos")]
  pub fn ns_window(&self) -> crate::Result<*mut std::ffi::c_void> {
    self.window.dispatcher.ns_window().map_err(Into::into)
  }
  /// Returns the native handle that is used by this window.
  #[cfg(windows)]
  pub fn hwnd(&self) -> crate::Result<*mut std::ffi::c_void> {
    self
      .window
      .dispatcher
      .hwnd()
      .map(|hwnd| hwnd.0 as *mut _)
      .map_err(Into::into)
  }

  /// Returns the `ApplicatonWindow` from gtk crate that is used by this window.
  ///
  /// Note that this can only be used on the main thread.
  #[cfg(any(
    target_os = "linux",
    target_os = "dragonfly",
    target_os = "freebsd",
    target_os = "netbsd",
    target_os = "openbsd"
  ))]
  pub fn gtk_window(&self) -> crate::Result<gtk::ApplicationWindow> {
    self.window.dispatcher.gtk_window().map_err(Into::into)
  }

  // Setters

  /// Centers the window.
  pub fn center(&self) -> crate::Result<()> {
    self.window.dispatcher.center().map_err(Into::into)
  }

  /// Requests user attention to the window, this has no effect if the application
  /// is already focused. How requesting for user attention manifests is platform dependent,
  /// see `UserAttentionType` for details.
  ///
  /// Providing `None` will unset the request for user attention. Unsetting the request for
  /// user attention might not be done automatically by the WM when the window receives input.
  ///
  /// ## Platform-specific
  ///
  /// - **macOS:** `None` has no effect.
  /// - **Linux:** Urgency levels have the same effect.
  pub fn request_user_attention(
    &self,
    request_type: Option<UserAttentionType>,
  ) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .request_user_attention(request_type)
      .map_err(Into::into)
  }

  /// Opens the dialog to prints the contents of the webview.
  /// Currently only supported on macOS on `wry`.
  /// `window.print()` works on all platforms.
  pub fn print(&self) -> crate::Result<()> {
    self.window.dispatcher.print().map_err(Into::into)
  }

  /// Determines if this window should be resizable.
  pub fn set_resizable(&self, resizable: bool) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_resizable(resizable)
      .map_err(Into::into)
  }

  /// Set this window's title.
  pub fn set_title(&self, title: &str) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_title(title.to_string())
      .map_err(Into::into)
  }

  /// Maximizes this window.
  pub fn maximize(&self) -> crate::Result<()> {
    self.window.dispatcher.maximize().map_err(Into::into)
  }

  /// Un-maximizes this window.
  pub fn unmaximize(&self) -> crate::Result<()> {
    self.window.dispatcher.unmaximize().map_err(Into::into)
  }

  /// Minimizes this window.
  pub fn minimize(&self) -> crate::Result<()> {
    self.window.dispatcher.minimize().map_err(Into::into)
  }

  /// Un-minimizes this window.
  pub fn unminimize(&self) -> crate::Result<()> {
    self.window.dispatcher.unminimize().map_err(Into::into)
  }

  /// Show this window.
  pub fn show(&self) -> crate::Result<()> {
    self.window.dispatcher.show().map_err(Into::into)
  }

  /// Hide this window.
  pub fn hide(&self) -> crate::Result<()> {
    self.window.dispatcher.hide().map_err(Into::into)
  }

  /// Closes this window.
  /// # Panics
  ///
  /// - Panics if the event loop is not running yet, usually when called on the [`setup`](crate::Builder#method.setup) closure.
  /// - Panics when called on the main thread, usually on the [`run`](crate::App#method.run) closure.
  ///
  /// You can spawn a task to use the API using [`crate::async_runtime::spawn`] or [`std::thread::spawn`] to prevent the panic.
  pub fn close(&self) -> crate::Result<()> {
    self.window.dispatcher.close().map_err(Into::into)
  }

  /// Determines if this window should be [decorated].
  ///
  /// [decorated]: https://en.wikipedia.org/wiki/Window_(computing)#Window_decoration
  pub fn set_decorations(&self, decorations: bool) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_decorations(decorations)
      .map_err(Into::into)
  }

  /// Determines if this window should always be on top of other windows.
  pub fn set_always_on_top(&self, always_on_top: bool) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_always_on_top(always_on_top)
      .map_err(Into::into)
  }

  /// Resizes this window.
  pub fn set_size<S: Into<Size>>(&self, size: S) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_size(size.into())
      .map_err(Into::into)
  }

  /// Sets this window's minimum size.
  pub fn set_min_size<S: Into<Size>>(&self, size: Option<S>) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_min_size(size.map(|s| s.into()))
      .map_err(Into::into)
  }

  /// Sets this window's maximum size.
  pub fn set_max_size<S: Into<Size>>(&self, size: Option<S>) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_max_size(size.map(|s| s.into()))
      .map_err(Into::into)
  }

  /// Sets this window's position.
  pub fn set_position<Pos: Into<Position>>(&self, position: Pos) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_position(position.into())
      .map_err(Into::into)
  }

  /// Determines if this window should be fullscreen.
  pub fn set_fullscreen(&self, fullscreen: bool) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_fullscreen(fullscreen)
      .map_err(Into::into)
  }

  /// Bring the window to front and focus.
  pub fn set_focus(&self) -> crate::Result<()> {
    self.window.dispatcher.set_focus().map_err(Into::into)
  }

  /// Sets this window' icon.
  pub fn set_icon(&self, icon: Icon) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_icon(icon.try_into()?)
      .map_err(Into::into)
  }

  /// Whether to show the window icon in the task bar or not.
  pub fn set_skip_taskbar(&self, skip: bool) -> crate::Result<()> {
    self
      .window
      .dispatcher
      .set_skip_taskbar(skip)
      .map_err(Into::into)
  }

  /// Starts dragging the window.
  pub fn start_dragging(&self) -> crate::Result<()> {
    self.window.dispatcher.start_dragging().map_err(Into::into)
  }
}

#[cfg(test)]
mod tests {
  #[test]
  fn window_is_send_sync() {
    crate::test_utils::assert_send::<super::Window>();
    crate::test_utils::assert_sync::<super::Window>();
  }
}
