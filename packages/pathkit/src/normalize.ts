import isAbsolute from './isAbsolute'

/**
 * Normalize a file system path by removing any unnecessary "." and ".." segments
 * and resolving any directory separators to match the host operating system.
 * @param {string} path The file system path to be normalized.
 * @returns {string} The normalized path.
 *
 * @example
 *
 * ```ts
 * const path = '/users/john/../jane/./documents/';
 * const normalizedPath = normalize(path); // "/users/jane/documents/"
 * ```
 * @since 1.0.0
 */
const normalize = (path: string): string => {
  if (!path) {
    return '.'
  }

  // 检查是否为 UNC 路径 (需要确保是真正的 UNC 格式，如 \\server\share 或 //server/share)
  // UNC 路径应该是 //server/share 的格式，而不是简单的多个斜杠
  const isUNC =
    (path.startsWith('\\\\') && path.match(/^\\\\[^\\]+\\[^\\]+/)) ||
    (path.startsWith('//') && path.match(/^\/\/[^/]+\/[^/]+/))

  // 检查是否为 Windows 绝对路径
  const windowsMatch = path.match(/^[A-Za-z]:/)
  const isWindowsAbsolute = !!windowsMatch

  // 检查是否为 Unix 绝对路径
  const isUnixAbsolute = path.startsWith('/') && !isUNC

  const isAbsolutePath = isUNC || isWindowsAbsolute || isUnixAbsolute

  // 规范化路径分隔符
  let normalizedPath = path.replace(/\\/g, '/')

  // 将多个连续斜杠替换为单个斜杠，但保留 UNC 路径的双斜杠
  if (isUNC) {
    normalizedPath = `//${normalizedPath.substring(2).replace(/\/+/g, '/')}`
  } else {
    // 对于 //foo/bar 这种情况，如果不是 UNC，应该变成 /foo/bar
    normalizedPath = normalizedPath.replace(/\/+/g, '/')
  }

  // 分割路径段
  let segments = normalizedPath.split('/').filter((segment) => segment !== '')

  // 对于 Windows 路径，需要特殊处理盘符
  let drivePrefix = ''
  if (isWindowsAbsolute && segments.length > 0) {
    const firstSegment = segments[0]
    if (firstSegment.match(/^[A-Za-z]:$/)) {
      drivePrefix = firstSegment
      segments = segments.slice(1)
    }
  }

  const normalizedSegments: string[] = []

  for (const segment of segments) {
    if (segment === '.') {
      // 忽略当前目录
      continue
    } else if (segment === '..') {
      // 处理上级目录
      if (normalizedSegments.length > 0 && normalizedSegments[normalizedSegments.length - 1] !== '..') {
        normalizedSegments.pop()
      } else if (!isAbsolutePath) {
        normalizedSegments.push('..')
      }
    } else {
      normalizedSegments.push(segment)
    }
  }

  let result = normalizedSegments.join('/')

  // 处理绝对路径
  if (isUNC) {
    result = `//${result}`
  } else if (isWindowsAbsolute) {
    result = `${drivePrefix}/${result}`
  } else if (isUnixAbsolute) {
    result = `/${result}`
  }

  // 处理空结果
  if (!result || result === '/' || result === '//') {
    if (isAbsolutePath) {
      return isUNC ? '//' : '/'
    } else {
      return '.'
    }
  }

  return result
}

export default normalize
