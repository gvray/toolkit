import queryString from './queryString'

/**
 * Builds a URL from a base URL, path, and optional query object.
 *
 * @param base - The base URL.
 * @param path - The path to append.
 * @param query - The query object.
 * @returns The built URL string.
 *
 * @example
 * buildUrl('https://api.com', '/users', { page: 1 })
 * // -> 'https://api.com/users?page=1'
 */
const buildUrl = (base: string, path: string = '', query: Record<string, string | number> = {}): string => {
  if (typeof base !== 'string' || typeof path !== 'string') {
    throw new TypeError('base and path must be strings')
  }

  const url = new URL(path, base)
  const search = queryString(query, '')

  return `${url.toString()}${search ? `?${search}` : ''}`
}

export default buildUrl
