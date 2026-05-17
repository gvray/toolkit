import { degToRad, distance, lerp, radToDeg } from '../src/geometry'

describe('geometry', () => {
  it('lerp', () => {
    expect(lerp(0, 100, 0.5)).toBe(50)
  })

  it('distance 2D', () => {
    expect(distance([0, 0], [3, 4])).toBe(5)
  })

  it('degToRad / radToDeg', () => {
    expect(radToDeg(Math.PI)).toBeCloseTo(180)
    expect(degToRad(180)).toBeCloseTo(Math.PI)
  })

  it('throws on mismatched coordinates', () => {
    expect(() => distance([0], [0, 1])).toThrow()
  })
})
