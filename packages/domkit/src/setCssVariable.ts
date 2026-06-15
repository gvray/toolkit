/**
 * Sets a CSS variable on the specified element or the root element.
 * @param key - The name of the CSS variable to set.
 * @param val - The value to set the CSS variable to.
 * @param ele - The element to set the CSS variable on. If not specified, defaults to the root element.
 * @example
 * // Set a CSS variable on the root element
 * setCssVariable('--main-bg-color', '#ffffff');
 *
 * // Set a CSS variable on a specific element
 * const element = document.querySelector('.my-element');
 * setCssVariable('--main-bg-color', '#ffffff', element)
 *
 * @since 1.0.0
 */
const setCssVariable = (key: string, val: string, ele?: HTMLElement): void => {
  const element = ele ?? document.documentElement;
  element.style.setProperty(key, val);
};

export default setCssVariable;
