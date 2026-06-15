export interface PollingOptions<T> {
  interval?: number;
  until?: (value: T) => boolean;
  maxAttempts?: number;
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Repeatedly calls a factory on an interval. Returns a stop function for interval mode,
 * or waits for a matching result when PollingOptions are passed.
 * 按间隔反复调用工厂函数；传入 PollingOptions 时等待匹配结果。
 *
 * @example
 * let count = 0
 * const stop = polling(async () => {
 *   count++
 *   console.log('poll:', count)
 *   if (count >= 3) stop()
 * }, 100)
 * typeof stop // => 'function'
 * @since 1.0.0
 */
export function polling(factory: () => Promise<unknown>, interval?: number): () => void;
export function polling<T>(factory: () => Promise<T>, options: PollingOptions<T>): Promise<T>;
export function polling<T>(
  factory: () => Promise<T>,
  intervalOrOptions: number | PollingOptions<T> = 1000
): (() => void) | Promise<T> {
  if (typeof intervalOrOptions === 'object') {
    const { interval = 1000, until = () => true, maxAttempts = Infinity } = intervalOrOptions;
    return (async () => {
      let attempts = 0;
      while (attempts < maxAttempts) {
        attempts += 1;
        const value = await factory();
        if (until(value)) return value;
        if (attempts < maxAttempts) await sleep(interval);
      }
      throw new Error('Polling exceeded maximum attempts');
    })();
  }

  let active = true;
  const interval = intervalOrOptions;
  const run = async (): Promise<void> => {
    while (active) {
      try {
        await factory();
      } catch {
        // Keep interval polling alive after transient failures.
      }
      if (active) await sleep(interval);
    }
  };
  run();
  return () => {
    active = false;
  };
}
