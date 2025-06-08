import { min, max, clamp, isEven, isOdd } from '../src/comparison'

describe('comparison', () => {
  describe('min', () => {
    it('should return the minimum value from an array', () => {
      expect(min([1, 2, 3, 4, 5])).toBe(1)
      expect(min([5, 4, 3, 2, 1])).toBe(1)
      expect(min([-10, 0, 10])).toBe(-10)
      expect(min([42])).toBe(42)
    })

    it('should handle negative numbers', () => {
      expect(min([-5, -1, -10, -3])).toBe(-10)
    })

    it('should handle decimal numbers', () => {
      expect(min([1.5, 2.3, 0.8, 3.1])).toBe(0.8)
    })

    it('should throw error for empty array', () => {
      expect(() => min([])).toThrow('Array cannot be empty / 数组不能为空')
    })
  })

  describe('max', () => {
    it('should return the maximum value from an array', () => {
      expect(max([1, 2, 3, 4, 5])).toBe(5)
      expect(max([5, 4, 3, 2, 1])).toBe(5)
      expect(max([-10, 0, 10])).toBe(10)
      expect(max([42])).toBe(42)
    })

    it('should handle negative numbers', () => {
      expect(max([-5, -1, -10, -3])).toBe(-1)
    })

    it('should handle decimal numbers', () => {
      expect(max([1.5, 2.3, 0.8, 3.1])).toBe(3.1)
    })

    it('should throw error for empty array', () => {
      expect(() => max([])).toThrow('Array cannot be empty / 数组不能为空')
    })
  })

  describe('clamp', () => {
    it('should clamp values within bounds', () => {
      expect(clamp(10, 0, 5)).toBe(5)
      expect(clamp(-10, 0, 5)).toBe(0)
      expect(clamp(3, 0, 5)).toBe(3)
    })

    it('should handle edge cases', () => {
      expect(clamp(0, 0, 5)).toBe(0)
      expect(clamp(5, 0, 5)).toBe(5)
    })

    it('should handle negative bounds', () => {
      expect(clamp(-10, -5, -1)).toBe(-5)
      expect(clamp(0, -5, -1)).toBe(-1)
    })

    it('should throw error when lower > upper', () => {
      expect(() => clamp(3, 5, 1)).toThrow('Lower bound cannot be greater than upper bound / 下边界不能大于上边界')
    })
  })

  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true)
      expect(isEven(0)).toBe(true)
      expect(isEven(-2)).toBe(true)
      expect(isEven(100)).toBe(true)
    })

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false)
      expect(isEven(3)).toBe(false)
      expect(isEven(-1)).toBe(false)
      expect(isEven(99)).toBe(false)
    })
  })

  describe('isOdd', () => {
    it('should return true for odd numbers', () => {
      expect(isOdd(1)).toBe(true)
      expect(isOdd(3)).toBe(true)
      expect(isOdd(-1)).toBe(true)
      expect(isOdd(99)).toBe(true)
    })

    it('should return false for even numbers', () => {
      expect(isOdd(2)).toBe(false)
      expect(isOdd(0)).toBe(false)
      expect(isOdd(-2)).toBe(false)
      expect(isOdd(100)).toBe(false)
    })
  })
})
