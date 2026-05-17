type StyleProps = Record<string, string>;
/**
 * Get the style properties of an element.
 *
 * @param element The element to get the style properties of.
 * @param propName The name of the property to get.
 * @returns If `propName` is specified, returns the value of that property. Otherwise, returns an object containing all style properties and their values.
 *
 * @example
 *
 * Get all style properties of a specified element:
 * ```typescript
 * const element = document.getElementById('my-element');
 * const styleProps = getStyleProps(element);
 * console.log(styleProps);
 * ```
 *
 * Get the `color` property of a specified element:
 * ```typescript
 * const element = document.getElementById('my-element');
 * const color = getStyleProps(element, 'color');
 * console.log(color);
 * ```
 * @since 1.0.0
 */
const getStyleProps = (element: HTMLElement, propName?: string): StyleProps | string => {
  const styleProps: StyleProps = {};
  const style = window.getComputedStyle(element);

  if (!style) {
    return {};
  }

  if (propName) {
    return style.getPropertyValue(propName);
  }

  for (let i = 0; i < style.length; i++) {
    const prop = style[i];
    styleProps[prop] = style.getPropertyValue(prop);
  }

  return styleProps;
};
export default getStyleProps;
