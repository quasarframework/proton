use std::path::PathBuf;

/// Try to determine the current target triple.
///
/// Returns a target triple (e.g. `x86_64-unknown-linux-gnu` or `i686-pc-windows-msvc`) or an
/// `Error::Config` if the current config cannot be determined or is not some combination of the
/// following values:
/// `linux, mac, windows` -- `i686, x86, armv7` -- `gnu, musl, msvc`
///
/// * Errors:
///     * Unexpected system config
pub fn target_triple() -> Result<String, crate::Error> {
  let arch = if cfg!(target_arch = "x86") {
    "i686"
  } else if cfg!(target_arch = "x86_64") {
    "x86_64"
  } else if cfg!(target_arch = "arm") {
    "armv7"
  } else {
    return Err(crate::Error::from(
      "Unable to determine target-architecture",
    ));
  };

  let os = if cfg!(target_os = "linux") {
    "unknown-linux"
  } else if cfg!(target_os = "macos") {
    "apple-darwin"
  } else if cfg!(target_os = "windows") {
    "pc-windows"
  } else if cfg!(target_os = "freebsd") {
    "unknown-freebsd"
  } else {
    return Err(crate::Error::from("Unable to determine target-os"));
  };

  let s;
  let os = if cfg!(target_os = "macos") || cfg!(target_os = "freebsd") {
    os
  } else {
    let env = if cfg!(target_env = "gnu") {
      "gnu"
    } else if cfg!(target_env = "musl") {
      "musl"
    } else if cfg!(target_env = "msvc") {
      "msvc"
    } else {
      return Err(crate::Error::from("Unable to determine target-environment"));
    };
    s = format!("{}-{}", os, env);
    &s
  };

  Ok(format!("{}-{}", arch, os))
}

pub fn resource_dir() -> Result<PathBuf, crate::Error> {
  let exe = std::env::current_exe()?;
  let exe_dir = exe.parent().expect("failed to get exe directory");
  let app_name = exe.file_name().expect("failed to get exe filename").to_string_lossy();
  let curr_dir = exe_dir.display().to_string();
  if cfg!(target_os = "linux") {
    if curr_dir.ends_with("/target/debug") || curr_dir.ends_with("/target/release") { // running from the out dir
      Ok(exe_dir.to_path_buf())
    } else if curr_dir.ends_with("/data/usr/bin") { // running from the deb bundle dir
      Ok(exe_dir.join(format!("../lib/{}", app_name)))
    } else { // running bundle
      Ok(PathBuf::from(format!("/usr/lib/{}", app_name)))
    }
  } else if cfg!(target_os = "windows") {
    Ok(PathBuf::from("/"))
  } else if cfg!(target_os = "macos") {
    Ok(PathBuf::from("/"))
  } else {
    Err(crate::Error::from("Unknown target_os"))
  }
}