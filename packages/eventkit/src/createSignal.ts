export type Signal<T> = () => T
export type SignalSetter<T> = (value: T | ((prev: T) => T)) => void

/**
 * Minimal reactive signal pair.
 * 极简响应式 signal。
 */
export function createSignal<T>(initial: T): [Signal<T>, SignalSetter<T>] {
  let value = initial
  const subscribers = new Set<(next: T) => void>()

  const get: Signal<T> = () => value
  const set: SignalSetter<T> = (next) => {
    value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
    subscribers.forEach((listener) => listener(value))
  }

  return [get, set]
}
