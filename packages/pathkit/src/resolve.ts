/**
 * 将路径或路径片段序列解析为绝对路径。
 *
 * @param {...string} paths - 要解析的路径片段
 * @returns 解析后的绝对路径
 *
 * @example
 * resolve('/foo/bar', './baz')          // 返回: '/foo/bar/baz'
 * resolve('/foo/bar', '../baz')         // 返回: '/foo/baz'
 * resolve('wwwroot', 'static/file/')    // 返回: '/absolute/path/wwwroot/static/file'
 * resolve('C:\\temp\\', 'foo', 'bar')   // 返回: 'C:/temp/foo/bar'
 */
const resolve = (...paths: string[]): string => {
  if (paths.length === 0) {
    return process.cwd()
  }

  let resolvedPath = ''
  let isAbsolute = false

  for (let i = paths.length - 1; i >= -1; i--) {
    let path = i < 0 ? process.cwd() : paths[i]

    // 处理空路径
    if (!path) {
      continue
    }

    // 规范化路径分隔符
    path = path.replace(/\\/g, '/')

    // 合并路径
    resolvedPath = resolvedPath ? `${path}/${resolvedPath}` : path

    // 检查是否为绝对路径
    isAbsolute = path.startsWith('/')

    // 如果是 Windows 风格的绝对路径
    if (/^[A-Za-z]:/.test(path)) {
      isAbsolute = true
      resolvedPath = resolvedPath.replace(/^[A-Za-z]:/, (match) => `${match}/`)
    }

    if (isAbsolute) {
      break
    }
  }

  // 规范化路径
  resolvedPath = resolvedPath
    // 将多个斜杠替换为单个斜杠
    .replace(/\/+/g, '/')
    // 处理 ./
    .replace(/\/\.\//g, '/')
    // 处理 ../
    .replace(/\/[^/]+\/\.\./g, '')
    // 移除末尾的斜杠
    .replace(/\/$/, '')

  // 确保绝对路径以斜杠开头
  return isAbsolute ? resolvedPath : `/${resolvedPath}`
}

export default resolve
