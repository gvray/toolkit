/**
 * Gets the offset (left, top) position of the specified element relative to its parent element.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * const offset = getOffsetPosition(el)
 * console.log(offset.left, offset.top)
 *
 * @param ele The element to get the offset position for.
 * @returns The offset (left, top) position of the element relative to its parent.
 *
 * @since 1.0.0
 */
const getOffsetPosition = (ele: HTMLElement): { left: number; top: number } => {
  if (!ele) return { left: 0, top: 0 };
  const clientRects = ele.getClientRects();
  const clientRect = clientRects.length > 0 ? clientRects[0] : ele.getBoundingClientRect();
  return { left: clientRect.left, top: clientRect.top };
};

export default getOffsetPosition;
