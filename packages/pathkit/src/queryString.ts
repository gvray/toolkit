/**
 * Converts a query object to a query string.
 *
 * @param query - The query object to convert.
 * @param separator - The separator to use between the URL and the query string (default is '?').
 * @returns The generated query string.
 *
 * @example
 * const query = { name: 'John', age: 30 };
 * const result = queryString(query)
 * // -> '?name=John&age=30'
 */
const queryString = (query: Record<string, string | number> | null | undefined = {}, separator: string = '?'): string => {
  if (typeof separator !== 'string') {
    throw new TypeError('separator must be a string')
  }

  if (!query) {
    return ''
  }

  const content = Object.keys(query)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(String(query[key]))}`)
    .join('&')

  return content ? `${separator}${content}` : ''
}

export default queryString
