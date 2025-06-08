import normalize from './normalize'

/**
 * 检查路径是否在指定目录内。
 *
 * @param directory - 基准目录
 * @param path - 要检查的路径
 * @returns 如果路径在目录内则返回 true，否则返回 false
 *
 * @example
 * isWithin('/foo/bar', '/foo/bar/baz')     // 返回: true
 * isWithin('/foo/bar', '/foo/bar')         // 返回: true
 * isWithin('/foo/bar', '/foo/baz')         // 返回: false
 * isWithin('/foo/bar', '/foo/bar/../baz')  // 返回: false
 */
const isWithin = (directory: string, path: string): boolean => {
  if (typeof directory !== 'string' || typeof path !== 'string') {
    throw new TypeError('Arguments must be strings')
  }

  // 规范化路径
  directory = normalize(directory)
  path = normalize(path)

  // 处理空目录的情况（表示根目录）
  if (directory === '' || directory === '.') {
    return true
  }

  // 如果路径完全相同，也算是包含关系
  if (directory === path) {
    return true
  }

  // 确保目录以斜杠结尾
  if (!directory.endsWith('/')) {
    directory += '/'
  }

  // 检查路径是否以目录开头
  return path.startsWith(directory)
}

export default isWithin
