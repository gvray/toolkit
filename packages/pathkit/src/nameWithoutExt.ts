import basename from './basename'
import extname from './extname'

/**
 * Returns the file name without its final extension.
 *
 * @param path - The source path.
 * @returns The file name without extension.
 *
 * @example
 * nameWithoutExt('foo.min.js')
 * // -> 'foo.min'
 */
const nameWithoutExt = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('path must be a string')
  }

  const fileName = basename(path)
  const extension = extname(fileName)

  return extension ? fileName.slice(0, -extension.length) : fileName
}

export default nameWithoutExt
