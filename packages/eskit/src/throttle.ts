export interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

/**
 * Creates a throttled function that only invokes the original function at most once per every `delay` milliseconds.
 * The throttled function has optional leading or trailing invocation.
 * 创建一个节流函数，在每个 `delay` 毫秒内最多只调用一次原函数。
 * 节流函数可以选择在前沿或后沿调用。
 *
 * @param fn - The original function to be throttled. / 要被节流的原函数
 * @param delay - The number of milliseconds to throttle. / 节流的毫秒数
 * @param options - Optional configuration for leading and/or trailing invocation. / 前沿和/或后沿调用的可选配置
 * @param options.leading - Specify invoking on the leading edge. Default is `false`. / 指定是否在前沿调用，默认为 `false`
 * @param options.trailing - Specify invoking on the trailing edge. Default is `true`. / 指定是否在后沿调用，默认为 `true`
 * @returns Throttled function / 节流函数
 *
 * @example
 * ```typescript
 * // Basic throttle
 * const throttledFn = throttle(() => {
 *   console.log('Called!');
 * }, 1000);
 *
 * // With leading edge
 * const throttledWithLeading = throttle(() => {
 *   console.log('Called immediately!');
 * }, 1000, { leading: true });
 *
 * // Search input example
 * const searchThrottled = throttle((query: string) => {
 *   performSearch(query);
 * }, 300);
 * ```
 */
export function throttle<TArgs extends any[]>(
  fn: (...args: TArgs) => void,
  delay: number,
  options: ThrottleOptions = {}
): (...args: TArgs) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null
  let lastInvokeTime = 0
  let lastArgs: TArgs | undefined
  let leadingInvoked = false

  const { leading = false, trailing = true } = options

  return (...args: TArgs) => {
    const now = Date.now()
    const timeSinceLastInvoke = now - lastInvokeTime
    lastArgs = args

    // Clear existing timer
    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }

    // Leading edge
    if (leading && timeSinceLastInvoke >= delay) {
      lastInvokeTime = now
      leadingInvoked = true
      fn(...args)

      // If only leading is enabled, don't set trailing timer
      if (!trailing) {
        return
      }
    } else {
      leadingInvoked = false
    }

    // Trailing edge
    if (trailing) {
      const remainingDelay = delay - timeSinceLastInvoke
      const timeToWait = remainingDelay > 0 ? remainingDelay : 0

      timerId = setTimeout(() => {
        // Only invoke trailing if we didn't just invoke leading
        if (!leadingInvoked) {
          lastInvokeTime = Date.now()
          if (lastArgs) {
            fn(...lastArgs)
          }
        }
        timerId = null
        leadingInvoked = false
      }, timeToWait)
    }
  }
}

export default throttle
