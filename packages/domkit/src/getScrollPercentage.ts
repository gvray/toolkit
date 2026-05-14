/**
 * Calculates the scroll progress percentage for an element or the window.
 *
 * @param target - The scroll container. Defaults to `window`.
 * @returns The scroll percentage between 0 and 100.
 *
 * @example
 * getScrollPercentage(document.documentElement)
 * // -> 45
 */
const getScrollPercentage = (target: HTMLElement | Window = window): number => {
  if (target === window) {
    const scrollTop = window.pageYOffset
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    return maxScroll === 0 ? 100 : (scrollTop / maxScroll) * 100
  }

  const element = target as HTMLElement
  const maxScroll = Math.max(element.scrollHeight - element.clientHeight, 0)
  return maxScroll === 0 ? 100 : (element.scrollTop / maxScroll) * 100
}

export default getScrollPercentage
