/**
 * Adds a query parameter to a URL string.
 *
 * @param url - The source URL.
 * @param key - The query parameter name.
 * @param value - The query parameter value.
 * @returns The updated URL string.
 *
 * @example
 * addQueryParam('https://example.com', 'token', 'abc')
 * // -> 'https://example.com/?token=abc'
 */
const addQueryParam = (url: string, key: string, value: string): string => {
  if (typeof url !== 'string' || typeof key !== 'string' || typeof value !== 'string') {
    throw new TypeError('url, key and value must be strings')
  }

  const nextUrl = new URL(url)
  nextUrl.searchParams.append(key, value)
  return nextUrl.toString()
}

export default addQueryParam
