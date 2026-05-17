export type LimitFunction = <T>(factory: () => Promise<T>) => Promise<T>

export function pLimit(concurrency: number): LimitFunction {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new RangeError('concurrency must be a positive integer')
  }
  let active = 0
  const queue: Array<() => void> = []

  const next = (): void => {
    active -= 1
    queue.shift()?.()
  }

  return <T>(factory: () => Promise<T>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      const run = (): void => {
        active += 1
        factory().then(
          (value) => {
            next()
            resolve(value)
          },
          (error) => {
            next()
            reject(error)
          }
        )
      }
      if (active < concurrency) run()
      else queue.push(run)
    })
}

export async function serial<T>(factories: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = []
  for (const factory of factories) {
    results.push(await factory())
  }
  return results
}

export async function parallel<T>(promises: Array<Promise<T>>): Promise<Array<PromiseSettledResult<T>>> {
  return Promise.allSettled(promises)
}
