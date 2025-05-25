/**
 * 根据当前工作目录，计算从 from 到 to 的相对路径。
 *
 * @param from - 源路径
 * @param to - 目标路径
 * @returns 相对路径
 *
 * @example
 * relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')   // 返回: '../../impl/bbb'
 * relative('/foo/bar/baz', '/foo/bar/baz')                       // 返回: ''
 * relative('/foo/bar/baz', '/foo/bar/baz/')                      // 返回: ''
 * relative('/foo/bar/baz', '/foo/bar/baz/file.txt')             // 返回: 'file.txt'
 */
const relative = (from: string, to: string): string => {
  if (typeof from !== 'string' || typeof to !== 'string') {
    throw new TypeError('Arguments must be strings')
  }

  // 规范化路径分隔符
  from = from.replace(/\\/g, '/')
  to = to.replace(/\\/g, '/')

  // 移除末尾的斜杠
  from = from.replace(/\/*$/, '')
  to = to.replace(/\/*$/, '')

  // 如果路径相同，返回空字符串
  if (from === to) {
    return ''
  }

  // 分割路径为片段
  const fromParts = from.split('/').filter(Boolean)
  const toParts = to.split('/').filter(Boolean)

  // 找到共同的前缀长度
  let commonLength = 0
  const minLength = Math.min(fromParts.length, toParts.length)

  while (commonLength < minLength && fromParts[commonLength] === toParts[commonLength]) {
    commonLength++
  }

  // 构建相对路径
  const upCount = fromParts.length - commonLength
  const relativeParts = []

  // 添加向上的路径部分
  for (let i = 0; i < upCount; i++) {
    relativeParts.push('..')
  }

  // 添加向下的路径部分
  relativeParts.push(...toParts.slice(commonLength))

  // 返回相对路径
  return relativeParts.join('/')
}

export default relative
