/**
 * 将 file:// URL 转换为路径。
 *
 * @param url - 要转换的 file:// URL
 * @returns 路径字符串
 *
 * @example
 * fromFileUrl('file:///foo/bar')              // 返回: '/foo/bar'
 * fromFileUrl('file:///C:/temp/foo.txt')      // 返回: 'C:/temp/foo.txt'
 * fromFileUrl('file://host/share/file.txt')   // 返回: '//host/share/file.txt'
 */
const fromFileUrl = (url: string): string => {
  if (typeof url !== 'string') {
    throw new TypeError('URL must be a string')
  }

  // 验证 URL 格式
  if (!url.startsWith('file://')) {
    throw new Error('URL must be a file URL')
  }

  // 移除 'file://' 前缀
  let path = url.slice(7)

  // 处理空路径
  if (!path) {
    return '/'
  }

  // 检查是否有无效的 URL 编码格式
  if (/%[0-9A-Fa-f][a-z]/.test(path)) {
    throw new Error('Invalid URL encoding')
  }

  // 解码 URL 编码的字符
  try {
    path = decodeURIComponent(path)
  } catch (e) {
    throw new Error('Invalid URL encoding')
  }

  // 处理 Windows 驱动器路径
  if (/^\/[A-Za-z]:/.test(path)) {
    return path.slice(1)
  }

  // 检查是否是 UNC 路径 (file://host/share/file.txt)
  // 如果 path 不以 / 开头，说明是 UNC 路径
  let isUNCPath = false
  if (!path.startsWith('/')) {
    // 这是 UNC 路径，需要添加双斜杠前缀
    path = `//${path}`
    isUNCPath = true
  }

  // 规范化多个斜杠，但保留 UNC 路径的双斜杠
  if (isUNCPath) {
    path = `//${path.slice(2).replace(/\/+/g, '/')}`
  } else {
    path = path.replace(/\/+/g, '/')
  }

  // 移除末尾的斜杠（除非是根路径）
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1)
  }

  return path
}

export default fromFileUrl
