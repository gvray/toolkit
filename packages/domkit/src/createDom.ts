import { isElement, isString } from '@gvray/eskit'

export interface DomAttrs<T> {
  tagName: T
  container?: HTMLElement
  node?: HTMLElement | string
}
/**
 * Creates a new DOM element based on the provided attributes.
 * @param domAttrs Optional attributes for the new element.
 * @returns The newly created element.
 *
 * @example
 * // Creating a new div with some text content and adding it to the document body
 * const myDiv = createDom({
 *   tagName: 'div',
 *   node: 'Hello, world!',
 *   container: document.body
 * });
 *
 * @since 1.0.0
 *
 */
const createDom = <K extends keyof HTMLElementTagNameMap>(domAttrs?: DomAttrs<K>): HTMLElementTagNameMap[K] => {
  if (!domAttrs || isString(domAttrs)) {
    return document.createElement((domAttrs ?? 'div') as K)
  }
  const { tagName, container, node } = domAttrs
  const el = document.createElement(tagName ?? 'div')
  if (node) {
    if (isString(node)) {
      const textNode = document.createTextNode(node as string)
      el.appendChild(textNode)
    } else if (isElement(node)) {
      el.appendChild(node as Node)
    }
  }
  if (container) {
    container.appendChild(el)
  }
  return el
}

export default createDom
