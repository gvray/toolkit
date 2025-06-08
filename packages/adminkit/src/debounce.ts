export interface DebouncedFunction<TArgs extends any[]> {
  (...args: TArgs): void
  cancel(): void
  flush(): void
  pending(): boolean
}

/**
 * Creates a debounced function that waits for the specified delay after the last call before executing.
 * 创建一个防抖函数，在最后一次调用后等待指定延迟时间再执行。
 *
 * @param fn The function to wrap. / 要包装的函数
 * @param delay The delay time (in milliseconds) before the function is executed. / 函数执行前的延迟时间（毫秒）
 * @param immediate Whether to execute the function immediately on the first call. / 是否在第一次调用时立即执行函数
 * @returns The wrapped debounced function. / 包装后的防抖函数
 *
 * @example
 * ```typescript
 * // Basic debounce
 * const debouncedFn = debounce(() => {
 *   console.log('Called after delay!');
 * }, 1000);
 *
 * // With immediate execution
 * const immediateDebounced = debounce(() => {
 *   console.log('Called immediately!');
 * }, 1000, true);
 *
 * // Search input example
 * const searchDebounced = debounce((query: string) => {
 *   performSearch(query);
 * }, 300);
 *
 * // Cancel if needed
 * searchDebounced('hello');
 * searchDebounced.cancel(); // Cancels the pending call
 *
 * // Force execution
 * searchDebounced('world');
 * searchDebounced.flush(); // Executes immediately
 * ```
 */
export function debounce<TArgs extends any[]>(
  fn: (...args: TArgs) => void,
  delay: number,
  immediate?: boolean
): DebouncedFunction<TArgs> {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: TArgs | undefined
  let result: any

  const debounced = (...args: TArgs): void => {
    lastArgs = args

    const later = () => {
      timeout = null
      if (!immediate) {
        result = fn(...args)
      }
    }

    const shouldCallNow = immediate && timeout === null

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, delay)

    if (shouldCallNow) {
      result = fn(...args)
    }
  }

  /**
   * Cancels the debouncing, so that the debounced function no longer waits and does not execute.
   * 取消防抖，使防抖函数不再等待且不执行。
   */
  debounced.cancel = (): void => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  /**
   * Immediately executes the debounced function with the last arguments.
   * 立即执行防抖函数，使用最后的参数。
   */
  debounced.flush = (): void => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
      if (lastArgs) {
        result = fn(...lastArgs)
      }
    }
  }

  /**
   * Checks if the debounced function is pending execution.
   * 检查防抖函数是否正在等待执行。
   */
  debounced.pending = (): boolean => {
    return timeout !== null
  }

  return debounced as DebouncedFunction<TArgs>
}
