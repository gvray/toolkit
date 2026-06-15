type StyleProps = Record<string, string>;
/**
 * Get the style properties of an element.
 *
 * @param element The element to get the style properties of.
 * @param propName The name of the property to get.
 * @returns If `propName` is specified, returns the value of that property. Otherwise, returns an object containing all style properties and their values.
 *
 * @example
 * const element = document.createElement('div')
 * element.style.color = 'red'
 * document.body.appendChild(element)
 * console.log(getStyleProps(element, 'color'))
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
