/**
 * Checks whether an element is within the viewport.
 *
 * @param element - The target element.
 * @returns `true` when the element intersects the viewport.
 *
 * @example
 * isInViewport(el)
 * // -> true
 */
const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()

  return rect.bottom >= 0 && rect.right >= 0 && rect.top <= window.innerHeight && rect.left <= window.innerWidth
}

export default isInViewport
