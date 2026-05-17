import { factorial, gcd, isPrime, lcm, mode, percentile, randomWeighted } from '../src'

describe('mathkit extended', () => {
  it('mode and percentile', () => {
    expect(mode([1, 2, 2, 3, 3, 3])).toEqual([3])
    expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 90)).toBe(9)
  })

  it('number theory', () => {
    expect(gcd(12, 8)).toBe(4)
    expect(lcm(4, 6)).toBe(12)
    expect(isPrime(7)).toBe(true)
    expect(factorial(5)).toBe(120)
  })

  it('randomWeighted', () => {
    const value = randomWeighted([
      { value: 'a', weight: 1 },
      { value: 'b', weight: 0 }
    ])
    expect(value).toBe('a')
  })
})
