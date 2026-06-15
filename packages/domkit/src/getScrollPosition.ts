type Position = {
  left: number;
  top: number;
};
type TargetType = HTMLElement | Element | Window | Document;
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
 * const windowScrollPosition = getScrollPosition(window)
 * console.log(`Window scroll position: left = ${windowScrollPosition.left}, top = ${windowScrollPosition.top}`)
 *
 * const documentScrollPosition = getScrollPosition(document)
 * console.log(`Document scroll position: left = ${documentScrollPosition.left}, top = ${documentScrollPosition.top}`)
 *
 * @since 1.0.0
 */
const getScrollPosition = (el: TargetType): Position => {
  let xy: Position;
  if (el === document || el === window || el instanceof Document || el instanceof Window) {
    if (document.scrollingElement) {
      xy = {
        left: document.scrollingElement.scrollLeft,
        top: document.scrollingElement.scrollTop,
      };
    } else {
      xy = {
        left: Math.max(
          window.pageXOffset,
          document.documentElement.scrollLeft,
          document.body.scrollLeft
        ),
        top: Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ),
      };
    }
  } else {
    xy = {
      left: el.scrollLeft,
      top: el.scrollTop,
    };
  }
  return xy;
};

export default getScrollPosition;
