/**
 * Checks whether two URLs share the same origin (scheme + host + port).
 * 判断两个 URL 是否同源（协议 + 主机 + 端口）。
 *
 * @param urlA - First URL / 第一个 URL
 * @param urlB - Second URL / 第二个 URL
 * @returns True when origins match / 同源则为 true
 *
 * @example
 * isSameOrigin('https://a.com/x', 'https://a.com/y') // -> true
 */
const isSameOrigin = (urlA: string, urlB: string): boolean => {
  if (typeof urlA !== 'string' || typeof urlB !== 'string') {
    throw new TypeError('urlA and urlB must be strings')
  }

  const a = new URL(urlA, 'http://localhost')
  const b = new URL(urlB, 'http://localhost')
  return a.origin === b.origin
}

export default isSameOrigin
