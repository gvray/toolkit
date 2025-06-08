import { range, repeat, fibonacci, arithmeticSequence, geometricSequence } from '../src/sequence'

describe('sequence', () => {
  describe('range', () => {
    it('should create ascending range', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
      expect(range(1, 4)).toEqual([1, 2, 3])
    })

    it('should create range with custom step', () => {
      expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9])
      expect(range(0, 12, 3)).toEqual([0, 3, 6, 9])
    })

    it('should create descending range', () => {
      expect(range(10, 0, -2)).toEqual([10, 8, 6, 4, 2])
      expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1])
    })

    it('should handle same start and end', () => {
      expect(range(5, 5)).toEqual([])
    })

    it('should handle negative numbers', () => {
      expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2])
    })

    it('should throw error for zero step', () => {
      expect(() => range(0, 5, 0)).toThrow('Step cannot be zero / 步长不能为零')
    })
  })

  describe('repeat', () => {
    it('should repeat numbers', () => {
      expect(repeat(0, 5)).toEqual([0, 0, 0, 0, 0])
      expect(repeat(42, 3)).toEqual([42, 42, 42])
    })

    it('should repeat strings', () => {
      expect(repeat('hello', 3)).toEqual(['hello', 'hello', 'hello'])
    })

    it('should repeat booleans', () => {
      expect(repeat(true, 2)).toEqual([true, true])
    })

    it('should handle zero count', () => {
      expect(repeat('test', 0)).toEqual([])
    })

    it('should throw error for negative count', () => {
      expect(() => repeat(1, -1)).toThrow('Count cannot be negative / 计数不能为负数')
    })
  })

  describe('fibonacci', () => {
    it('should generate fibonacci sequence', () => {
      expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
      expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3])
    })

    it('should handle edge cases', () => {
      expect(fibonacci(0)).toEqual([])
      expect(fibonacci(1)).toEqual([0])
      expect(fibonacci(2)).toEqual([0, 1])
    })

    it('should throw error for negative input', () => {
      expect(() => fibonacci(-1)).toThrow('Number of terms cannot be negative / 项数不能为负数')
    })
  })

  describe('arithmeticSequence', () => {
    it('should generate arithmetic sequence', () => {
      expect(arithmeticSequence(2, 3, 5)).toEqual([2, 5, 8, 11, 14])
      expect(arithmeticSequence(10, -2, 6)).toEqual([10, 8, 6, 4, 2, 0])
    })

    it('should handle zero difference', () => {
      expect(arithmeticSequence(5, 0, 4)).toEqual([5, 5, 5, 5])
    })

    it('should handle single term', () => {
      expect(arithmeticSequence(10, 3, 1)).toEqual([10])
    })

    it('should handle zero terms', () => {
      expect(arithmeticSequence(5, 2, 0)).toEqual([])
    })

    it('should throw error for negative terms', () => {
      expect(() => arithmeticSequence(1, 2, -1)).toThrow('Number of terms cannot be negative / 项数不能为负数')
    })
  })

  describe('geometricSequence', () => {
    it('should generate geometric sequence', () => {
      expect(geometricSequence(2, 3, 5)).toEqual([2, 6, 18, 54, 162])
      expect(geometricSequence(1, 0.5, 4)).toEqual([1, 0.5, 0.25, 0.125])
    })

    it('should handle ratio of 1', () => {
      expect(geometricSequence(5, 1, 4)).toEqual([5, 5, 5, 5])
    })

    it('should handle negative ratio', () => {
      expect(geometricSequence(1, -2, 4)).toEqual([1, -2, 4, -8])
    })

    it('should handle single term', () => {
      expect(geometricSequence(10, 3, 1)).toEqual([10])
    })

    it('should handle zero terms', () => {
      expect(geometricSequence(5, 2, 0)).toEqual([])
    })

    it('should throw error for negative terms', () => {
      expect(() => geometricSequence(1, 2, -1)).toThrow('Number of terms cannot be negative / 项数不能为负数')
    })
  })
})
