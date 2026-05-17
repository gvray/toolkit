export interface RetryOptions {
  times?: number
  delay?: number
  backoff?: number
  shouldRetry?: (error: unknown, attempt: number) => boolean
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Retries an async factory on failure.
 */
export async function retry<T>(factory: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { times = 3, delay = 0, backoff = 1, shouldRetry = () => true } = options
  let attempt = 0
  let wait = delay
  while (true) {
    try {
      return await factory()
    } catch (error) {
      attempt += 1
      if (attempt >= times || !shouldRetry(error, attempt)) {
        throw error
      }
      if (wait > 0) await sleep(wait)
      wait *= backoff
    }
  }
}
