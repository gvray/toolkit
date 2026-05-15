import { assertValidDate, isValid } from '../src/validate'

describe('assertValidDate', () => {
  it('throws for invalid', () => {
    expect(() => assertValidDate(new Date(NaN))).toThrow(RangeError)
  })

  it('does not throw for valid', () => {
    expect(() => assertValidDate(new Date())).not.toThrow()
  })
})

describe('isValid', () => {
  it('false for Invalid Date', () => {
    expect(isValid(new Date('invalid'))).toBe(false)
  })

  it('true for valid', () => {
    expect(isValid(new Date())).toBe(true)
  })
})
