/**
 * Moves the given element to the back of its parent's children.
 *
 * @param el - The element to move to the back.
 * @example
 * const parent = document.createElement('div')
 * const a = document.createElement('span')
 * const b = document.createElement('span')
 * parent.appendChild(a)
 * parent.appendChild(b)
 * toBack(a)
 * console.log(parent.lastElementChild === a)
 *
 * @since 1.0.0
 */
const toBack = (el: HTMLElement): void => {
  const parent = el.parentNode;
  parent?.appendChild(el);
};

export default toBack;
