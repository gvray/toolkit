import getClass from './getClass';
/**
 * Checks if an element has a specified CSS class, including SVG elements.
 *
 * @example
 * const el = document.createElement('div')
 * el.className = 'example-class'
 * console.log(hasClass(el, 'example-class'))
 *
 * @param el - The element to check
 * @param className - The CSS class to check for
 * @returns If the element has the specified CSS class, returns true; otherwise, returns false.
 *
 * @since 1.0.0
 */
const hasClass = (el: HTMLElement | SVGElement, className: string): boolean => {
  return getClass(el).split(/\s+/).includes(className);
};

export default hasClass;
