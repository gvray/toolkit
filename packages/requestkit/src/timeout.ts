/**
 * Rejects when promise does not settle within ms.
 *
 * @example
 * const result = await timeout(Promise.resolve('ok'), 1000)
 * result // => 'ok'
 * try {
 *   await timeout(new Promise(() => {}), 50)
 * } catch (e) {
 *   e.message // => 'Request timeout'
 * }
 * @since 1.0.0
 */
export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Request timeout')), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}
