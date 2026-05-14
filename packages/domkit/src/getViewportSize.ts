/**
 * Returns the current viewport size.
 *
 * @returns The viewport width and height.
 *
 * @example
 * getViewportSize()
 * // -> { width: 1440, height: 900 }
 */
const getViewportSize = (): { width: number; height: number } => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export default getViewportSize
