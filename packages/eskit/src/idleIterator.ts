/**
 * Iterates over an array during browser idle time to avoid blocking the main thread.
 * 在浏览器空闲时间迭代数组，避免阻塞主线程。
 *
 * @param array - The array to iterate over / 要迭代的数组
 * @param callbackfn - Function to execute on each item / 对每个项目执行的函数
 *
 * @example
 * ```typescript
 * // Process large dataset without blocking UI
 * const largeDataset = Array.from({ length: 10000 }, (_, i) => i)
 *
 * idleIterator(largeDataset, (item, index) => {
 *   // Perform heavy computation on each item
 *   console.log(`Processing item ${item} at index ${index}`)
 *   // This won't block the UI because it runs during idle time
 * })
 *
 * // Process user data
 * const users = [
 *   { id: 1, name: 'Alice', email: 'alice@example.com' },
 *   { id: 2, name: 'Bob', email: 'bob@example.com' },
 *   // ... thousands more users
 * ]
 *
 * idleIterator(users, (user, index) => {
 *   // Validate email, update UI, etc.
 *   if (user.email.includes('@')) {
 *     console.log(`Valid user: ${user.name}`)
 *   }
 * })
 *
 * // Image processing example
 * const imageUrls = ['img1.jpg', 'img2.jpg'] // ... many more
 *
 * idleIterator(imageUrls, (url, index) => {
 *   // Preload images during idle time
 *   const img = new Image()
 *   img.src = url
 *   console.log('Preloaded image ' + (index + 1) + '/' + imageUrls.length)
 * })
 *
 * // Note: Uses requestIdleCallback for optimal performance
 * // Falls back gracefully if not available in environment
 * ```
 *
 * @since 1.0.0
 */
const idleIterator = <T>(array: T[], callbackfn: (item: T, index: number) => void): void => {
  let index = 0
  const iterator = () => {
    const start = Date.now()
    while (index < array.length && Date.now() - start < 16) {
      callbackfn(array[index], index)
      index++
    }
    if (index >= array.length) return
    requestIdleCallback(iterator)
  }
  requestIdleCallback(iterator)
}

export default idleIterator
