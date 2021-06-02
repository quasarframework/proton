// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

pub use tauri_runtime::{
  menu::{
    CustomMenuItem, Menu, MenuEntry, MenuItem, SystemTrayMenu, SystemTrayMenuEntry,
    SystemTrayMenuItem,
  },
  window::MenuEvent,
  MenuId, SystemTrayEvent,
};
pub use wry::application::menu::{
  ContextMenu as WryContextMenu, CustomMenuItem as WryCustomMenuItem, MenuBar, MenuId as WryMenuId,
  MenuItem as WryMenuItem, MenuType,
};

use uuid::Uuid;

use std::{
  collections::HashMap,
  sync::{Arc, Mutex},
};

pub type MenuEventHandler = Box<dyn Fn(&MenuEvent) + Send>;
pub type MenuEventListeners = Arc<Mutex<HashMap<Uuid, MenuEventHandler>>>;
pub type SystemTrayEventHandler = Box<dyn Fn(&SystemTrayEvent) + Send>;
pub type SystemTrayEventListeners = Arc<Mutex<HashMap<Uuid, SystemTrayEventHandler>>>;

pub struct MenuItemWrapper(pub WryMenuItem);

impl From<MenuItem> for MenuItemWrapper {
  fn from(item: MenuItem) -> Self {
    match item {
      MenuItem::About(v) => Self(WryMenuItem::About(v)),
      MenuItem::Hide => Self(WryMenuItem::Hide),
      MenuItem::Services => Self(WryMenuItem::Services),
      MenuItem::HideOthers => Self(WryMenuItem::HideOthers),
      MenuItem::ShowAll => Self(WryMenuItem::ShowAll),
      MenuItem::CloseWindow => Self(WryMenuItem::CloseWindow),
      MenuItem::Quit => Self(WryMenuItem::Quit),
      MenuItem::Copy => Self(WryMenuItem::Copy),
      MenuItem::Cut => Self(WryMenuItem::Cut),
      MenuItem::Undo => Self(WryMenuItem::Undo),
      MenuItem::Redo => Self(WryMenuItem::Redo),
      MenuItem::SelectAll => Self(WryMenuItem::SelectAll),
      MenuItem::Paste => Self(WryMenuItem::Paste),
      MenuItem::EnterFullScreen => Self(WryMenuItem::EnterFullScreen),
      MenuItem::Minimize => Self(WryMenuItem::Minimize),
      MenuItem::Zoom => Self(WryMenuItem::Zoom),
      MenuItem::Separator => Self(WryMenuItem::Separator),
      _ => unimplemented!(),
    }
  }
}

impl From<SystemTrayMenuItem> for MenuItemWrapper {
  fn from(item: SystemTrayMenuItem) -> Self {
    match item {
      SystemTrayMenuItem::Separator => Self(WryMenuItem::Separator),
      _ => unimplemented!(),
    }
  }
}

#[cfg(feature = "menu")]
pub fn to_wry_menu<I: MenuId>(menu: Menu<I>) -> MenuBar {
  let mut wry_menu = MenuBar::new();
  for item in menu.items {
    match item {
      MenuEntry::CustomItem(c) => {
        wry_menu.add_item(
          WryCustomMenuItem::new(
            &c.title,
            c.keyboard_accelerator.as_deref(),
            c.enabled,
            c.selected,
          )
          .with_id(WryMenuId(c.id_value())),
        );
      }
      MenuEntry::NativeItem(i) => {
        wry_menu.add_native_item(MenuItemWrapper::from(i).0);
      }
      MenuEntry::Submenu(submenu) => {
        wry_menu.add_submenu(&submenu.title, submenu.enabled, to_wry_menu(submenu.inner));
      }
    }
  }
  wry_menu
}

#[cfg(feature = "system-tray")]
pub fn to_wry_context_menu<I: MenuId>(menu: SystemTrayMenu<I>) -> WryContextMenu {
  let mut tray_menu = WryContextMenu::new();
  for item in menu.items {
    match item {
      SystemTrayMenuEntry::CustomItem(c) => {
        tray_menu.add_item(
          WryCustomMenuItem::new(
            &c.title,
            c.keyboard_accelerator.as_deref(),
            c.enabled,
            c.selected,
          )
          .with_id(WryMenuId(c.id_value())),
        );
      }
      SystemTrayMenuEntry::NativeItem(i) => {
        tray_menu.add_native_item(MenuItemWrapper::from(i).0);
      }
      SystemTrayMenuEntry::Submenu(submenu) => {
        tray_menu.add_submenu(
          &submenu.title,
          submenu.enabled,
          to_wry_context_menu(submenu.inner),
        );
      }
    }
  }
  tray_menu
}
