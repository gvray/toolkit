/**
 * Set the opacity of an element.
 *
 * @param elem - The element whose opacity to set.
 * @param opacity - The opacity value to set.
 *
 * @example
 * const el = document.createElement('div')
 * setOpacity(el, 0.5)
 * console.log(el.style.opacity)
 *
 * @since 1.0.0
 */
const setOpacity = (elem: HTMLElement | any, opacity: number): void => {
  // Check for support of the `opacity` CSS property
  if ('opacity' in elem.style) {
    elem.style.opacity = String(opacity);
  } else {
    // Fallback for browsers that don't support `opacity`
    elem.style.filter = `alpha(opacity=${Math.round(opacity * 100)})`;
  }
};

export default setOpacity;
