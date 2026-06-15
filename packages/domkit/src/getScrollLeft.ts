/**
 * Get the horizontal scroll position.
 * @param element Scroll container element or window object.
 * @returns The horizontal scroll position.
 *
 * @example
 * console.log(getScrollLeft(window))
 *
 * @since 1.0.0
 */
const getScrollLeft = (element: HTMLElement | Window): number => {
  if (typeof (element as HTMLElement).scrollLeft !== 'undefined') {
    return (element as HTMLElement).scrollLeft;
  } else {
    return (
      window.scrollX ||
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0
    );
  }
};

export default getScrollLeft;
