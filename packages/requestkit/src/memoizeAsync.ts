export interface MemoizeAsyncOptions {
  ttl?: number;
}

/**
 * Memoizes an async function, caching results by serialized arguments with optional TTL.
 * 缓存异步函数的结果，支持按参数序列化 key 及可选的 TTL 过期时间。
 *
 * @example
 * let calls = 0
 * const fn = memoizeAsync(async (x) => { calls++; return x * 2 })
 * await fn(5) // => 10
 * await fn(5) // => 10 (cached)
 * calls // => 1
 * @since 1.0.0
 */
export function memoizeAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options: MemoizeAsyncOptions = {}
): (...args: TArgs) => Promise<TResult> {
  const cache = new Map<string, { value: TResult; expires: number }>();
  const { ttl = 0 } = options;

  return async (...args: TArgs): Promise<TResult> => {
    const key = JSON.stringify(args);
    const hit = cache.get(key);
    if (hit && (ttl === 0 || hit.expires > Date.now())) {
      return hit.value;
    }
    const value = await fn(...args);
    cache.set(key, { value, expires: Date.now() + ttl });
    return value;
  };
}
