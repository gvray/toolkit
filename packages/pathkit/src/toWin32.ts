/**
 * 将路径转换为 Windows 格式。
 *
 * @param path - 要转换的路径
 * @returns Windows 格式的路径
 *
 * @example
 * toWin32('/c/temp/foo/bar')      // 返回: 'C:\\temp\\foo\\bar'
 * toWin32('//server/share/foo')   // 返回: '\\\\server\\share\\foo'
 * toWin32('foo/bar/baz')         // 返回: 'foo\\bar\\baz'
 */
const toWin32 = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string')
  }

  // 处理空路径
  if (!path) {
    return '.'
  }

  // 将正斜杠转换为反斜杠
  let result = path.replace(/\//g, '\\')

  // 检查是否是真正的 UNC 路径
  const isUNC = result.startsWith('\\\\') && result.length > 2 && !result.startsWith('\\\\\\')

  if (isUNC) {
    // 保持 UNC 路径的双反斜杠，但规范化其余部分
    result = `\\\\${result.substring(2).replace(/\\+/g, '\\')}`
  } else {
    // 处理驱动器路径
    if (/^\\[a-z]\\/.test(result.toLowerCase())) {
      // 转换为驱动器格式
      result = `${result.charAt(1).toUpperCase()}:${result.slice(2)}`
    }

    // 规范化多个反斜杠
    result = result.replace(/\\+/g, '\\')
  }

  // 移除末尾的反斜杠（除非是根路径或驱动器根路径）
  if (result.length > 1 && result.endsWith('\\') && !result.endsWith(':\\')) {
    result = result.slice(0, -1)
  }

  return result
}

export default toWin32
