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
  timeout
} from '../src'

describe('requestkit', () => {
  it('retry succeeds', async () => {
    let count = 0
    const value = await retry(async () => {
      count += 1
      if (count < 2) throw new Error('fail')
      return 'ok'
    }, { times: 3 })
    expect(value).toBe('ok')
  })

  it('timeout rejects', async () => {
    await expect(timeout(new Promise(() => undefined), 10)).rejects.toThrow('Timeout')
  })

  it('polling stops when until matches', async () => {
    let n = 0
    const result = await polling(async () => {
      n += 1
      return n
    }, { interval: 1, until: (v) => v >= 2, maxAttempts: 5 })
    expect(result).toBe(2)
  })

  it('concurrency helpers', async () => {
    const limit = pLimit(1)
    const serialResult = await serial([async () => 1, async () => 2])
    expect(serialResult).toEqual([1, 2])
    const limited = await limit(async () => 3)
    expect(limited).toBe(3)
    const settled = await parallel([Promise.resolve(1), Promise.reject(new Error('x'))])
    expect(settled[0].status).toBe('fulfilled')
  })

  it('deferred and memoize', async () => {
    const d = deferred<number>()
    d.resolve(42)
    await expect(d.promise).resolves.toBe(42)

    const fn = memoizeAsync(async (x: number) => x * 2, { ttl: 1000 })
    expect(await fn(2)).toBe(4)
    expect(await fn(2)).toBe(4)
  })

  it('advanced helpers', async () => {
    await expect(raceWithFallback([Promise.reject(new Error('x'))], 9)).resolves.toBe(9)
    const group = createAbortGroup()
    const controller = new AbortController()
    group.add(controller)
    group.abortAll()
    expect(controller.signal.aborted).toBe(true)
  })
})
