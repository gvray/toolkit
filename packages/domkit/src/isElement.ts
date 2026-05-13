/**
 * Checks whether a value is a DOM `Element` or `HTMLDocument`.
 * 检查值是否为 DOM `Element` 或 `HTMLDocument`。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a DOM element / 值是 DOM 元素时返回 `true`
 * @example
 * isElement(document.body)
 * // -> true
 */
const isElement = (value: unknown): value is Element | HTMLDocument => {
  return value instanceof Element || value instanceof HTMLDocument
}

export default isElement
