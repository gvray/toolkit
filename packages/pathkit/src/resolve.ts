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
  // 验证输入参数
  for (const path of paths) {
    if (typeof path !== 'string') {
      throw new TypeError('Path must be a string')
    }
  }

  if (paths.length === 0) {
    return process.cwd()
  }

  let resolvedPath = ''
  let isAbsolute = false
  let windowsDrive = ''

  for (let i = paths.length - 1; i >= -1; i--) {
    let path = i < 0 ? process.cwd() : paths[i]

    // 处理空路径或 null/undefined
    if (!path || typeof path !== 'string') {
      continue
    }

    // 检查是否为 Windows 风格的路径并提取盘符
    const windowsMatch = path.match(/^[A-Za-z]:/)
    if (windowsMatch) {
      windowsDrive = windowsMatch[0]
      isAbsolute = true
      // 移除盘符，稍后添加
      path = path.substring(2)
    }

    // 规范化路径分隔符
    path = path.replace(/\\/g, '/')

    // 合并路径
    resolvedPath = resolvedPath ? `${path}/${resolvedPath}` : path

    // 检查是否为绝对路径
    if (!isAbsolute) {
      isAbsolute = path.startsWith('/')
    }

    if (isAbsolute) {
      break
    }
  }

  // 规范化路径 - 使用更准确的方法处理 .. 和 .
  const segments = resolvedPath.split('/').filter((segment) => segment !== '')
  const normalizedSegments: string[] = []

  for (const segment of segments) {
    if (segment === '.') {
      // 忽略当前目录
      continue
    } else if (segment === '..') {
      // 返回上级目录
      if (normalizedSegments.length > 0 && normalizedSegments[normalizedSegments.length - 1] !== '..') {
        normalizedSegments.pop()
      } else if (!isAbsolute) {
        normalizedSegments.push('..')
      }
    } else {
      normalizedSegments.push(segment)
    }
  }

  let result = normalizedSegments.join('/')

  // 处理绝对路径
  if (isAbsolute) {
    // 检查是否是 Windows 风格的路径
    if (windowsDrive) {
      result = `${windowsDrive}/${result}`
    } else {
      result = `/${result}`
    }
  }

  // 处理空结果
  if (!result) {
    return isAbsolute ? '/' : '.'
  }

  return result
}

export default resolve
