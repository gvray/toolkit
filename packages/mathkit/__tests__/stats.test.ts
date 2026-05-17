import { average, median, stdDev, sum, variance } from '../src/stats'

describe('stats', () => {
  it('sum', () => {
    expect(sum([1, 2, 3, 4])).toBe(10)
    expect(sum([])).toBe(0)
  })

  it('average', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
  })

  it('median odd length', () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3)
  })

  it('median even length', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5)
  })

  it('variance and stdDev', () => {
    const data = [2, 4, 4, 4, 5, 5, 7, 9]
    expect(variance(data)).toBe(4)
    expect(stdDev(data)).toBe(2)
  })

  it('throws on empty array for average', () => {
    expect(() => average([])).toThrow()
  })
})
