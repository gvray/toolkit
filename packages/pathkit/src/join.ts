/**
 * Combines an array of path segments into a single path string, with forward slashes (/) as separators.
 *
 * @since 1.0.0
 *
 * @param paths - An array of path segments to join.
 * @returns A combined path string.
 *
 * @example
 * const path = join('foo', 'bar', 'baz'); // path == 'foo/bar/baz'
 * const path2 = join('foo/', '/bar/', '/baz/'); // path2 == 'foo/bar/baz'
 */
const join = (...paths: string[]): string => {
  // 如果没有参数，返回 '.'
  if (paths.length === 0) {
    return '.'
  }

  // 过滤空字符串
  const validPaths = paths.filter((path) => path && path.length > 0)

  if (validPaths.length === 0) {
    return ''
  }

  // 规范化路径分隔符，统一为 /，但保留 UNC 路径的双斜杠
  const normalizedPaths = validPaths.map((path, index) => {
    const normalized = path.replace(/\\/g, '/')
    // 对于第一个路径，如果是 UNC 路径，保留双斜杠
    if (index === 0 && (path.startsWith('\\\\') || path.startsWith('//'))) {
      return normalized.replace(/^\/+/, '//')
    }
    return normalized.replace(/\/+/g, '/')
  })

  // 检查第一个路径是否以 / 开头（绝对路径）
  const isAbsolute = normalizedPaths[0].startsWith('/')

  // 检查是否是 UNC 路径 (\\server\share)
  const originalFirst = paths[0] || ''
  const isUNC = originalFirst.startsWith('\\\\') || normalizedPaths[0].startsWith('//')

  // 合并所有路径段
  const segments: string[] = []

  normalizedPaths.forEach((path, index) => {
    if (index === 0 && isUNC) {
      // UNC 路径的第一部分，保留 // 前缀
      const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '')
      if (cleanPath) {
        segments.push(`//${cleanPath}`)
      }
    } else {
      // 普通路径段，移除前后斜杠
      const cleanPath = path.replace(/^\/+|\/+$/g, '')
      if (cleanPath) {
        segments.push(cleanPath)
      }
    }
  })

  let result = segments.join('/')

  // 处理绝对路径（非 UNC）
  if (isAbsolute && !isUNC) {
    result = `/${result}`
  }

  // 如果结果为空，返回当前目录
  if (!result) {
    return isAbsolute ? '/' : '.'
  }

  return result
}

export default join
