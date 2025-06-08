type MemoizeFn = (...args: any[]) => any
/**
 * Creates a memoized version of a function that caches results for identical arguments.
 * 创建函数的记忆化版本，为相同参数缓存结果。
 *
 * The memoized function will cache the result of the first call with specific arguments
 * and return the cached result on subsequent calls with the same arguments.
 * 记忆化函数将缓存第一次调用特定参数的结果，
 * 并在后续使用相同参数调用时返回缓存的结果。
 *
 * @template T - The type of the function to memoize / 要记忆化的函数类型
 * @param fn - The function to be memoized / 要记忆化的函数
 * @returns The memoized function / 记忆化的函数
 *
 * @example
 * ```typescript
 * // Expensive calculation function
 * function fibonacci(n: number): number {
 *   if (n <= 1) return n
 *   return fibonacci(n - 1) + fibonacci(n - 2)
 * }
 *
 * const memoizedFib = memoize(fibonacci)
 *
 * console.log(memoizedFib(40)) // First call - calculates result
 * console.log(memoizedFib(40)) // Second call - returns cached result instantly
 *
 * // Works with multiple arguments
 * const expensiveOperation = (a: string, b: number) => {
 *   console.log('Computing...')
 *   return `${a}-${b * 2}`
 * }
 *
 * const memoized = memoize(expensiveOperation)
 * memoized('test', 5) // Logs "Computing..." and returns "test-10"
 * memoized('test', 5) // Returns "test-10" without logging
 * ```
 *
 * @since 1.0.0
 */
const memoize = <T extends MemoizeFn>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export default memoize
