/**
 * Moves the given element to the front of its parent's children.
 *
 * @param el - The element to move to the front.
 * @example
 *
 * // Create a new element and add it to the DOM
 * const newDiv = document.createElement('div');
 * document.body.appendChild(newDiv);
 *
 * // Move the new element to the front of the body
 * toFront(newDiv)
 *
 * @since 1.0.0
 */
const toFront = (el: HTMLElement): void => {
  const parent = el.parentNode!;
  const firstChild = parent.firstElementChild;
  if (firstChild !== el) {
    parent.insertBefore(el, firstChild);
  }
};

export default toFront;
