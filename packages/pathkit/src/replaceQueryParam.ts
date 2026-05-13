/**
 * Replaces a query parameter value in a URL string.
 *
 * @param url - The source URL.
 * @param key - The query parameter name.
 * @param value - The next query parameter value.
 * @returns The updated URL string.
 *
 * @example
 * replaceQueryParam('https://example.com?page=1', 'page', '2')
 * // -> 'https://example.com/?page=2'
 */
const replaceQueryParam = (url: string, key: string, value: string): string => {
  if (typeof url !== 'string' || typeof key !== 'string' || typeof value !== 'string') {
    throw new TypeError('url, key and value must be strings')
  }

  const nextUrl = new URL(url)
  nextUrl.searchParams.set(key, value)
  return nextUrl.toString()
}

export default replaceQueryParam
