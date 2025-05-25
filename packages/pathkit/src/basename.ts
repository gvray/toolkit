/**
 * 获取路径中的文件名部分。
 *
 * @param path - 要处理的路径
 * @param ext - 可选的扩展名，如果指定则会从结果中移除
 * @returns 路径的最后一部分（文件名）
 *
 * @example
 * basename('/foo/bar/baz.html')         // 返回: 'baz.html'
 * basename('/foo/bar/baz.html', '.html') // 返回: 'baz'
 * basename('/foo/bar/baz')              // 返回: 'baz'
 * basename('/foo/bar/')                 // 返回: 'bar'
 */
const basename = (path: string, ext?: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  // 处理空路径
  if (!path) {
    return ''
  }

  // 移除开头和结尾的斜杠
  path = path.replace(/^\/+|\/+$/g, '')

  // 如果路径为空，返回 '/'
  if (!path) {
    return '/'
  }

  // 获取最后一个斜杠后的部分
  const parts = path.split(/[/\\]/)
  let base = parts[parts.length - 1]

  // 如果指定了扩展名，移除它
  if (ext && base.endsWith(ext)) {
    base = base.slice(0, -ext.length)
  }

  return base
}

export default basename
