type Position = {
  left: number
  top: number
}
type TargetType = HTMLElement | Element | Window | Document
/**
 * Gets the scroll position of the specified target element.
 *
 * @remarks
 * This function returns the horizontal and vertical scroll position of the specified target element, which can be
 * an HTML element or the window or document object.
 *
 * @param el - The target element to get the scroll position for.
 * @returns A `Position` object that contains the horizontal and vertical scroll position of the specified target
 * element.
 *
 * @example
 * ```typescript
 * import { getScrollPosition } from "@gvray/domkit";
 *
 * // Get scroll position for window object
 * const windowScrollPosition = getScrollPosition(window);
 * console.log(`Window scroll position: left = ${windowScrollPosition.left}, top = ${windowScrollPosition.top}`);
 *
 * // Get scroll position for document object
 * const documentScrollPosition = getScrollPosition(document);
 * console.log(`Document scroll position: left = ${documentScrollPosition.left}, top = ${documentScrollPosition.top}`);
 *
 * // Get scroll position for HTML element
 * const element = document.getElementById("my-element");
 * const elementScrollPosition = getScrollPosition(element);
 * console.log(`Element scroll position: left = ${elementScrollPosition.left}, top = ${elementScrollPosition.top}`);
 * ```
 */
const getScrollPosition = (el: TargetType): Position => {
  let xy: Position
  if (el instanceof Document || el instanceof Window) {
    if (document.scrollingElement) {
      xy = {
        left: document.scrollingElement.scrollLeft,
        top: document.scrollingElement.scrollTop
      }
    } else {
      xy = {
        left: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop),
        top: Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft)
      }
    }
  } else {
    xy = {
      left: el.scrollLeft,
      top: el.scrollTop
    }
  }
  return xy
}

export default getScrollPosition
