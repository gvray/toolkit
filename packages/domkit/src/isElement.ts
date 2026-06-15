/**
 * Checks whether a value is a DOM `Element` or `HTMLDocument`.
 * 检查值是否为 DOM `Element` 或 `HTMLDocument`。
 *
 * @param value - The value to check / 要检查的值
 * @returns `true` when the value is a DOM element / 值是 DOM 元素时返回 `true`
 * @example
 * isElement(document.body)
 * // => true
 *
 * @since 1.0.0
 */
const isElement = (value: unknown): value is Element | HTMLDocument => {
  const ElementCtor = typeof Element === 'undefined' ? undefined : Element;
  const HTMLDocumentCtor = typeof HTMLDocument === 'undefined' ? undefined : HTMLDocument;

  return (
    (ElementCtor !== undefined && value instanceof ElementCtor) ||
    (HTMLDocumentCtor !== undefined && value instanceof HTMLDocumentCtor)
  );
};

export default isElement;
