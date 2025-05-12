import { existsSync } from "node:fs"
import { delimiter, join } from "node:path"

const getPathDirs = () => {
  const pathString =
    process.platform === "win32"
      ? (process.env.Path ?? process.env.PATH)
      : process.env.PATH
  const pathDirs = pathString?.split(delimiter) ?? []

  return pathDirs
}

const windowsExts =
  process.platform === "win32"
    ? (process.env.PATHEXT?.split(delimiter)?.map((ext) => ext.toLowerCase()) ?? [".exe"])
    : []
/** Checks if a file exists with any of the path extensions in PATHEXT */
const windowsExecutableExists = (filePath: string) => {
  for (const ext of windowsExts) {
    if (existsSync(`${filePath}${ext}`)) {
      return true
    }
  }

  return false
}

const executableExists = (filePath: string) => {
  if (
    // If on windows
    process.platform === "win32" &&
    // also check if the file exists with PATHEXT extensions
    windowsExecutableExists(filePath)
  ) {
    return true
  }

  return existsSync(filePath)
}

/**
 * Tries to locate an executable in directories in the `PATH` environment variable.
 * Returns an absolute path or `null` if no file was found.
 *
 * Considers `PATHEXT` on Windows.
 */
export const which = (name: string): string | null => {
  for (const dir of getPathDirs()) {
    const fullPath = join(dir, name)
    if (!executableExists(fullPath)) continue

    return fullPath
  }

  return null
}
