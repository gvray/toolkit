import { each, isEmpty } from '@gvray/eskit'

/**
 * Sets the style properties of an HTML element.
 *
 * @param element - The element to set style properties on.
 * @param props - The style properties to set, in the form of an object of key-value pairs.
 *
 * @example
 * ```ts
 * const el = document.getElementById('myElement')
 * setStyleProps(el, { color: 'red', fontSize: '14px' })
 * ```
 *
 * @returns void
 * @since 1.0.0
 */
const setStyleProps = <T extends HTMLElement>(element: T | null, props: Partial<{ [key: string]: string }>): void => {
  if (!element || isEmpty(props)) {
    return
  }

  each(props as Record<string, string>, (value: any, key: any) => {
    let cssName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    const { style } = element
    if (cssName in style) {
      // Set value of the corresponding style attribute
      element.style.setProperty(cssName, value)
    } else {
      // If the style attribute is not present, set a custom CSS variable
      cssName = `--${cssName}`
      element.style.setProperty(cssName, value)
    }
  })
}
export default setStyleProps
