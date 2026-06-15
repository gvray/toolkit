/**
 * Iterates over an array during browser idle time to avoid blocking the main thread.
 * 在浏览器空闲时间迭代数组，避免阻塞主线程。
 *
 * @param array - The array to iterate over / 要迭代的数组
 * @param callbackfn - Function to execute on each item / 对每个项目执行的函数
 *
 * @example
 * // Runs callbacks during browser idle time — output is deferred, not immediate
 * const items = [1, 2, 3]
 * idleIterator(items, (item, index) => {
 *   console.log(index, item)
 * })
 *
 * @since 1.0.0
 */
const idleIterator = <T>(array: T[], callbackfn: (item: T, index: number) => void): void => {
  let index = 0;
  const iterator = () => {
    const start = Date.now();
    while (index < array.length && Date.now() - start < 16) {
      callbackfn(array[index], index);
      index++;
    }
    if (index >= array.length) return;
    requestIdleCallback(iterator);
  };
  requestIdleCallback(iterator);
};

export default idleIterator;
