import {
  createAbortGroup,
  deferred,
  memoizeAsync,
  parallel,
  pLimit,
  polling,
  raceWithFallback,
  retry,
  serial,
  timeout,
} from '../src';

describe('requestkit', () => {
  it('retry succeeds', async () => {
    let count = 0;
    const value = await retry(
      async () => {
        count += 1;
        if (count < 2) throw new Error('fail');
        return 'ok';
      },
      { times: 3 }
    );
    expect(value).toBe('ok');
  });

  it('retry succeeds with default options', async () => {
    // Call retry without options to hit the default options={} branch
    const value = await retry(async () => 'default-ok');
    expect(value).toBe('default-ok');
  });

  it('retry throws after exhausting attempts', async () => {
    await expect(
      retry(
        async () => {
          throw new Error('always');
        },
        { times: 2 }
      )
    ).rejects.toThrow('always');
  });

  it('retry respects shouldRetry returning false', async () => {
    let count = 0;
    await expect(
      retry(
        async () => {
          count += 1;
          throw new Error('stop me');
        },
        { times: 5, shouldRetry: () => false }
      )
    ).rejects.toThrow('stop me');
    expect(count).toBe(1);
  });

  it('retry uses delay and backoff', async () => {
    jest.useFakeTimers();
    let count = 0;
    const p = retry(
      async () => {
        count += 1;
        if (count < 3) throw new Error('wait');
        return 'done';
      },
      { times: 3, delay: 100, backoff: 2 }
    );
    // advance through the delays (100ms then 200ms with backoff=2)
    jest.runAllTimers();
    jest.runAllTimers();
    jest.runAllTimers();
    jest.useRealTimers();
    const result = await p;
    expect(result).toBe('done');
  });

  it('timeout resolves when promise settles in time', async () => {
    const result = await timeout(Promise.resolve('fast'), 1000);
    expect(result).toBe('fast');
  });

  it('timeout rejects when wrapped promise rejects', async () => {
    await expect(timeout(Promise.reject(new Error('boom')), 1000)).rejects.toThrow('boom');
  });

  it('timeout rejects', async () => {
    await expect(timeout(new Promise(() => undefined), 10)).rejects.toThrow('Request timeout');
  });

  it('polling returns stop function', async () => {
    let n = 0;
    const stop = polling(async () => {
      n += 1;
      if (n >= 2) stop();
    }, 1);
    expect(typeof stop).toBe('function');
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(n).toBeGreaterThanOrEqual(2);
  });

  it('polling uses default interval', async () => {
    // Call polling without providing interval to hit the default=1000 branch
    let called = false;
    const wrapper2 = { stop: () => {} };
    wrapper2.stop = polling(async () => {
      called = true;
      wrapper2.stop();
    });
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(called).toBe(true);
  });

  it('polling stop during interval wait', async () => {
    let n = 0;
    // Use a wrapper object so the reference is resolved at call time
    const wrapper = { stop: () => {} };
    wrapper.stop = polling(async () => {
      n += 1;
      // stop after first call so the if(active) branch at line 20 is hit as false
      wrapper.stop();
    }, 5000);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(n).toBe(1);
  });

  it('concurrency helpers', async () => {
    const limit = pLimit(1);
    const serialResult = await serial([async () => 1, async () => 2]);
    expect(serialResult).toEqual([1, 2]);
    const limited = await limit(async () => 3);
    expect(limited).toBe(3);
    const settled = await parallel([() => Promise.resolve(1), () => Promise.resolve(2)]);
    expect(settled).toEqual([1, 2]);
  });

  it('pLimit throws on invalid concurrency', () => {
    expect(() => pLimit(0)).toThrow(RangeError);
    expect(() => pLimit(-1)).toThrow(RangeError);
    expect(() => pLimit(1.5)).toThrow(RangeError);
  });

  it('pLimit queues when at capacity', async () => {
    const limit = pLimit(1);
    const order: number[] = [];
    const p1 = limit(async () => {
      order.push(1);
      return 1;
    });
    const p2 = limit(async () => {
      order.push(2);
      return 2;
    });
    const p3 = limit(async () => {
      order.push(3);
      return 3;
    });
    const results = await Promise.all([p1, p2, p3]);
    expect(results).toEqual([1, 2, 3]);
    expect(order).toEqual([1, 2, 3]);
  });

  it('pLimit propagates rejection', async () => {
    const limit = pLimit(1);
    await expect(
      limit(async () => {
        throw new Error('limited fail');
      })
    ).rejects.toThrow('limited fail');
  });

  it('pLimit queued task rejection propagates', async () => {
    const limit = pLimit(1);
    // fill the slot
    let resolve1!: () => void;
    const p1 = limit(
      () =>
        new Promise<number>((res) => {
          resolve1 = () => res(1);
        })
    );
    // this one gets queued
    const p2 = limit(async () => {
      throw new Error('queued fail');
    });
    await Promise.resolve();
    resolve1();
    await expect(p1).resolves.toBe(1);
    await expect(p2).rejects.toThrow('queued fail');
  });

  it('pLimit releases the slot when a factory throws synchronously', async () => {
    const limit = pLimit(1);
    const order: number[] = [];

    await expect(
      limit(() => {
        order.push(1);
        throw new Error('sync fail');
      })
    ).rejects.toThrow('sync fail');

    await expect(
      limit(() => {
        order.push(2);
        return 2;
      })
    ).resolves.toBe(2);
    expect(order).toEqual([1, 2]);
  });

  it('deferred and memoize', async () => {
    const d = deferred<number>();
    d.resolve(42);
    await expect(d.promise).resolves.toBe(42);

    const fn = memoizeAsync(async (x: number) => x * 2, { ttl: 1000 });
    expect(await fn(2)).toBe(4);
    expect(await fn(2)).toBe(4);
  });

  it('deferred reject', async () => {
    const d = deferred<number>();
    d.reject(new Error('rejected'));
    await expect(d.promise).rejects.toThrow('rejected');
  });

  it('memoizeAsync respects TTL expiry', async () => {
    jest.useFakeTimers();
    let calls = 0;
    const fn = memoizeAsync(
      async (x: number) => {
        calls++;
        return x * 3;
      },
      { ttl: 100 }
    );
    expect(await fn(5)).toBe(15);
    expect(calls).toBe(1);
    // advance past TTL
    jest.advanceTimersByTime(200);
    expect(await fn(5)).toBe(15);
    expect(calls).toBe(2);
    jest.useRealTimers();
  });

  it('memoizeAsync with no ttl never expires', async () => {
    let calls = 0;
    const fn = memoizeAsync(async (x: number) => {
      calls++;
      return x;
    });
    expect(await fn(7)).toBe(7);
    expect(await fn(7)).toBe(7);
    expect(calls).toBe(1);
  });

  it('advanced helpers', async () => {
    await expect(raceWithFallback([Promise.reject(new Error('x'))], 9)).resolves.toBe(9);
    const group = createAbortGroup();
    const signal = group.add();
    expect(signal.aborted).toBe(false);
    group.abortAll();
    expect(signal.aborted).toBe(true);
  });

  it('raceWithFallback resolves with winner', async () => {
    const result = await raceWithFallback(
      [Promise.resolve('win'), new Promise(() => {})],
      'fallback'
    );
    expect(result).toBe('win');
  });

  it('raceWithFallback waits for a later fulfillment after an early rejection', async () => {
    const result = await raceWithFallback(
      [Promise.reject(new Error('fast')), Promise.resolve('late win')],
      'fallback'
    );
    expect(result).toBe('late win');
  });
});
