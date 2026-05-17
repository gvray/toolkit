export interface PubSub<Topic extends string = string> {
  subscribe: (topic: Topic, handler: (payload: unknown) => void) => () => void
  publish: (topic: Topic, payload: unknown) => void
}

/**
 * Pub/sub factory.
 * 发布订阅工厂。
 */
export function createPubSub<Topic extends string = string>(): PubSub<Topic> {
  const map = new Map<Topic, Set<(payload: unknown) => void>>()

  return {
    subscribe(topic, handler) {
      if (!map.has(topic)) map.set(topic, new Set())
      map.get(topic)!.add(handler)
      return () => map.get(topic)?.delete(handler)
    },
    publish(topic, payload) {
      map.get(topic)?.forEach((handler) => handler(payload))
    }
  }
}
