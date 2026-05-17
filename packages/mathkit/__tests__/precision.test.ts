import { ceil, floor, round, toFixed } from '../src/precision'

describe('precision', () => {
  describe('round', () => {
    it('fixes 1.005 rounding', () => {
      expect(round(1.005, 2)).toBe(1.01)
    })

    it('rounds to integer by default', () => {
      expect(round(2.5)).toBe(3)
    })
  })

  describe('ceil', () => {
    it('ceil with decimals', () => {
      expect(ceil(1.001, 2)).toBe(1.01)
    })
  })

  describe('floor', () => {
    it('floor with decimals', () => {
      expect(floor(1.999, 2)).toBe(1.99)
    })
  })

  describe('toFixed', () => {
    it('pads without scientific notation', () => {
      expect(toFixed(0.000001, 8)).toBe('0.00000100')
    })

    it('throws on invalid decimals', () => {
      expect(() => toFixed(1, -1)).toThrow(RangeError)
    })
  })
})
