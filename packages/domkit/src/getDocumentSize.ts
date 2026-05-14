/**
 * Returns the full document size.
 *
 * @returns The document width and height.
 *
 * @example
 * getDocumentSize()
 * // -> { width: 1440, height: 3200 }
 */
const getDocumentSize = (): { width: number; height: number } => {
  const { body, documentElement } = document

  return {
    width: Math.max(body.scrollWidth, documentElement.scrollWidth, body.offsetWidth, documentElement.offsetWidth),
    height: Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight)
  }
}

export default getDocumentSize
