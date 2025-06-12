/**
 * Safely executes a function (sync or async) and returns its result, or null if an error occurs.
 * 安全地执行函数（同步或异步）并返回其结果，如果发生错误则返回 null。
 *
 * @template T - The return type of the function / 函数的返回类型
 * @param fn - The function to execute safely / 要安全执行的函数
 * @returns A Promise that resolves to the function result or null if an error occurs / 返回一个 Promise，解析为函数结果或在发生错误时返回 null
 *
 * @example
 * ```typescript
 * // Synchronous function success case / 同步函数成功情况
 * const result = await tryRun(() => JSON.parse('{"name": "test"}'))
 * console.log(result) // { name: "test" }
 *
 * // Synchronous function error case / 同步函数错误情况
 * const errorResult = await tryRun(() => JSON.parse('invalid json'))
 * console.log(errorResult) // null
 *
 * // Asynchronous function success case / 异步函数成功情况
 * const asyncResult = await tryRun(async () => {
 *   await new Promise(resolve => setTimeout(resolve, 100))
 *   return { data: 'async test' }
 * })
 * console.log(asyncResult) // { data: 'async test' }
 *
 * // Asynchronous function error case / 异步函数错误情况
 * const asyncError = await tryRun(async () => {
 *   throw new Error('async error')
 * })
 * console.log(asyncError) // null
 *
 * // With calculation / 计算示例
 * const calc = await tryRun(() => 10 / 2)
 * console.log(calc) // 5
 * ```
 */
function tryRun<T>(fn: () => T | Promise<T>): Promise<T | null> {
  try {
    const result = fn()
    return Promise.resolve(result).catch(() => null)
  } catch {
    return Promise.resolve(null)
  }
}

export default tryRun
