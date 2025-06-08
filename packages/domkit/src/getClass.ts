/**
 * Returns a string of all the CSS class names assigned to an element, including SVG elements.
 *
 * @param el - The element to retrieve the class names from
 * @returns A string containing class names
 *
 * @example
 *
 * const el = document.querySelector('.example-class')!;
 * const classes = getClass(el);
 * console.log(classes); // 'example-class'
 *
 * @since 1.0.0
 */
const getClass = (el: HTMLElement | SVGElement | null | undefined): string => {
  if (!el) {
    return ''
  }
  if (el instanceof SVGElement) {
    return el.getAttribute('class') || ''
  }
  return 'className' in el ? el.className : (el as HTMLElement | SVGElement).getAttribute('class') || ''
}

export default getClass
