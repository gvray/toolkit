/**
 * 将路径转换为 POSIX 格式。
 *
 * @param path - 要转换的路径
 * @returns POSIX 格式的路径
 *
 * @example
 * toPosix('C:\\temp\\foo\\bar')     // 返回: '/c/temp/foo/bar'
 * toPosix('\\\\server\\share\\foo') // 返回: '//server/share/foo'
 * toPosix('foo\\bar\\baz')         // 返回: 'foo/bar/baz'
 */
const toPosix = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  // 处理空路径
  if (!path) {
    return '.'
  }

  // 处理 Windows 驱动器路径
  if (/^[A-Za-z]:/.test(path)) {
    // 移除驱动器号，转换为小写并添加前导斜杠
    path = `/${path.charAt(0).toLowerCase()}${path.slice(2)}`
  }

  // 将反斜杠转换为正斜杠
  path = path.replace(/\\/g, '/')

  // 检查是否是 UNC 路径（两个或更多前导斜杠都应该被视为 UNC）
  const isUNC = path.startsWith('//')

  if (isUNC) {
    // 保持 UNC 路径的双斜杠，但规范化其余部分
    // 先移除所有前导斜杠，然后添加标准的双斜杠
    const withoutLeadingSlashes = path.replace(/^\/+/, '')
    path = `//${withoutLeadingSlashes.replace(/\/+/g, '/')}`
  } else {
    // 规范化多个斜杠
    path = path.replace(/\/+/g, '/')
  }

  // 移除末尾的斜杠（除非是根路径）
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1)
  }

  return path
}

export default toPosix
