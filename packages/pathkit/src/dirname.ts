/**
 * 获取路径中的目录部分。
 *
 * @param path - 要处理的路径
 * @returns 路径的目录部分
 *
 * @example
 * dirname('/foo/bar/baz.html') // 返回: '/foo/bar'
 * dirname('/foo/bar/baz')      // 返回: '/foo/bar'
 * dirname('/foo/bar/')         // 返回: '/foo'
 * dirname('/foo')              // 返回: '/'
 * dirname('foo')               // 返回: '.'
 */
const dirname = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  if (!path) {
    return '.'
  }

  // 规范化路径分隔符
  path = path.replace(/\\/g, '/')

  // 移除末尾的斜杠
  path = path.replace(/\/+$/, '')

  // 如果路径为空或只有一个字符，返回适当的值
  if (!path) return '/'
  if (path === '/') return '/'
  if (!/\//.test(path)) return '.'

  // 获取最后一个斜杠之前的部分
  const parts = path.split('/')
  parts.pop()

  // 处理根路径的特殊情况
  return parts.length === 1 && !parts[0] ? '/' : parts.join('/')
}

export default dirname
