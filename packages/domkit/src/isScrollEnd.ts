/**
 * Checks if the scroll has reached the end.
 * @param element - The element to check the scroll for. Defaults to the entire document.
 * @returns Returns a boolean indicating whether the scroll has reached the end.
 * @example
 * // Check if the entire document has scrolled to the end
 * const isDocumentScrollEnd = isScrollEnd();
 *
 * // Check if a specific div has scrolled to the end
 * const myDiv = document.getElementById('myDiv');
 * const isDivScrollEnd = isScrollEnd(myDiv);
 */
const isScrollEnd = (element?: HTMLElement | null): boolean => {
  // 如果在非浏览器环境中且没有传入元素，返回 false
  if (typeof document === 'undefined') {
    return false
  }

  // 如果传入 null，返回 false
  if (element === null) {
    return false
  }

  const targetElement = element || document.documentElement

  if (!targetElement) {
    return false
  }

  const { scrollTop } = targetElement
  const { scrollHeight } = targetElement
  const { clientHeight } = targetElement

  // 如果没有滚动内容，返回 true（已经在底部）
  if (scrollHeight <= clientHeight) {
    return true
  }

  // 检查是否滚动到底部，允许 1px 的误差
  return scrollTop + clientHeight >= scrollHeight - 1
}

export default isScrollEnd
