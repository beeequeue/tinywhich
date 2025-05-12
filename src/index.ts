import { existsSync } from "node:fs"
import { delimiter, join } from "node:path"

const isWin = process.platform === "win32"

const getPathDirs = () => {
  const pathString = isWin ? (process.env.Path ?? process.env.PATH) : process.env.PATH
  const pathDirs = pathString?.split(delimiter) ?? []

  return pathDirs
}

const uniq = <T>(array: T[]): T[] => [...new Set(array)]

const windowsExts = isWin
  ? uniq(
      [".EXE", ".CMD", ".BAT", ...(process.env.PATHEXT?.split(delimiter) ?? [])]
        .filter((ext) => ext[0] === ".")
        .map((ext) => ext.toLowerCase()),
    )
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
  // If on windows also check if the file exists with PATHEXT extensions
  if (isWin && windowsExecutableExists(filePath)) {
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
