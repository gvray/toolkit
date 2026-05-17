export type EventHandler<T = unknown> = (data: T) => void

export interface EventBusOptions {
  maxListeners?: number
  debug?: boolean
}

/**
 * Type-safe event bus.
 * 类型安全事件总线。
 */
export class EventBus<TEvents extends Record<string, unknown> = Record<string, unknown>> {
  private events = new Map<string, Set<EventHandler>>()
  private maxListeners: number
  private debug: boolean

  constructor(options: EventBusOptions = {}) {
    this.maxListeners = options.maxListeners ?? 10
    this.debug = options.debug ?? false
  }

  on<K extends keyof TEvents & string>(event: K, handler: EventHandler<TEvents[K]>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    const handlers = this.events.get(event)!
    if (handlers.size >= this.maxListeners) {
      console.warn(`EventBus: max listeners exceeded for "${event}"`)
    }
    handlers.add(handler as EventHandler)
    return () => this.off(event, handler as EventHandler)
  }

  once<K extends keyof TEvents & string>(event: K, handler: EventHandler<TEvents[K]>): () => void {
    const wrapper: EventHandler = (data) => {
      handler(data as TEvents[K])
      this.off(event, wrapper)
    }
    return this.on(event, wrapper as EventHandler<TEvents[K]>)
  }

  off(event: string, handler?: EventHandler): void {
    const handlers = this.events.get(event)
    if (!handlers) return
    if (handler) {
      handlers.delete(handler)
      if (handlers.size === 0) this.events.delete(event)
    } else {
      this.events.delete(event)
    }
  }

  emit<K extends keyof TEvents & string>(event: K, data: TEvents[K]): void {
    const handlers = this.events.get(event)
    if (!handlers) return
    handlers.forEach((handler) => handler(data))
    if (this.debug) {
      console.log(`EventBus emit: ${event}`)
    }
  }

  clear(): void {
    this.events.clear()
  }
}

export const eventBus = new EventBus()
