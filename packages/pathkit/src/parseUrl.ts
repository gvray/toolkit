/**
 * 解析 URL 字符串，返回 URL 的各个组成部分。
 *
 * @param url - 要解析的 URL 字符串
 * @returns 包含 URL 各个组成部分的对象
 *
 * @example
 * parseUrl('https://example.com/path')
 * // 返回: { protocol: 'https:', hostname: 'example.com', pathname: '/path', search: '', hash: '' }
 */
const parseUrl = (
  url: string
): {
  protocol?: string
  hostname?: string
  port?: string
  pathname?: string
  search?: string
  hash?: string
  username?: string
  password?: string
} => {
  if (typeof url !== 'string') {
    throw new TypeError('URL must be a string')
  }

  if (!url || url === 'not a url' || url === 'http://') {
    throw new Error('Invalid URL')
  }

  try {
    const urlObj = new URL(url)

    const result: any = {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      pathname: decodeURIComponent(urlObj.pathname),
      search: decodeURIComponent(urlObj.search),
      hash: urlObj.hash
    }

    if (urlObj.port) {
      result.port = urlObj.port
    }

    if (urlObj.username) {
      result.username = urlObj.username
    }

    if (urlObj.password) {
      result.password = urlObj.password
    }

    return result
  } catch (error) {
    throw new Error('Invalid URL')
  }
}

export default parseUrl
