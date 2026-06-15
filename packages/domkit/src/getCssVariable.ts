/**
 * Gets the value of a CSS variable on the specified element or the root element.
 * @param key - The name of the CSS variable to get.
 * @param ele - The element to get the CSS variable from. If not specified, defaults to the root element.
 * @returns The value of the CSS variable.
 * @example
 * setCssVariable('--test-color', 'red')
 * console.log(getCssVariable('--test-color'))
 *
 * @since 1.0.0
 */
const getCssVariable = (key: string, ele?: HTMLElement): string => {
  const element = ele ?? document.documentElement;
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.getPropertyValue(key).trim();
};

export default getCssVariable;
