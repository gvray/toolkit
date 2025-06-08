export type EventHandler<T = any> = (data: T) => void

export interface EventBusOptions {
  maxListeners?: number
  debug?: boolean
}

/**
 * Simple event bus for component communication.
 * 简单的事件总线，用于组件间通信。
 */
export class EventBus {
  private events: Map<string, Set<EventHandler>> = new Map()
  private maxListeners: number
  private debug: boolean

  constructor(options: EventBusOptions = {}) {
    this.maxListeners = options.maxListeners || 10
    this.debug = options.debug || false
  }

  /**
   * Subscribe to an event.
   * 订阅事件。
   */
  on<T = any>(event: string, handler: EventHandler<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }

    const handlers = this.events.get(event)!

    if (handlers.size >= this.maxListeners) {
      console.warn(`EventBus: Maximum listeners (${this.maxListeners}) exceeded for event "${event}"`)
    }

    handlers.add(handler)

    if (this.debug) {
      console.log(`EventBus: Subscribed to "${event}". Total listeners: ${handlers.size}`)
    }

    // Return unsubscribe function / 返回取消订阅函数
    return () => this.off(event, handler)
  }

  /**
   * Subscribe to an event that will only be called once.
   * 订阅只会被调用一次的事件。
   */
  once<T = any>(event: string, handler: EventHandler<T>): () => void {
    const onceHandler: EventHandler<T> = (data: T) => {
      handler(data)
      this.off(event, onceHandler)
    }

    return this.on(event, onceHandler)
  }

  /**
   * Unsubscribe from an event.
   * 取消订阅事件。
   */
  off<T = any>(event: string, handler?: EventHandler<T>): void {
    const handlers = this.events.get(event)
    if (!handlers) return

    if (handler) {
      handlers.delete(handler)
      if (this.debug) {
        console.log(`EventBus: Unsubscribed from "${event}". Remaining listeners: ${handlers.size}`)
      }

      if (handlers.size === 0) {
        this.events.delete(event)
      }
    } else {
      // Remove all handlers for this event / 移除这个事件的所有处理器
      this.events.delete(event)
      if (this.debug) {
        console.log(`EventBus: Removed all listeners for "${event}"`)
      }
    }
  }

  /**
   * Emit an event to all subscribers.
   * 向所有订阅者发出事件。
   */
  emit<T = any>(event: string, data?: T): boolean {
    const handlers = this.events.get(event)
    if (!handlers || handlers.size === 0) {
      if (this.debug) {
        console.log(`EventBus: No listeners for event "${event}"`)
      }
      return false
    }

    if (this.debug) {
      console.log(`EventBus: Emitting "${event}" to ${handlers.size} listeners`, data)
    }

    handlers.forEach((handler) => {
      try {
        handler(data)
      } catch (error) {
        console.error(`EventBus: Error in handler for event "${event}":`, error)
      }
    })

    return true
  }

  /**
   * Get the number of listeners for an event.
   * 获取事件的监听器数量。
   */
  listenerCount(event: string): number {
    const handlers = this.events.get(event)
    return handlers ? handlers.size : 0
  }

  /**
   * Get all event names that have listeners.
   * 获取所有有监听器的事件名称。
   */
  eventNames(): string[] {
    return Array.from(this.events.keys())
  }

  /**
   * Remove all event listeners.
   * 移除所有事件监听器。
   */
  clear(): void {
    this.events.clear()
    if (this.debug) {
      console.log('EventBus: All events cleared')
    }
  }

  /**
   * Check if an event has any listeners.
   * 检查事件是否有任何监听器。
   */
  hasListeners(event: string): boolean {
    return this.listenerCount(event) > 0
  }
}

// Global event bus instance / 全局事件总线实例
export const eventBus = new EventBus()
