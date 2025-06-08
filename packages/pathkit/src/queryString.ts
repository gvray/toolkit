/**
 * Converts a query object to a query string.
 *
 * @param query - The query object to convert.
 * @param separator - The separator to use between the URL and the query string (default is '?').
 * @returns The generated query string.
 *
 * @example
 * const query = { name: 'John', age: 30 };
 * const result = queryString(query);
 * // result will be '?name=John&age=30'
 */

const queryString = (query: Record<string, string | number> = {}, separator = '?'): string => {
  try {
    // 处理 null 或 undefined 的情况
    if (!query || typeof query !== 'object') {
      return ''
    }

    const queryString = Object.keys(query)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&')
    return queryString ? `${separator}${queryString}` : ''
  } catch (error) {
    console.error('Error while generating query string:', error)
    return ''
  }
}

export default queryString
