import isDate from '../src/isDate'

describe('isDate', () => {
  test('should return true for Date instances', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2024-01-01'))).toBe(true)
    expect(isDate(new Date(2024, 0, 1))).toBe(true)
    expect(isDate(new Date(1704067200000))).toBe(true)
  })

  test('should return true for invalid Date instances', () => {
    expect(isDate(new Date('invalid'))).toBe(true)
    expect(isDate(new Date(NaN))).toBe(true)
  })

  test('should return false for date-like values', () => {
    expect(isDate('2024-01-01')).toBe(false)
    expect(isDate(1704067200000)).toBe(false)
    expect(isDate('Mon Jan 01 2024')).toBe(false)
    expect(
      isDate({
        getTime: () => Date.now(),
        toISOString: () => new Date().toISOString()
      })
    ).toBe(false)
  })

  test('should return false for non-dates', () => {
    expect(isDate(null)).toBe(false)
    expect(isDate(undefined)).toBe(false)
    expect(isDate(42)).toBe(false)
    expect(isDate('date')).toBe(false)
    expect(isDate(true)).toBe(false)
    expect(isDate({})).toBe(false)
    expect(isDate([])).toBe(false)
    expect(isDate(() => {})).toBe(false)
    expect(isDate(/date/)).toBe(false)
  })

  test('should handle dates with modified prototypes', () => {
    const date = new Date()
    Object.setPrototypeOf(date, null)
    expect(isDate(date)).toBe(true)
  })

  test('should handle dates in different timezones', () => {
    const date = new Date('2024-01-01T00:00:00Z')
    expect(isDate(date)).toBe(true)

    const dateWithOffset = new Date('2024-01-01T00:00:00+08:00')
    expect(isDate(dateWithOffset)).toBe(true)
  })

  test('should handle extreme date values', () => {
    expect(isDate(new Date(-8640000000000000))).toBe(true) // Minimum date
    expect(isDate(new Date(8640000000000000))).toBe(true) // Maximum date
  })
})
