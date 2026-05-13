import extname from './extname'

/**
 * Replaces the extension of a path.
 *
 * @param path - The source path.
 * @param extension - The new extension, with or without a leading dot.
 * @returns The path with the replaced extension.
 *
 * @example
 * changeExt('foo.ts', '.js')
 * // -> 'foo.js'
 */
const changeExt = (path: string, extension: string): string => {
  if (typeof path !== 'string' || typeof extension !== 'string') {
    throw new TypeError('path and extension must be strings')
  }

  const normalizedExtension = extension.startsWith('.') ? extension : `.${extension}`
  const currentExtension = extname(path)

  if (!currentExtension) {
    return `${path}${normalizedExtension}`
  }

  return path.slice(0, -currentExtension.length) + normalizedExtension
}

export default changeExt
