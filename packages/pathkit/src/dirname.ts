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

  // 检查是否是 UNC 路径
  const isUNC = path.startsWith('\\\\')

  // 规范化路径分隔符
  path = path.replace(/\\/g, '/')

  // 规范化多个连续斜杠，但保留 UNC 路径的双斜杠
  if (isUNC) {
    path = `//${path.slice(2).replace(/\/+/g, '/')}`
  } else {
    path = path.replace(/\/+/g, '/')
  }

  // 移除末尾的斜杠
  path = path.replace(/\/+$/, '')

  // 如果路径为空或只有一个字符，返回适当的值
  if (!path) return '/'
  if (path === '/') return '/'
  if (!/\//.test(path)) return '.'

  // 获取最后一个斜杠之前的部分
  const parts = path.split('/')
  parts.pop()

  let result = parts.join('/')

  // 规范化结果中的 ./ 部分
  if (result.endsWith('/.')) {
    result = result.slice(0, -2)
  }

  // 处理根路径的特殊情况
  return !result || result === '' ? '/' : result
}

export default dirname
