import { EventBus } from './EventBus'

/**
 * Node-style event emitter for browsers.
 * 浏览器可用的 EventEmitter 风格 API。
 */
export class EventEmitter extends EventBus<Record<string, unknown>> {
  addListener(event: string, handler: (data: unknown) => void): () => void {
    return this.on(event, handler)
  }

  removeListener(event: string, handler?: (data: unknown) => void): void {
    this.off(event, handler)
  }
}
