export const linear = (t: number): number => t
export const easeInSine = (t: number): number => 1 - Math.cos((t * Math.PI) / 2)
export const easeOutSine = (t: number): number => Math.sin((t * Math.PI) / 2)
export const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2
export const easeInQuad = (t: number): number => t * t
export const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t)
export const easeInOutQuad = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
export const easeInCubic = (t: number): number => t * t * t
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeInElastic = (t: number): number => (t === 0 || t === 1 ? t : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)))
export const easeOutElastic = (t: number): number => (t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1)
export const easeInBounce = (t: number): number => 1 - easeOutBounce(1 - t)
export const easeOutBounce = (t: number): number => {
  const n1 = 7.5625
  const d1 = 2.75
  if (t < 1 / d1) return n1 * t * t
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
  return n1 * (t -= 2.625 / d1) * t + 0.984375
}

export const spring =
  ({ stiffness = 100, damping = 10 }: { stiffness?: number; damping?: number } = {}) =>
  (t: number): number => {
    const w = Math.sqrt(stiffness)
    const z = damping / (2 * Math.sqrt(stiffness))
    if (z < 1) {
      const wd = w * Math.sqrt(1 - z * z)
      return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w * Math.sin(wd * t)) / wd)
    }
    return 1 - Math.exp(-w * t) * (1 + w * t)
  }
