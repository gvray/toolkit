/**
 * Sets the class attribute or className property of an element to the specified value.
 * @param el The element to set the class attribute/property for.
 * @param className The class name(s) to set on the element.
 * @example
 * const el = document.createElement('div')
 * setClass(el, 'my-class')
 * console.log(el.className)
 *
 * @since 1.0.0
 */
const setClass = (el: HTMLElement | SVGElement, className: string): void => {
  if ('classList' in el) {
    el.setAttribute('class', className);
  } else if ('className' in el) {
    (el as HTMLElement | SVGElement).setAttribute('class', className);
  } else {
    // for ancient browsers
    (el as HTMLElement | SVGElement).setAttribute('class', className);
    (el as HTMLElement | SVGElement).setAttribute('className', className);
  }
};

export default setClass;
