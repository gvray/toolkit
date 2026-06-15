/**
 * Races multiple promises and returns the first resolved value, or fallback if all reject.
 * 竞争多个 Promise，返回第一个 resolve 的值，若全部失败则返回 fallback。
 *
 * @example
 * const result = await raceWithFallback([Promise.resolve('first'), new Promise(() => {})], 'fallback', 50)
 * result // => 'first'
 * @since 1.0.0
 */
export async function raceWithFallback<T>(promises: Array<Promise<T>>, fallback: T): Promise<T> {
  if (promises.length === 0) return fallback;

  return new Promise<T>((resolve) => {
    let rejectedCount = 0;

    promises.forEach((promise) => {
      promise.then(resolve, () => {
        rejectedCount += 1;
        if (rejectedCount === promises.length) {
          resolve(fallback);
        }
      });
    });
  });
}

/**
 * Creates a group of AbortControllers that can all be aborted at once.
 * 创建一组可统一取消的 AbortController。
 *
 * @example
 * const group = createAbortGroup()
 * const signal = group.add()
 * signal.aborted // => false
 * group.abortAll()
 * signal.aborted // => true
 * @since 1.0.0
 */
export function createAbortGroup(): {
  add: (controller?: AbortController) => AbortSignal;
  abortAll: () => void;
} {
  const controllers = new Set<AbortController>();
  return {
    add(controller = new AbortController()) {
      controllers.add(controller);
      return controller.signal;
    },
    abortAll() {
      controllers.forEach((controller) => controller.abort());
      controllers.clear();
    },
  };
}
