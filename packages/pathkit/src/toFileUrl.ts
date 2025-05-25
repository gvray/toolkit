import normalize from './normalize'

/**
 * 将路径转换为 file:// URL。
 *
 * @param path - 要转换的路径
 * @returns file:// URL 字符串
 *
 * @example
 * toFileUrl('/foo/bar')              // 返回: 'file:///foo/bar'
 * toFileUrl('C:\\temp\\foo.txt')     // 返回: 'file:///C:/temp/foo.txt'
 * toFileUrl('//host/share/file.txt') // 返回: 'file://host/share/file.txt'
 */
const toFileUrl = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  // 规范化路径
  let normalizedPath = normalize(path)

  // 处理 Windows 驱动器路径
  if (/^[A-Za-z]:/.test(normalizedPath)) {
    normalizedPath = `/${normalizedPath}`
  }

  // 处理 UNC 路径
  if (normalizedPath.startsWith('//')) {
    return `file:${normalizedPath}`
  }

  // 处理普通路径
  // 确保路径以斜杠开头
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`
  }

  // 编码特殊字符
  const encodedPath = normalizedPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `file://${encodedPath}`
}

export default toFileUrl
