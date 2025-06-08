/**
 * Checks if a value is a DOM Element or HTMLDocument object.
 * 检查值是否为DOM元素或HTMLDocument对象。
 *
 * @param o - The value to check / 要检查的值
 * @returns True if the value is an Element or HTMLDocument / 如果值是元素或HTMLDocument则返回true
 *
 * @example
 * ```typescript
 * // DOM elements
 * isElement(document.body) // true
 * isElement(document.documentElement) // true (html element)
 * isElement(document.querySelector('div')) // true (if div exists)
 * isElement(document.getElementById('myId')) // true (if element exists)
 *
 * // Created elements
 * const div = document.createElement('div')
 * const span = document.createElement('span')
 * isElement(div) // true
 * isElement(span) // true
 *
 * // HTML Document
 * isElement(document) // true (HTMLDocument)
 *
 * // Various element types
 * isElement(document.querySelector('input')) // true
 * isElement(document.querySelector('canvas')) // true
 * isElement(document.querySelector('svg')) // true
 *
 * // Non-elements
 * isElement(window) // false (Window object)
 * isElement(document.querySelector('nonexistent')) // false (null)
 * isElement('div') // false (string)
 * isElement({ nodeType: 1 }) // false (plain object)
 * isElement(null) // false
 * isElement(undefined) // false
 *
 * // Text nodes and other node types
 * const textNode = document.createTextNode('hello')
 * const comment = document.createComment('comment')
 * isElement(textNode) // false (Text node, not Element)
 * isElement(comment) // false (Comment node, not Element)
 *
 * // Practical usage
 * function appendToElement(parent: unknown, child: HTMLElement) {
 *   if (isElement(parent)) {
 *     parent.appendChild(child)
 *   } else {
 *     throw new Error('Parent must be a DOM element')
 *   }
 * }
 * ```
 *
 * @since 1.0.0
 */
const isElement = (o: unknown): boolean => o instanceof Element || o instanceof HTMLDocument
export default isElement
