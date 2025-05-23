import { hasOwnProperty } from '@gvray/eskit'

/**
 * Parses the query or hash parameter string.
 *
 * @param str - The query or hash parameter string to parse.
 *
 * @returns An object representing the parsed parameters.
 */
const parseQueryString = (str: string): { [key: string]: string | string[] } => {
  const result: { [key: string]: string | string[] } = {}

  if (!str) {
    return result
  }

  str.split('&').forEach((item) => {
    const [key, value] = item.split('=', 2)
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value ?? '')

    if (decodedKey && decodedValue !== undefined) {
      if (hasOwnProperty(result, decodedKey)) {
        result[decodedKey] = ([] as string[]).concat(result[decodedKey], decodedValue)
      } else {
        result[decodedKey] = decodedValue
      }
    }
  })

  return result
}

/**
 * Parses the query and hash parameters of the specified URL string.
 *
 * @param url - The URL string to parse.
 *
 * @returns An object containing the query and hash parameters of the URL.
 *
 * @example
 *
 * ```ts
 * // Basic usage
 * const url = 'http://example.com/path/to/page?a=1&b=2#section1';
 * const { query, hash } = parseUrl(url);
 * console.log(query); // { a: '1', b: '2' }
 * console.log(hash); // { section1: '' }
 *
 * // Query and hash without value
 * const url2 = 'http://example.com/path/to/page?a&b#c';
 * const { query: query2, hash: hash2 } = parseUrl(url2);
 * console.log(query2); // { a: '', b: '' }
 * console.log(hash2); // { c: '' }
 *
 * // Query with array value
 * const url3 = 'http://example.com/path/to/page?color=red&color=green&color=blue';
 * const { query: query3, hash: hash3 } = parseUrl(url3);
 * console.log(query3); // { color: ['red', 'green', 'blue'] }
 * console.log(hash3); // {}
 * ```
 * @since 1.0.0
 */
const parseUrl = (
  url: string
): { query: Record<string, string | string[]>; hash: Record<string, string | string[]>; baseUrl: string } => {
  // eslint-disable-next-line no-useless-escape
  const [baseUrl, queryStr, hashStr] = url.split(/[\?#]/)

  return {
    baseUrl,
    query: parseQueryString(queryStr),
    hash: parseQueryString(hashStr)
  }
}

export default parseUrl
