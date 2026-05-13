/**
 * Parses a query string into an object.
 *
 * @param query - The query string, with or without a leading `?`.
 * @returns The parsed query object.
 *
 * @example
 * queryStringParse('a=1&b=x')
 * // -> { a: '1', b: 'x' }
 */
const queryStringParse = (query: string): Record<string, string> => {
  if (typeof query !== 'string') {
    throw new TypeError('query must be a string')
  }

  const normalizedQuery = query.startsWith('?') ? query.slice(1) : query

  if (!normalizedQuery) {
    return {}
  }

  return normalizedQuery.split('&').reduce<Record<string, string>>((result, pair) => {
    if (!pair) {
      return result
    }

    const [rawKey, ...rawValueParts] = pair.split('=')
    const key = decodeURIComponent(rawKey)
    const value = decodeURIComponent(rawValueParts.join('='))

    result[key] = value
    return result
  }, {})
}

export default queryStringParse
