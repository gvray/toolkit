/**
 * Safely executes a synchronous function and returns its result, or null if an error occurs.
 * 安全地执行同步函数并返回其结果，如果发生错误则返回 null。
 *
 * This function provides a safe way to execute functions that might throw errors,
 * returning null instead of letting the error propagate.
 * 此函数提供了一种安全执行可能抛出错误的函数的方式，在发生错误时返回 null 而不是让错误传播。
 *
 * @template T - The return type of the function / 函数的返回类型
 * @param fn - The synchronous function to execute safely / 要安全执行的同步函数
 * @returns The result of the function or null if an error occurs / 函数的结果，或在发生错误时返回 null
 *
 * @example
 * ```typescript
 * // Success case / 成功情况
 * const result = tryRunSync(() => {
 *   return JSON.parse('{"name": "test"}')
 * })
 * console.log(result) // { name: "test" }
 *
 * // Error case / 错误情况
 * const errorResult = tryRunSync(() => {
 *   return JSON.parse('invalid json')
 * })
 * console.log(errorResult) // null
 *
 * // With complex operations / 复杂操作示例
 * const complexResult = tryRunSync(() => {
 *   const data = JSON.parse('{"values": [1, 2, 3]}')
 *   return data.values.reduce((sum, val) => sum + val, 0)
 * })
 * console.log(complexResult) // 6
 *
 * // Error in complex operations / 复杂操作中的错误
 * const complexError = tryRunSync(() => {
 *   const data = JSON.parse('invalid json')
 *   return data.values.reduce((sum, val) => sum + val, 0)
 * })
 * console.log(complexError) // null
 *
 * // Working with different return types / 处理不同返回类型
 * const numberResult = tryRunSync(() => 42)
 * const stringResult = tryRunSync(() => "hello")
 * const booleanResult = tryRunSync(() => true)
 * const objectResult = tryRunSync(() => ({ id: 1, name: "test" }))
 * ```
 */
function tryRunSync<T>(fn: () => T): T | null {
  try {
    return fn()
  } catch {
    return null
  }
}

export default tryRunSync
