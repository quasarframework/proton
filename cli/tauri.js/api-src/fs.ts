import { promisified } from './tauri'
import { BaseDirectory, FsOptions, FsTextFileOption, FsBinaryFileOption, FileEntry } from './types/fs'

/**
 * reads a file as text
 *
 * @param filePath path to the file
 * @param [options] configuration object
 * @param [options.dir] base directory
 * @return
 */
async function readTextFile(filePath: string, options: FsOptions = {}): Promise<string> {
  return await promisified({
    cmd: 'readTextFile',
    path: filePath,
    options
  })
}

/**
 * reads a file as binary
 *
 * @param filePath path to the file
 * @param {Object} [options] configuration object
 * @param {BaseDirectory} [options.dir] base directory
 * @return {Promise<int[]>}
 */
async function readBinaryFile(filePath: string, options: FsOptions = {}): Promise<string> {
  return await promisified({
    cmd: 'readBinaryFile',
    path: filePath,
    options
  })
}

/**
 * writes a text file
 *
 * @param file
 * @param file.path path of the file
 * @param file.contents contents of the file
 * @param [options] configuration object
 * @param [options.dir] base directory
 * @return
 */
async function writeFile(file: FsTextFileOption, options: FsOptions = {}): Promise<void> {
  if (typeof options === 'object') {
    Object.freeze(options)
  }
  if (typeof file === 'object') {
    Object.freeze(file)
  }

  return await promisified({
    cmd: 'writeFile',
    file: file.path,
    contents: file.contents,
    options
  })
}

const CHUNK_SIZE = 65536

/**
 * convert an Uint8Array to ascii string
 *
 * @param arr
 * @return ASCII string
 */
function uint8ArrayToString(arr: Uint8Array): string {
  if (arr.length < CHUNK_SIZE) {
    return String.fromCharCode.apply(null, Array.from(arr))
  }

  let result = ''
  const arrLen = arr.length
  for (let i = 0; i < arrLen; i++) {
    const chunk = arr.subarray(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
    result += String.fromCharCode.apply(null, Array.from(chunk))
  }
  return result
}

/**
 * convert an ArrayBuffer to base64 encoded string
 *
 * @param buffer
 * @return base64 encoded string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const str = uint8ArrayToString(new Uint8Array(buffer))
  return btoa(str)
}

/**
 * writes a binary file
 *
 * @param file
 * @param file.path path of the file
 * @param file.contents contents of the file
 * @param [options] configuration object
 * @param [options.dir] base directory
 * @return
 */
async function writeBinaryFile(file: FsBinaryFileOption, options: FsOptions = {}): Promise<void> {
  if (typeof options === 'object') {
    Object.freeze(options)
  }
  if (typeof file === 'object') {
    Object.freeze(file)
  }

  return await promisified({
    cmd: 'writeFile',
    file: file.path,
    contents: arrayBufferToBase64(file.contents),
    options
  })
}

/**
 * list directory files
 *
 * @param dir path to the directory to read
 * @param [options] configuration object
 * @param [options.recursive] whether to list dirs recursively or not
 * @param [options.dir] base directory
 * @return
 */
async function readDir(dir: string, options: FsOptions = {}): Promise<FileEntry[]> {
  return await promisified({
    cmd: 'readDir',
    path: dir,
    options
  })
}

/**
 * Creates a directory
 * If one of the path's parent components doesn't exist
 * and the `recursive` option isn't set to true, it will be rejected
 *
 * @param dir path to the directory to create
 * @param [options] configuration object
 * @param [options.recursive] whether to create the directory's parent components or not
 * @param [options.dir] base directory
 * @return
 */
async function createDir(dir: string, options: FsOptions = {}): Promise<void> {
  return await promisified({
    cmd: 'createDir',
    path: dir,
    options
  })
}

/**
 * Removes a directory
 * If the directory is not empty and the `recursive` option isn't set to true, it will be rejected
 *
 * @param dir path to the directory to remove
 * @param [options] configuration object
 * @param [options.recursive] whether to remove all of the directory's content or not
 * @param [options.dir] base directory
 * @return
 */
async function removeDir(dir: string, options: FsOptions = {}): Promise<void> {
  return await promisified({
    cmd: 'removeDir',
    path: dir,
    options
  })
}

/**
 * Copy file
 *
 * @param source
 * @param destination
 * @param [options] configuration object
 * @param [options.dir] base directory
 * @return
 */
async function copyFile(source: string, destination: string, options: FsOptions = {}): Promise<void> {
  return await promisified({
    cmd: 'copyFile',
    source,
    destination,
    options
  })
}

/**
 * Removes a file
 *
 * @param file path to the file to remove
 * @param [options] configuration object
 * @param [options.dir] base directory
 * @return
 */
async function removeFile(file: string, options: FsOptions = {}): Promise<void> {
  return await promisified({
    cmd: 'removeFile',
    path: file,
    options: options
  })
}

/**
 * Renames a file
 *
 * @param oldPath
 * @param newPath
 * @param [options] configuration object
 * @param [options.dir] base directory
 * @return
 */
async function renameFile(oldPath: string, newPath: string, options: FsOptions = {}): Promise<void> {
  return await promisified({
    cmd: 'renameFile',
    oldPath,
    newPath,
    options
  })
}

export {
  BaseDirectory as Dir,
  readTextFile,
  readBinaryFile,
  writeFile,
  writeBinaryFile,
  readDir,
  createDir,
  removeDir,
  copyFile,
  removeFile,
  renameFile
}
