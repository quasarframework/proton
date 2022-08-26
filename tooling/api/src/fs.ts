// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

/**
 * Access the file system.
 *
 * This package is also accessible with `window.__TAURI__.fs` when [`build.withGlobalTauri`](https://tauri.app/v1/api/config/#buildconfig.withglobaltauri) in `tauri.conf.json` is set to `true`.
 *
 * The APIs must be added to [`tauri.allowlist.fs`](https://tauri.app/v1/api/config/#allowlistconfig.fs) in `tauri.conf.json`:
 * ```json
 * {
 *   "tauri": {
 *     "allowlist": {
 *       "fs": {
 *         "all": true, // enable all FS APIs
 *         "readFile": true,
 *         "writeFile": true,
 *         "readDir": true,
 *         "copyFile": true,
 *         "createDir": true,
 *         "removeDir": true,
 *         "removeFile": true,
 *         "renameFile": true,
 *         "exists": true
 *       }
 *     }
 *   }
 * }
 * ```
 * It is recommended to allowlist only the APIs you use for optimal bundle size and security.
 *
 * ## Security
 *
 * This module prevents path traversal, not allowing absolute paths or parent dir components
 * (i.e. "/usr/path/to/file" or "../path/to/file" paths are not allowed).
 * Paths accessed with this API must be relative to one of the {@link BaseDirectory | base directories}
 * so if you need access to arbitrary filesystem paths, you must write such logic on the core layer instead.
 *
 * The API has a scope configuration that forces you to restrict the paths that can be accessed using glob patterns.
 *
 * The scope configuration is an array of glob patterns describing folder paths that are allowed.
 * For instance, this scope configuration only allows accessing files on the
 * *databases* folder of the {@link path.appDir | $APP directory}:
 * ```json
 * {
 *   "tauri": {
 *     "allowlist": {
 *       "fs": {
 *         "scope": ["$APP/databases/*"]
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * Notice the use of the `$APP` variable. The value is injected at runtime, resolving to the {@link path.appDir | app directory}.
 * The available variables are:
 * {@link path.audioDir | `$AUDIO`}, {@link path.cacheDir | `$CACHE`}, {@link path.configDir | `$CONFIG`}, {@link path.dataDir | `$DATA`},
 * {@link path.localDataDir | `$LOCALDATA`}, {@link path.desktopDir | `$DESKTOP`}, {@link path.documentDir | `$DOCUMENT`},
 * {@link path.downloadDir | `$DOWNLOAD`}, {@link path.executableDir | `$EXE`}, {@link path.fontDir | `$FONT`}, {@link path.homeDir | `$HOME`},
 * {@link path.pictureDir | `$PICTURE`}, {@link path.publicDir | `$PUBLIC`}, {@link path.runtimeDir | `$RUNTIME`},
 * {@link path.templateDir | `$TEMPLATE`}, {@link path.videoDir | `$VIDEO`}, {@link path.resourceDir | `$RESOURCE`}, {@link path.appDir | `$APP`},
 * {@link path.logDir | `$LOG`}, {@link os.tempdir | `$TEMP`}.
 *
 * Trying to execute any API with a URL not configured on the scope results in a promise rejection due to denied access.
 *
 * Note that this scope applies to **all** APIs on this module.
 *
 * @module
 */

import { invokeTauriCommand } from './helpers/tauri'

export enum BaseDirectory {
  Audio = 1,
  Cache,
  Config,
  Data,
  LocalData,
  Desktop,
  Document,
  Download,
  Executable,
  Font,
  Home,
  Picture,
  Public,
  Runtime,
  Template,
  Video,
  Resource,
  App,
  Log,
  Temp
}

interface FsOptions {
  dir?: BaseDirectory
  // note that adding fields here needs a change in the writeBinaryFile check
}

interface FsDirOptions {
  dir?: BaseDirectory
  recursive?: boolean
}

/** Options object used to write a UTF-8 string to a file. */
interface FsTextFileOption {
  /** Path to the file to write. */
  path: string
  /** The UTF-8 string to write to the file. */
  contents: string
}

type BinaryFileContents = Iterable<number> | ArrayLike<number> | ArrayBuffer

/** Options object used to write a binary data to a file. */
interface FsBinaryFileOption {
  /** Path to the file to write. */
  path: string
  /** The byte array contents. */
  contents: BinaryFileContents
}

interface FileEntry {
  path: string
  /**
   * Name of the directory/file
   * can be null if the path terminates with `..`
   */
  name?: string
  /** Children of this entry if it's a directory; null otherwise */
  children?: FileEntry[]
}

/**
 * Reads a file as an UTF-8 encoded string.
 * @example
 * ```typescript
 * import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Read the text file in the `$APPDIR/app.conf` path
 * const contents = await readTextFile('app.conf', { dir: BaseDirectory.App });
 * ```
 *
 * @param filePath Path to the file.
 * @param options Configuration object.
 * @returns A promise resolving to the file content as a UTF-8 encoded string.
 */
async function readTextFile(
  filePath: string,
  options: FsOptions = {}
): Promise<string> {
  return invokeTauriCommand<string>({
    __tauriModule: 'Fs',
    message: {
      cmd: 'readTextFile',
      path: filePath,
      options
    }
  })
}

/**
 * Reads a file as byte array.
 * @example
 * ```typescript
 * import { readBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Read the image file in the `$RESOURCEDIR/avatar.png` path
 * const contents = await readBinaryFile('avatar.png', { dir: BaseDirectory.Resource });
 * ```
 *
 * @param filePath Path to the file.
 * @param options Configuration object.
 * @returns A promise resolving to the file bytes array.
 */
async function readBinaryFile(
  filePath: string,
  options: FsOptions = {}
): Promise<Uint8Array> {
  const arr = await invokeTauriCommand<number[]>({
    __tauriModule: 'Fs',
    message: {
      cmd: 'readFile',
      path: filePath,
      options
    }
  })

  return Uint8Array.from(arr)
}

/**
 * Writes a UTF-8 text file.
 * @example
 * ```typescript
 * import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Write a text file to the `$APPDIR/app.conf` path
 * await writeTextFile('app.conf', 'file contents', { dir: BaseDirectory.App });
 * ```
 *
 * @param path The file path.
 * @param contents The file contents.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function writeTextFile(
  path: string,
  contents: string,
  options?: FsOptions
): Promise<void>

/**
 * Writes a UTF-8 text file.
 * @example
 * ```typescript
 * import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Write a text file to the `$APPDIR/app.conf` path
 * await writeTextFile({ path: 'app.conf', contents: 'file contents' }, { dir: BaseDirectory.App });
 * ```
 *
 * @param file The object containing the file path and contents.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function writeTextFile(
  file: FsTextFileOption,
  options?: FsOptions
): Promise<void>

/**
 * Writes a UTF-8 text file.
 *
 * @param path File path or configuration object.
 * @param contents File contents or options.
 * @param options File options.
 * @returns A promise indicating the success or failure of the operation.
 */
async function writeTextFile(
  path: string | FsTextFileOption,
  contents?: string | FsOptions,
  options?: FsOptions
): Promise<void> {
  if (typeof options === 'object') {
    Object.freeze(options)
  }
  if (typeof path === 'object') {
    Object.freeze(path)
  }

  const file: FsTextFileOption = { path: '', contents: '' }
  let fileOptions: FsOptions | undefined = options
  if (typeof path === 'string') {
    file.path = path
  } else {
    file.path = path.path
    file.contents = path.contents
  }

  if (typeof contents === 'string') {
    file.contents = contents ?? ''
  } else {
    fileOptions = contents
  }

  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'writeFile',
      path: file.path,
      contents: Array.from(new TextEncoder().encode(file.contents)),
      options: fileOptions
    }
  })
}

/**
 * Writes a byte array content to a file.
 * @example
 * ```typescript
 * import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Write a binary file to the `$APPDIR/avatar.png` path
 * await writeBinaryFile('avatar.png', new Uint8Array([]), { dir: BaseDirectory.App });
 * ```
 *
 * @param path The file path.
 * @param contents The file contents.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function writeBinaryFile(
  path: string,
  contents: BinaryFileContents,
  options?: FsOptions
): Promise<void>

/**
 * Writes a byte array content to a file.
 * @example
 * ```typescript
 * import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Write a binary file to the `$APPDIR/avatar.png` path
 * await writeBinaryFile({ path: 'avatar.png', contents: new Uint8Array([]) }, { dir: BaseDirectory.App });
 * ```
 *
 * @param file The object containing the file path and contents.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function writeBinaryFile(
  file: FsBinaryFileOption,
  options?: FsOptions
): Promise<void>

/**
 * Writes a byte array content to a file.
 *
 * @param path File path or configuration object.
 * @param contents File contents or options.
 * @param options File options.
 * @returns A promise indicating the success or failure of the operation.
 */
async function writeBinaryFile(
  path: string | FsBinaryFileOption,
  contents?: BinaryFileContents | FsOptions,
  options?: FsOptions
): Promise<void> {
  if (typeof options === 'object') {
    Object.freeze(options)
  }
  if (typeof path === 'object') {
    Object.freeze(path)
  }

  const file: FsBinaryFileOption = { path: '', contents: [] }
  let fileOptions: FsOptions | undefined = options
  if (typeof path === 'string') {
    file.path = path
  } else {
    file.path = path.path
    file.contents = path.contents
  }

  if (contents && 'dir' in contents) {
    fileOptions = contents
  } else if (typeof path === 'string') {
    // @ts-expect-error
    file.contents = contents ?? []
  }

  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'writeFile',
      path: file.path,
      contents: Array.from(
        file.contents instanceof ArrayBuffer
          ? new Uint8Array(file.contents)
          : file.contents
      ),
      options: fileOptions
    }
  })
}

/**
 * List directory files.
 * @example
 * ```typescript
 * import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
 * // Reads the `$APPDIR/users` directory recursively
 * const entries = await readDir('users', { dir: BaseDirectory.App, recursive: true });
 *
 * function processEntries(entries) {
 *   for (const entry of entries) {
 *     console.log(`Entry: ${entry.path}`);
 *     if (entry.children) {
 *       processEntries(entry.children)
 *     }
 *   }
 * }
 * ```
 *
 * @param dir Path to the directory to read.
 * @param options Configuration object.
 * @returns A promise resolving to the directory entries.
 */
async function readDir(
  dir: string,
  options: FsDirOptions = {}
): Promise<FileEntry[]> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'readDir',
      path: dir,
      options
    }
  })
}

/**
 * Creates a directory.
 * If one of the path's parent components doesn't exist
 * and the `recursive` option isn't set to true, the promise will be rejected.
 * @example
 * ```typescript
 * import { createDir, BaseDirectory } from '@tauri-apps/api/fs';
 * // Create the `$APPDIR/users` directory
 * await createDir('users', { dir: BaseDirectory.App, recursive: true });
 * ```
 *
 * @param dir Path to the directory to create.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function createDir(
  dir: string,
  options: FsDirOptions = {}
): Promise<void> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'createDir',
      path: dir,
      options
    }
  })
}

/**
 * Removes a directory.
 * If the directory is not empty and the `recursive` option isn't set to true, the promise will be rejected.
 * @example
 * ```typescript
 * import { removeDir, BaseDirectory } from '@tauri-apps/api/fs';
 * // Remove the directory `$APPDIR/users`
 * await removeDir('users', { dir: BaseDirectory.App });
 * ```
 *
 * @param dir Path to the directory to remove.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function removeDir(
  dir: string,
  options: FsDirOptions = {}
): Promise<void> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'removeDir',
      path: dir,
      options
    }
  })
}

/**
 * Copys a file to a destination.
 * @example
 * ```typescript
 * import { copyFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Copy the `$APPDIR/app.conf` file to `$APPDIR/app.conf.bk`
 * await copyFile('app.conf', 'app.conf.bk', { dir: BaseDirectory.App });
 * ```
 *
 * @param source A path of the file to copy.
 * @param destination A path for the destination file.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function copyFile(
  source: string,
  destination: string,
  options: FsOptions = {}
): Promise<void> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'copyFile',
      source,
      destination,
      options
    }
  })
}

/**
 * Removes a file.
 * @example
 * ```typescript
 * import { removeFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Remove the `$APPDIR/app.conf` file
 * await removeFile('app.conf', { dir: BaseDirectory.App });
 * ```
 *
 * @param file Path to the file to remove.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function removeFile(
  file: string,
  options: FsOptions = {}
): Promise<void> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'removeFile',
      path: file,
      options: options
    }
  })
}

/**
 * Renames a file.
 * @example
 * ```typescript
 * import { renameFile, BaseDirectory } from '@tauri-apps/api/fs';
 * // Rename the `$APPDIR/avatar.png` file
 * await renameFile('avatar.png', 'deleted.png', { dir: BaseDirectory.App });
 * ```
 *
 * @param oldPath A path of the file to rename.
 * @param newPath A path of the new file name.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function renameFile(
  oldPath: string,
  newPath: string,
  options: FsOptions = {}
): Promise<void> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'renameFile',
      oldPath,
      newPath,
      options
    }
  })
}

/**
 * Check if a path exists.
 * @example
 * ```typescript
 * import { exists, BaseDirectory } from '@tauri-apps/api/fs';
 * // Check if the `$APPDIR/avatar.png` file exists
 * await exists('avatar.png', { dir: BaseDirectory.App });
 * ```
 *
 * @param path A path of the file or directory to check.
 * @param options Configuration object.
 * @returns A promise indicating the success or failure of the operation.
 */
async function exists(path: string, options: FsOptions = {}): Promise<void> {
  return invokeTauriCommand({
    __tauriModule: 'Fs',
    message: {
      cmd: 'exists',
      path,
      options
    }
  })
}

export type {
  FsOptions,
  FsDirOptions,
  FsTextFileOption,
  BinaryFileContents,
  FsBinaryFileOption,
  FileEntry
}

export {
  BaseDirectory as Dir,
  readTextFile,
  readBinaryFile,
  writeTextFile,
  writeTextFile as writeFile,
  writeBinaryFile,
  readDir,
  createDir,
  removeDir,
  copyFile,
  removeFile,
  renameFile,
  exists
}
