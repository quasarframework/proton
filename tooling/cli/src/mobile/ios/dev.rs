use super::{device_prompt, ensure_init, env, init_dot_cargo, with_config, Error, MobileTarget};
use crate::{
  helpers::{config::get as get_tauri_config, flock},
  interface::{AppSettings, Interface, MobileOptions, Options as InterfaceOptions},
  mobile::{write_options, CliOptions, DevChild, DevProcess},
  Result,
};
use clap::Parser;

use cargo_mobile::{
  apple::config::Config as AppleConfig,
  config::Config,
  opts::{NoiseLevel, Profile},
  os,
};

#[derive(Debug, Clone, Parser)]
#[clap(about = "iOS dev")]
pub struct Options {
  /// List of cargo features to activate
  #[clap(short, long, multiple_occurrences(true), multiple_values(true))]
  pub features: Option<Vec<String>>,
  /// Exit on panic
  #[clap(short, long)]
  exit_on_panic: bool,
  /// JSON string or path to JSON file to merge with tauri.conf.json
  #[clap(short, long)]
  pub config: Option<String>,
  /// Run the code in release mode
  #[clap(long = "release")]
  pub release_mode: bool,
  /// Disable the file watcher
  #[clap(long)]
  pub no_watch: bool,
  /// Open Xcode instead of trying to run on a connected device
  #[clap(short, long)]
  pub open: bool,
}

impl From<Options> for crate::dev::Options {
  fn from(options: Options) -> Self {
    Self {
      runner: None,
      target: None,
      features: options.features,
      exit_on_panic: options.exit_on_panic,
      config: options.config,
      release_mode: options.release_mode,
      args: Vec::new(),
      no_watch: options.no_watch,
    }
  }
}

pub fn command(options: Options) -> Result<()> {
  with_config(|root_conf, config, _metadata| {
    ensure_init(config.project_dir(), MobileTarget::Ios)
      .map_err(|e| Error::ProjectNotInitialized(e.to_string()))?;
    run_dev(options, root_conf, config).map_err(|e| Error::DevFailed(e.to_string()))
  })
  .map_err(Into::into)
}

fn run_dev(options: Options, root_conf: &Config, config: &AppleConfig) -> Result<()> {
  let mut dev_options = options.clone().into();
  let mut interface = crate::dev::setup(&mut dev_options)?;

  let bundle_identifier = {
    let tauri_config =
      get_tauri_config(None).map_err(|e| Error::InvalidTauriConfig(e.to_string()))?;
    let tauri_config_guard = tauri_config.lock().unwrap();
    let tauri_config_ = tauri_config_guard.as_ref().unwrap();
    tauri_config_.tauri.bundle.identifier.clone()
  };

  let app_settings = interface.app_settings();
  let bin_path = app_settings.app_binary_path(&InterfaceOptions {
    debug: !dev_options.release_mode,
    ..Default::default()
  })?;
  let out_dir = bin_path.parent().unwrap();
  let _lock = flock::open_rw(&out_dir.join("lock").with_extension("ios"), "iOS")?;

  let open = options.open;
  interface.mobile_dev(
    MobileOptions {
      debug: true,
      features: options.features,
      args: Vec::new(),
      config: options.config,
      no_watch: options.no_watch,
    },
    |options| {
      let cli_options = CliOptions {
        features: options.features.clone(),
        args: options.args.clone(),
        vars: Default::default(),
      };
      write_options(cli_options, &bundle_identifier, MobileTarget::Ios)?;
      if open {
        open_dev(config)
      } else {
        match run(options, root_conf, config) {
          Ok(c) => Ok(Box::new(c) as Box<dyn DevProcess>),
          Err(Error::FailedToPromptForDevice(e)) => {
            log::error!("{}", e);
            open_dev(config)
          }
          Err(e) => Err(e.into()),
        }
      }
    },
  )
}

fn open_dev(config: &AppleConfig) -> ! {
  log::info!("Opening Xcode");
  if let Err(e) = os::open_file_with("Xcode", config.project_dir()) {
    log::error!("{}", e);
  }
  loop {
    std::thread::sleep(std::time::Duration::from_secs(24 * 60 * 60));
  }
}

fn run(
  options: MobileOptions,
  root_conf: &Config,
  config: &AppleConfig,
) -> Result<DevChild, Error> {
  let profile = if options.debug {
    Profile::Debug
  } else {
    Profile::Release
  };
  let noise_level = NoiseLevel::Polite;

  let env = env()?;
  init_dot_cargo(root_conf, None).map_err(Error::InitDotCargo)?;

  device_prompt(&env)
    .map_err(Error::FailedToPromptForDevice)?
    .run(config, &env, noise_level, false, profile)
    .map(|c| DevChild(Some(c)))
    .map_err(Error::RunFailed)
}
