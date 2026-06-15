/**
 * Removes a CSS variable from the specified element or the root element.
 * @param key - The name of the CSS variable to remove.
 * @param ele - The element from which to remove the CSS variable. If not specified, defaults to the root element.
 * @example
 * // Remove a CSS variable from the root element
 * removeCssVariable('--main-bg-color');
 *
 * // Remove a CSS variable from a specific element
 * const element = document.querySelector('.my-element');
 * removeCssVariable('--main-bg-color', element)
 *
 * @since 1.0.0
 */
const removeCssVariable = (key: string, ele?: HTMLElement): void => {
  const element = ele ?? document.documentElement;
  element.style.removeProperty(key);
};

export default removeCssVariable;
