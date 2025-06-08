/**
 * Creates a promise that resolves after the specified number of milliseconds.
 * 创建一个在指定毫秒数后解析的Promise。
 *
 * This function is useful for adding delays in async functions or creating
 * timeouts in your code. It's a promisified version of setTimeout.
 * 此函数对于在异步函数中添加延迟或在代码中创建超时很有用。
 * 它是setTimeout的Promise版本。
 *
 * @param ms - The number of milliseconds to wait / 等待的毫秒数
 * @returns A promise that resolves after the specified time / 在指定时间后解析的Promise
 *
 * @example
 * ```typescript
 * // Basic usage / 基本用法
 * console.log('Start')
 * await sleep(2000) // Wait 2 seconds
 * console.log('End')
 *
 * // In a loop with delays / 在循环中使用延迟
 * for (let i = 0; i < 5; i++) {
 *   console.log(`Step ${i}`)
 *   await sleep(1000) // Wait 1 second between steps
 * }
 *
 * // Timeout simulation / 超时模拟
 * const fetchWithTimeout = async () => {
 *   const timeoutPromise = sleep(5000).then(() => {
 *     throw new Error('Timeout')
 *   })
 *
 *   const dataPromise = fetch('/api/data')
 *
 *   return Promise.race([dataPromise, timeoutPromise])
 * }
 * ```
 *
 * @since 1.0.0
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default sleep
