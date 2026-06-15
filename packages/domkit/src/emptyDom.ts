/**
 * Removes all child nodes from the specified DOM element.
 *
 * @example
 * const el = document.createElement('div')
 * el.textContent = 'hello'
 * emptyDom(el)
 * el.textContent // => ''
 *
 * @param el The DOM element to empty.
 *
 * @since 1.0.0
 */
const emptyDom = (el: HTMLElement): void => {
  el.textContent = '';
};
export default emptyDom;
