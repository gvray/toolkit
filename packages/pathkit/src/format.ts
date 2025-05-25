import { ParsedPath } from './parse'

/**
 * 从路径对象返回路径字符串。
 *
 * @param pathObject - 路径对象
 * @returns 格式化后的路径字符串
 *
 * @example
 * format({
 *   root: '/',
 *   dir: '/home/user',
 *   base: 'file.txt',
 *   name: 'file',
 *   ext: '.txt'
 * }) // 返回: '/home/user/file.txt'
 */
const format = (pathObject: Partial<ParsedPath>): string => {
  if (!pathObject || typeof pathObject !== 'object') {
    throw new TypeError('The "pathObject" argument must be of type Object')
  }

  const { root = '', dir = '', base = '', name = '', ext = '' } = pathObject

  // 如果提供了 dir，使用它
  if (dir) {
    // 如果 base 也提供了，组合它们
    if (base) {
      return dir.endsWith('/') ? dir + base : `${dir}/${base}`
    }
    return dir
  }

  // 如果提供了 root，使用它
  if (root) {
    // 如果 base 也提供了，组合它们
    if (base) {
      return root.endsWith('/') ? root + base : `${root}/${base}`
    }
    return root
  }

  // 如果提供了 name 和 ext，组合它们
  if (name && ext) {
    return name + ext
  }

  // 如果只提供了 base，使用它
  if (base) {
    return base
  }

  // 如果什么都没提供，返回 '.'
  return '.'
}

export default format
