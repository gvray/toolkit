export type LimitFunction = <T>(factory: () => Promise<T> | T) => Promise<T>;

/**
 * Creates a concurrency limiter that allows at most `concurrency` promises to run simultaneously.
 * 创建一个并发限制器，最多同时运行 `concurrency` 个 Promise。
 *
 * @example
 * const limit = pLimit(2)
 * const results = await Promise.all([1, 2, 3].map((n) => limit(() => Promise.resolve(n * 2))))
 * results // => [2, 4, 6]
 * @since 1.0.0
 */
export function pLimit(concurrency: number): LimitFunction {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new RangeError('concurrency must be a positive integer');
  }
  let active = 0;
  const queue: Array<() => void> = [];

  const next = (): void => {
    active -= 1;
    queue.shift()?.();
  };

  return <T>(factory: () => Promise<T> | T): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      const run = (): void => {
        active += 1;
        Promise.resolve().then(factory).then(resolve, reject).finally(next);
      };
      if (active < concurrency) run();
      else queue.push(run);
    });
}

/**
 * Runs an array of async factories one after another, collecting results.
 * 依次运行一组异步工厂函数并收集结果。
 *
 * @example
 * const results = await serial([() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)])
 * results // => [1, 2, 3]
 * @since 1.0.0
 */
export async function serial<T>(factories: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = [];
  for (const factory of factories) {
    results.push(await factory());
  }
  return results;
}

/**
 * Runs all async factories in parallel and returns their resolved values.
 * 并行运行所有异步工厂函数，返回其 resolved 值。
 *
 * @example
 * const results = await parallel([() => Promise.resolve('a'), () => Promise.resolve('b')])
 * results // => ['a', 'b']
 * @since 1.0.0
 */
export async function parallel<T>(
  items: Array<Promise<T>>
): Promise<Array<PromiseSettledResult<T>>>;
export async function parallel<T>(items: Array<() => Promise<T>>): Promise<T[]>;
export async function parallel<T>(
  items: Array<Promise<T> | (() => Promise<T>)>
): Promise<T[] | Array<PromiseSettledResult<T>>> {
  if (items.every((item) => typeof item === 'function')) {
    return Promise.all((items as Array<() => Promise<T>>).map((factory) => factory()));
  }
  return Promise.allSettled(items as Array<Promise<T>>);
}
