import { easeOutCubic, linear } from './easing'

export interface AnimateOptions {
  from: number
  to: number
  duration: number
  easing?: (t: number) => number
  onUpdate: (value: number) => void
  onComplete?: () => void
}

export function animate(options: AnimateOptions): () => void {
  const { from, to, duration, easing = easeOutCubic, onUpdate, onComplete } = options
  const start = performance.now()
  let frame = 0
  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / duration)
    onUpdate(from + (to - from) * easing(t))
    if (t < 1) frame = requestAnimationFrame(step)
    else onComplete?.()
  }
  frame = requestAnimationFrame(step)
  return () => cancelAnimationFrame(frame)
}

export interface TweenOptions<T extends Record<string, number>> {
  from: T
  to: T
  duration: number
  onUpdate: (value: T) => void
  easing?: (t: number) => number
}

export function tween<T extends Record<string, number>>(options: TweenOptions<T>): () => void {
  const keys = Object.keys(options.from) as Array<keyof T>
  return animate({
    from: 0,
    to: 1,
    duration: options.duration,
    easing: options.easing ?? linear,
    onUpdate: (progress) => {
      const value = {} as T
      keys.forEach((key) => {
        value[key] = (options.from[key] + (options.to[key] - options.from[key]) * progress) as T[keyof T]
      })
      options.onUpdate(value)
    }
  })
}

export function countUp(target: { textContent: string | null }, options: { from?: number; to: number; duration: number }): () => void {
  const from = options.from ?? 0
  return animate({
    from,
    to: options.to,
    duration: options.duration,
    onUpdate: (value) => {
      if (target.textContent !== null) target.textContent = String(Math.round(value))
    }
  })
}

export function createTimeline(): {
  add: (runner: () => () => void, at: number) => void
  play: () => void
} {
  const tasks: Array<{ at: number; runner: () => () => void }> = []
  return {
    add(runner, at) {
      tasks.push({ at, runner })
    },
    play() {
      tasks
        .sort((a, b) => a.at - b.at)
        .forEach((task) => {
          setTimeout(() => task.runner(), task.at)
        })
    }
  }
}

export function typewriter(target: { textContent: string | null }, text: string, options: { speed?: number } = {}): () => void {
  const speed = options.speed ?? 80
  let index = 0
  const timer = setInterval(() => {
    index += 1
    if (target.textContent !== null) target.textContent = text.slice(0, index)
    if (index >= text.length) clearInterval(timer)
  }, speed)
  return () => clearInterval(timer)
}
