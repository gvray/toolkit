export async function raceWithFallback<T>(promises: Array<Promise<T>>, fallback: T): Promise<T> {
  try {
    return await Promise.race(promises)
  } catch {
    return fallback
  }
}

export function createAbortGroup(): {
  add: (controller: AbortController) => void
  abortAll: () => void
} {
  const controllers = new Set<AbortController>()
  return {
    add(controller) {
      controllers.add(controller)
    },
    abortAll() {
      controllers.forEach((controller) => controller.abort())
      controllers.clear()
    }
  }
}
