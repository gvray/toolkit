import dirname from './dirname'
import basename from './basename'
import extname from './extname'

export interface ParsedPath {
  /**
   * 根路径，例如 '/' 或 'C:\'
   */
  root: string
  /**
   * 目录路径，不包含根路径
   */
  dir: string
  /**
   * 完整的文件名
   */
  base: string
  /**
   * 不带扩展名的文件名
   */
  name: string
  /**
   * 扩展名（包含点号）
   */
  ext: string
}

/**
 * 解析路径为对象。
 *
 * @param path - 要解析的路径
 * @returns 包含路径各个部分的对象
 *
 * @example
 * parse('/home/user/dir/file.txt')
 * // 返回:
 * // {
 * //   root: '/',
 * //   dir: '/home/user/dir',
 * //   base: 'file.txt',
 * //   name: 'file',
 * //   ext: '.txt'
 * // }
 */
const parse = (path: string): ParsedPath => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  // 处理空路径
  if (!path) {
    return {
      root: '',
      dir: '',
      base: '',
      name: '',
      ext: ''
    }
  }

  // 检查是否是 UNC 路径
  const isUNC = path.startsWith('\\\\')
  const originalPath = path

  // 规范化路径分隔符
  path = path.replace(/\\/g, '/')

  // 获取根路径
  let root = ''
  if (isUNC || path.startsWith('//')) {
    // UNC 路径
    root = '//'
  } else if (path.startsWith('/')) {
    // Unix 绝对路径
    root = '/'
  } else if (/^[A-Za-z]:/.test(path)) {
    // Windows 绝对路径
    root = `${path.slice(0, 2)}/`
  }

  // 获取目录、基础名和扩展名，使用原始路径以保持 UNC 格式
  const dir = dirname(originalPath)
  let base = basename(path)
  let ext = extname(path)

  // 特殊处理根路径
  if (path === '/' || path === '\\') {
    base = ''
    ext = ''
  }

  const name = base.slice(0, base.length - ext.length)

  return {
    root,
    dir,
    base,
    name,
    ext
  }
}

export default parse
