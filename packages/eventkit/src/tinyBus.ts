export type TinyHandler = (payload?: unknown) => void

export interface TinyBus {
  on: (event: string, handler: TinyHandler) => void
  off: (event: string, handler?: TinyHandler) => void
  emit: (event: string, payload?: unknown) => void
}

/**
 * Minimal mitt-style event bus.
 * 极简 mitt 风格事件总线。
 */
export function tinyBus(): TinyBus {
  const all = new Map<string, TinyHandler[]>()
  return {
    on(type, handler) {
      const list = all.get(type) ?? []
      list.push(handler)
      all.set(type, list)
    },
    off(type, handler) {
      if (!handler) {
        all.delete(type)
        return
      }
      all.set(
        type,
        (all.get(type) ?? []).filter((item) => item !== handler)
      )
    },
    emit(type, payload) {
      ;(all.get(type) ?? []).slice().forEach((handler) => handler(payload))
    }
  }
}
