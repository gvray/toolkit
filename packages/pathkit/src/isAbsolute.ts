/**
 * Determine whether the given path string is an absolute path.
 *
 * @since 1.0.0
 *
 * @param path - The path string to be determined.
 * @returns True if it's an absolute path, false otherwise.
 *
 * @example
 * isAbsolute('/')      // true
 * isAbsolute('/path')  // true
 * isAbsolute('C:\\path')  // true
 * isAbsolute('\\path')  // true
 * isAbsolute('https://example.com')   // true
 * isAbsolute('ftp://example.com')     // true
 * isAbsolute('relative/path')  // false
 */
function isAbsolute(path: string): boolean {
  // 不把 URL 当作文件系统的绝对路径
  if (/^[a-z0-9]+:\/\//i.test(path)) {
    return false
  }

  return (
    path.startsWith('/') || // Unix/Linux root directory absolute path
    path.match(/^[a-zA-Z]:(\\|\/)/) !== null || // Windows drive letter absolute path
    path.startsWith('\\\\') // UNC path
  )
}
export default isAbsolute
