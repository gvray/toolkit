import { add, subtract, multiply, divide } from '../src/arithmetic'

describe('arithmetic', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(0.1, 0.2)).toBe(0.3)
      expect(add(123.456, 78.9)).toBe(202.356)
    })

    it('should handle negative numbers', () => {
      expect(add(-5, 3)).toBe(-2)
      expect(add(-5, -3)).toBe(-8)
    })

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5)
      expect(add(5, 0)).toBe(5)
    })
  })

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(0.3, 0.1)).toBe(0.2)
      expect(subtract(123.456, 23.45)).toBe(100.006)
    })

    it('should handle negative results', () => {
      expect(subtract(3, 5)).toBe(-2)
    })
  })

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(0.1, 0.2)).toBe(0.02)
      expect(multiply(1.23, 4.56)).toBe(5.6088)
    })

    it('should handle zero', () => {
      expect(multiply(5, 0)).toBe(0)
      expect(multiply(0, 5)).toBe(0)
    })
  })

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(0.3, 0.1)).toBe(3)
      expect(divide(10, 2)).toBe(5)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed')
    })
  })
})
