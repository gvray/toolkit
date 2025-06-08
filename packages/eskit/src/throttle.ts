/**
 * @deprecated This function has been moved to @gvray/adminkit. Please use adminkit's throttle instead.
 * 此函数已移至 @gvray/adminkit，请使用 adminkit 中的 throttle 函数。
 *
 * Creates a throttled function that only invokes the original function at most once per every `delay` milliseconds.
 * The throttled function has optional leading or trailing invocation.
 * 创建一个节流函数，在每个 `delay` 毫秒内最多只调用一次原函数。
 * 节流函数可以选择在前沿或后沿调用。
 *
 * @param fn - The original function to be throttled. / 要被节流的原函数
 * @param delay - The number of milliseconds to throttle. / 节流的毫秒数
 * @param options - Optional configuration for leading and/or trailing invocation. / 前沿和/或后沿调用的可选配置
 * @param options.leading - Specify invoking the original function on the leading edge of the throttle. Default is `false`. / 指定是否在节流前沿调用原函数，默认为 `false`
 * @param options.trailing - Specify invoking the original function on the trailing edge of the throttle. Default is `true`. / 指定是否在节流后沿调用原函数，默认为 `true`
 * @returns - Throttled function that delays invoking the original function at most once per every `delay` milliseconds. / 返回节流函数，延迟调用原函数，每 `delay` 毫秒最多调用一次
 *
 * @example
 * const throttledFn = throttle((x, y) => {
 *   console.log(x + y);
 * }, 1000, { leading: true });
 *
 * throttledFn(1, 2); // logs 3 immediately
 * throttledFn(3, 4); // not invoked
 * setTimeout(() => throttledFn(5, 6), 2000); // logs 11 after 2 seconds
 *
 */
const throttle = <TArgs extends any[]>(
  fn: (...args: TArgs) => void,
  delay: number,
  options?: {
    leading?: boolean
    trailing?: boolean
  }
): ((...args: TArgs) => void) => {
  console.warn(
    'throttle function is deprecated in eskit and will be removed in next major version. Please use @gvray/adminkit instead.'
  )
  console.warn('eskit 中的 throttle 函数已弃用，将在下个主要版本中移除。请使用 @gvray/adminkit。')

  let timerId: ReturnType<typeof setTimeout> | null = null
  let lastInvokeTime = 0

  const shouldInvokeLeading = options?.leading === true
  const shouldInvokeTrailing = options?.trailing !== false

  return (...args: TArgs) => {
    const now = Date.now()
    const timeSinceLastInvoke = now - lastInvokeTime

    if (shouldInvokeLeading && timeSinceLastInvoke >= delay) {
      lastInvokeTime = now
      fn(...args)
    } else {
      if (shouldInvokeTrailing) {
        if (timerId !== null) {
          clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
          lastInvokeTime = Date.now()
          fn(...args)
        }, delay - timeSinceLastInvoke)
      }
    }
  }
}

export default throttle
