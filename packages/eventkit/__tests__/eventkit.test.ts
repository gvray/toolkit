import { EventBus, EventEmitter, createPubSub, createSignal, eventBus, tinyBus } from '../src'

describe('eventkit', () => {
  it('EventBus', () => {
    const bus = new EventBus<{ ping: { id: number } }>()
    const values: number[] = []
    bus.on('ping', (data) => values.push(data.id))
    bus.emit('ping', { id: 1 })
    expect(values).toEqual([1])
  })

  it('eventBus singleton', () => {
    expect(eventBus).toBeInstanceOf(EventBus)
  })

  it('EventEmitter', () => {
    const emitter = new EventEmitter()
    let hit = 0
    emitter.addListener('x', () => {
      hit += 1
    })
    emitter.emit('x', null)
    expect(hit).toBe(1)
  })

  it('createSignal', () => {
    const [get, set] = createSignal(1)
    expect(get()).toBe(1)
    set(2)
    expect(get()).toBe(2)
  })

  it('createPubSub and tinyBus', () => {
    const pubsub = createPubSub<'news'>()
    let payload = ''
    pubsub.subscribe('news', (p) => {
      payload = String(p)
    })
    pubsub.publish('news', 'hello')
    expect(payload).toBe('hello')

    const bus = tinyBus()
    bus.on('x', (p) => {
      payload = String(p)
    })
    bus.emit('x', 'ok')
    expect(payload).toBe('ok')
  })
})
