/**
 * Reads a query parameter from a URL string.
 *
 * @param url - The source URL.
 * @param key - The query parameter name.
 * @returns The parameter value, or `null` if missing.
 *
 * @example
 * getQueryParam('https://example.com?id=5', 'id')
 * // -> '5'
 */
const getQueryParam = (url: string, key: string): string | null => {
  if (typeof url !== 'string' || typeof key !== 'string') {
    throw new TypeError('url and key must be strings')
  }

  return new URL(url).searchParams.get(key)
}

export default getQueryParam
