// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use anyhow::Context;

use crate::helpers::cross_command;
use std::{fmt::Display, path::Path, process::Command};

#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub enum PackageManager {
  Npm,
  Pnpm,
  Yarn,
  YarnBerry,
  Bun,
  Deno,
}

impl Display for PackageManager {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    write!(
      f,
      "{}",
      match self {
        PackageManager::Npm => "npm",
        PackageManager::Pnpm => "pnpm",
        PackageManager::Yarn => "yarn",
        PackageManager::YarnBerry => "yarn berry",
        PackageManager::Bun => "bun",
        PackageManager::Deno => "deno",
      }
    )
  }
}

impl PackageManager {
  pub fn from_project<P: AsRef<Path>>(path: P) -> Vec<Self> {
    let mut found = Vec::new();

    if let Ok(entries) = std::fs::read_dir(path) {
      for entry in entries.flatten() {
        let path = entry.path();
        let name = path.file_name().unwrap().to_string_lossy();
        if name.as_ref() == "package-lock.json" {
          found.push(PackageManager::Npm);
        } else if name.as_ref() == "pnpm-lock.yaml" {
          found.push(PackageManager::Pnpm);
        } else if name.as_ref() == "yarn.lock" {
          found.push(PackageManager::Yarn);
        } else if name.as_ref() == "bun.lockb" {
          found.push(PackageManager::Bun);
        } else if name.as_ref() == "deno.lock" {
          found.push(PackageManager::Deno);
        }
      }
    }

    found
  }

  fn cross_command(&self) -> Command {
    match self {
      PackageManager::Yarn => cross_command("yarn"),
      PackageManager::YarnBerry => cross_command("yarn"),
      PackageManager::Npm => cross_command("npm"),
      PackageManager::Pnpm => cross_command("pnpm"),
      PackageManager::Bun => cross_command("bun"),
      PackageManager::Deno => cross_command("deno"),
    }
  }

  pub fn install<P: AsRef<Path>>(
    &self,
    dependencies: &[String],
    frontend_dir: P,
  ) -> crate::Result<()> {
    let dependencies_str = if dependencies.len() > 1 {
      "dependencies"
    } else {
      "dependency"
    };
    log::info!(
      "Installing NPM {dependencies_str} {}...",
      dependencies
        .iter()
        .map(|d| format!("\"{d}\""))
        .collect::<Vec<_>>()
        .join(", ")
    );

    let status = self
      .cross_command()
      .arg("add")
      .args(dependencies)
      .current_dir(frontend_dir)
      .status()
      .with_context(|| format!("failed to run {self}"))?;

    if !status.success() {
      anyhow::bail!("Failed to install NPM {dependencies_str}");
    }

    Ok(())
  }

  pub fn remove<P: AsRef<Path>>(
    &self,
    dependencies: &[String],
    frontend_dir: P,
  ) -> crate::Result<()> {
    let dependencies_str = if dependencies.len() > 1 {
      "dependencies"
    } else {
      "dependency"
    };
    log::info!(
      "Removing NPM {dependencies_str} {}...",
      dependencies
        .iter()
        .map(|d| format!("\"{d}\""))
        .collect::<Vec<_>>()
        .join(", ")
    );

    let status = self
      .cross_command()
      .arg(if *self == Self::Npm {
        "uninstall"
      } else {
        "remove"
      })
      .args(dependencies)
      .current_dir(frontend_dir)
      .status()
      .with_context(|| format!("failed to run {self}"))?;

    if !status.success() {
      anyhow::bail!("Failed to remove NPM {dependencies_str}");
    }

    Ok(())
  }

  pub fn current_package_version<P: AsRef<Path>>(
    &self,
    name: &str,
    frontend_dir: P,
  ) -> crate::Result<Option<String>> {
    let (output, regex) = match self {
      PackageManager::Yarn => (
        cross_command("yarn")
          .args(["list", "--pattern"])
          .arg(name)
          .args(["--depth", "0"])
          .current_dir(frontend_dir)
          .output()?,
        None,
      ),
      PackageManager::YarnBerry => (
        cross_command("yarn")
          .arg("info")
          .arg(name)
          .arg("--json")
          .current_dir(frontend_dir)
          .output()?,
        Some(regex::Regex::new("\"Version\":\"([\\da-zA-Z\\-\\.]+)\"").unwrap()),
      ),
      PackageManager::Pnpm => (
        cross_command("pnpm")
          .arg("list")
          .arg(name)
          .args(["--parseable", "--depth", "0"])
          .current_dir(frontend_dir)
          .output()?,
        None,
      ),
      // Bun and Deno don't support `list` command
      PackageManager::Npm | PackageManager::Bun | PackageManager::Deno => (
        cross_command("npm")
          .arg("list")
          .arg(name)
          .args(["version", "--depth", "0"])
          .current_dir(frontend_dir)
          .output()?,
        None,
      ),
    };
    if output.status.success() {
      let stdout = String::from_utf8_lossy(&output.stdout);
      let regex = regex.unwrap_or_else(|| regex::Regex::new("@(\\d[\\da-zA-Z\\-\\.]+)").unwrap());
      Ok(
        regex
          .captures_iter(&stdout)
          .last()
          .and_then(|cap| cap.get(1).map(|v| v.as_str().to_string())),
      )
    } else {
      Ok(None)
    }
  }
}
