export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

/**
 * Creates a deferred promise with externally accessible resolve and reject.
 * 创建一个可从外部 resolve/reject 的延迟 Promise。
 *
 * @example
 * const d = deferred()
 * d.resolve('hello')
 * const value = await d.promise
 * value // => 'hello'
 * const d2 = deferred()
 * d2.reject(new Error('failed'))
 * try { await d2.promise } catch (e) { console.log(e.message) } // => 'failed'
 * @since 1.0.0
 */
export function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
