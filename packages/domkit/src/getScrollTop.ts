/**
 * Get the scroll position.
 * @param element Scroll container element or window object.
 * @returns The scroll position.
 *
 * @example
 * console.log(getScrollTop(window))
 *
 * @since 1.0.0
 */
const getScrollTop = (element: HTMLElement | Window): number => {
  if (typeof (element as HTMLElement).scrollTop !== 'undefined') {
    return (element as HTMLElement).scrollTop;
  } else {
    return (
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
};

export default getScrollTop;
