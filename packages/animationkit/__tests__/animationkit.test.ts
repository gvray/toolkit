import {
  animate,
  countUp,
  createTimeline,
  easeInCubic,
  easeOutBounce,
  linear,
  spring,
  tween,
  typewriter
} from '../src'

describe('animationkit', () => {
  beforeAll(() => {
    global.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now() + 16), 0) as unknown as number
    global.cancelAnimationFrame = (id: number) => clearTimeout(id)
  })

  it('easing functions', () => {
    expect(linear(0.5)).toBe(0.5)
    expect(easeInCubic(0.5)).toBe(0.125)
    expect(easeOutBounce(0.5)).toBeGreaterThan(0)
    expect(spring()(0.5)).toBeGreaterThan(0)
  })

  it('animate and tween', (done) => {
    const cancel = animate({ from: 0, to: 10, duration: 20, onUpdate: () => undefined, onComplete: done })
    expect(typeof cancel).toBe('function')
    tween({ from: { x: 0 }, to: { x: 10 }, duration: 20, onUpdate: () => undefined })
  })

  it('countUp timeline typewriter', () => {
    const el = { textContent: '0' }
    countUp(el, { to: 10, duration: 20 })
    const timeline = createTimeline()
    timeline.add(() => () => undefined, 0)
    timeline.play()
    jest.useFakeTimers()
    const target = { textContent: '' }
    const stop = typewriter(target, 'hi', { speed: 1 })
    jest.advanceTimersByTime(2)
    expect(target.textContent.length).toBeGreaterThan(0)
    stop()
    jest.useRealTimers()
  })
})
