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

  // 处理空路径
  if (!from) {
    return to
  }
  if (!to) {
    // 计算从 from 到根目录的相对路径
    const fromParts = from.replace(/\\/g, '/').split('/').filter(Boolean)
    return fromParts.map(() => '..').join('/')
  }

  // 规范化路径分隔符
  from = from.replace(/\\/g, '/')
  to = to.replace(/\\/g, '/')

  // 检查是否是不同的驱动器路径 (Windows)
  const fromDrive = from.match(/^([A-Za-z]:)/)
  const toDrive = to.match(/^([A-Za-z]:)/)

  if (fromDrive && toDrive && fromDrive[1].toLowerCase() !== toDrive[1].toLowerCase()) {
    // 不同驱动器，返回绝对路径
    return to
  }

  // 检查是否是不同根的路径 (Unix 和 Windows 混合)
  const fromIsAbsolute = from.startsWith('/')
  const toIsAbsolute = to.startsWith('/')

  if (fromIsAbsolute !== toIsAbsolute) {
    // 一个是绝对路径，一个是相对路径，返回绝对路径
    return to
  }

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
