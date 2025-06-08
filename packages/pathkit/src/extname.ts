/**
 * 获取路径中的扩展名部分。
 *
 * @param path - 要处理的路径
 * @returns 路径的扩展名（包含点号）
 *
 * @example
 * extname('index.html')          // 返回: '.html'
 * extname('index.coffee.md')     // 返回: '.md'
 * extname('index.')              // 返回: '.'
 * extname('index')               // 返回: ''
 * extname('.index')              // 返回: ''
 * extname('.index.md')           // 返回: '.md'
 */
const extname = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  // 处理空路径
  if (!path) {
    return ''
  }

  // 规范化路径分隔符
  path = path.replace(/\\/g, '/')

  // 获取最后一个斜杠后的部分
  const basename = path.split('/').pop() || ''

  // 特殊处理 '.' 和 '..'
  if (basename === '.' || basename === '..') {
    return ''
  }

  // 如果文件名以点开头且没有其他扩展名，返回空字符串
  if (basename.startsWith('.') && basename.indexOf('.', 1) === -1) {
    return ''
  }

  // 获取最后一个点号的位置
  const lastDotIndex = basename.lastIndexOf('.')

  // 如果没有点号或点号在开头，返回空字符串
  if (lastDotIndex <= 0) {
    return ''
  }

  // 返回从最后一个点号到结尾的部分
  return basename.slice(lastDotIndex)
}

export default extname
