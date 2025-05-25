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

  // 处理 UNC 路径
  if (path.startsWith('//')) {
    return path
  }

  // 处理普通路径
  // 如果路径不以斜杠开头，添加斜杠
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  // 规范化多个斜杠
  path = path.replace(/\/+/g, '/')

  return path
}

export default fromFileUrl
