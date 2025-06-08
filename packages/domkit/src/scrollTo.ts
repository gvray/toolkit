/**
 * Scroll to the specified position in the target element.
 *
 * @remarks
 * This function scrolls to the specified position in the target HTML element, which can be the window or any other HTML
 * element. If no target element is provided, it defaults to the window object.
 *
 * @param options - The options for the scroll operation.
 * @param options.x - The horizontal position to scroll to.
 * @param options.y - The vertical position to scroll to.
 * @param options.target - The target element to scroll. Defaults to the window object.
 * @param options.behavior - The scroll behavior. Can be "auto" (default) or "smooth".
 *
 * @example
 * ```typescript
 * import { scrollTo } from "./scrollTo";
 *
 * // Scroll to (0, 0) in the window object with smooth behavior
 * scrollTo({ x: 0, y: 0, behavior: "smooth" });
 *
 * // Scroll to (100, 100) in an HTML element with auto behavior
 * const element = document.getElementById("my-element");
 * scrollTo({ x: 100, y: 100, target: element });
 * ```
 */
type TargetType = HTMLElement | Element | Window | null | undefined
type ScrollToOptions = {
  x: number
  y: number
  target?: TargetType
  behavior?: 'auto' | 'smooth'
}

export const scrollTo = ({ x = 0, y = 0, target = window, behavior = 'auto' }: ScrollToOptions): void => {
  // 处理负值
  const scrollX = Math.max(0, x)
  const scrollY = Math.max(0, y)

  // 如果没有提供 target 或者 target 是 null/undefined，使用 window
  if (!target || target === window) {
    if ('scrollBehavior' in document.documentElement.style && typeof window.scrollTo === 'function') {
      window.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior
      })
    } else if (typeof window.scroll === 'function') {
      window.scroll(scrollX, scrollY)
    }
    return
  }

  // 检查是否是 Window 对象
  if (target instanceof Window) {
    if ('scrollBehavior' in document.documentElement.style && typeof target.scrollTo === 'function') {
      target.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior
      })
    } else if (typeof target.scroll === 'function') {
      target.scroll(scrollX, scrollY)
    }
    return
  }

  // 处理 HTMLElement 或 Element
  if (target instanceof HTMLElement || target instanceof Element) {
    if (typeof target.scrollTo === 'function') {
      target.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior
      })
    } else {
      ;(target as HTMLElement).scrollTop = scrollY
      ;(target as HTMLElement).scrollLeft = scrollX
    }
    return
  }

  throw new Error('Invalid target element type. Must be Window or HTMLElement.')
}

export default scrollTo
