import { randomInt, randomFloat, shuffle, randomBoolean, randomChoice } from '../src/random'

describe('random', () => {
  describe('randomInt', () => {
    it('should generate integers within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomInt(1, 10)
        expect(result).toBeGreaterThanOrEqual(1)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })

    it('should handle negative ranges', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomInt(-5, 5)
        expect(result).toBeGreaterThanOrEqual(-5)
        expect(result).toBeLessThanOrEqual(5)
        expect(Number.isInteger(result)).toBe(true)
      }
    })

    it('should handle single value range', () => {
      expect(randomInt(5, 5)).toBe(5)
    })

    it('should throw error when min > max', () => {
      expect(() => randomInt(10, 5)).toThrow('Min value cannot be greater than max value / 最小值不能大于最大值')
    })
  })

  describe('randomFloat', () => {
    it('should generate floats within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomFloat(0, 1)
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(1)
      }
    })

    it('should respect precision parameter', () => {
      const result = randomFloat(0, 1, 3)
      const decimalPlaces = (result.toString().split('.')[1] || '').length
      expect(decimalPlaces).toBeLessThanOrEqual(3)
    })

    it('should handle negative ranges', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomFloat(-10, 10, 2)
        expect(result).toBeGreaterThanOrEqual(-10)
        expect(result).toBeLessThanOrEqual(10)
      }
    })

    it('should throw error when min > max', () => {
      expect(() => randomFloat(10, 5)).toThrow('Min value cannot be greater than max value / 最小值不能大于最大值')
    })
  })

  describe('shuffle', () => {
    it('should return array with same length', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffle(original)
      expect(shuffled.length).toBe(original.length)
    })

    it('should contain all original elements', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffle(original)

      original.forEach((item) => {
        expect(shuffled).toContain(item)
      })
    })

    it('should not modify original array', () => {
      const original = [1, 2, 3, 4, 5]
      const originalCopy = [...original]
      shuffle(original)
      expect(original).toEqual(originalCopy)
    })

    it('should handle empty array', () => {
      expect(shuffle([])).toEqual([])
    })

    it('should handle single element array', () => {
      expect(shuffle([42])).toEqual([42])
    })

    it('should work with different types', () => {
      const strings = ['a', 'b', 'c']
      const shuffled = shuffle(strings)
      expect(shuffled.length).toBe(3)
      strings.forEach((item) => {
        expect(shuffled).toContain(item)
      })
    })
  })

  describe('randomBoolean', () => {
    it('should return boolean values', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomBoolean()
        expect(typeof result).toBe('boolean')
      }
    })

    it('should respect probability parameter', () => {
      // Test with 0 probability - should always return false
      for (let i = 0; i < 10; i++) {
        expect(randomBoolean(0)).toBe(false)
      }

      // Test with 1 probability - should always return true
      for (let i = 0; i < 10; i++) {
        expect(randomBoolean(1)).toBe(true)
      }
    })

    it('should throw error for invalid probability', () => {
      expect(() => randomBoolean(-0.1)).toThrow('Probability must be between 0 and 1 / 概率必须在0和1之间')
      expect(() => randomBoolean(1.1)).toThrow('Probability must be between 0 and 1 / 概率必须在0和1之间')
    })
  })

  describe('randomChoice', () => {
    it('should return element from array', () => {
      const array = [1, 2, 3, 4, 5]
      for (let i = 0; i < 50; i++) {
        const choice = randomChoice(array)
        expect(array).toContain(choice)
      }
    })

    it('should work with different types', () => {
      const strings = ['apple', 'banana', 'orange']
      const choice = randomChoice(strings)
      expect(strings).toContain(choice)
    })

    it('should handle single element array', () => {
      expect(randomChoice([42])).toBe(42)
    })

    it('should throw error for empty array', () => {
      expect(() => randomChoice([])).toThrow('Array cannot be empty / 数组不能为空')
    })
  })
})
