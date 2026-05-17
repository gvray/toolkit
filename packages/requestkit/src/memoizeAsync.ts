export interface MemoizeAsyncOptions {
  ttl?: number
}

export function memoizeAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options: MemoizeAsyncOptions = {}
): (...args: TArgs) => Promise<TResult> {
  const cache = new Map<string, { value: TResult; expires: number }>()
  const { ttl = 0 } = options

  return async (...args: TArgs): Promise<TResult> => {
    const key = JSON.stringify(args)
    const hit = cache.get(key)
    if (hit && (ttl === 0 || hit.expires > Date.now())) {
      return hit.value
    }
    const value = await fn(...args)
    cache.set(key, { value, expires: Date.now() + ttl })
    return value
  }
}
