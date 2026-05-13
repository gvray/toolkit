/**
 * Removes a query parameter from a URL string.
 *
 * @param url - The source URL.
 * @param key - The query parameter name.
 * @returns The updated URL string.
 *
 * @example
 * removeQueryParam('https://example.com?a=1&b=2', 'a')
 * // -> 'https://example.com/?b=2'
 */
const removeQueryParam = (url: string, key: string): string => {
  if (typeof url !== 'string' || typeof key !== 'string') {
    throw new TypeError('url and key must be strings')
  }

  const nextUrl = new URL(url)
  nextUrl.searchParams.delete(key)
  return nextUrl.toString()
}

export default removeQueryParam
