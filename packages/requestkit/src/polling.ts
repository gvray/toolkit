export interface PollingOptions<T> {
  interval?: number
  until?: (result: T) => boolean
  maxAttempts?: number
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export async function polling<T>(factory: () => Promise<T>, options: PollingOptions<T> = {}): Promise<T> {
  const { interval = 1000, until = () => true, maxAttempts = 100 } = options
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await factory()
    if (until(result)) return result
    await sleep(interval)
  }
  throw new Error('polling exceeded max attempts')
}
