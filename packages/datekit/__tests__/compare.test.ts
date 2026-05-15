import {
  isAfter,
  isBefore,
  isBetween,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameYear,
  isWeekday,
  isWeekend
} from '../src/compare'

describe('isBetween', () => {
  it('returns true inside inclusive range', () => {
    expect(isBetween(new Date(2026, 4, 10), new Date(2026, 4, 1), new Date(2026, 4, 31))).toBe(true)
  })

  it('works when start and end are reversed', () => {
    expect(isBetween(new Date(2026, 4, 10), new Date(2026, 4, 31), new Date(2026, 4, 1))).toBe(true)
  })

  it('false outside range', () => {
    expect(isBetween(new Date(2026, 5, 1), new Date(2026, 4, 1), new Date(2026, 4, 31))).toBe(false)
  })

  it('inclusive endpoints', () => {
    const lo = new Date(2026, 4, 1)
    const hi = new Date(2026, 4, 31)
    expect(isBetween(lo, lo, hi)).toBe(true)
    expect(isBetween(hi, lo, hi)).toBe(true)
  })
})

describe('isSameDay / Month / Year', () => {
  it('isSameDay ignores clock time', () => {
    expect(isSameDay(new Date(2026, 4, 8, 1), new Date(2026, 4, 8, 23))).toBe(true)
  })

  it('isSameDay false different days', () => {
    expect(isSameDay(new Date(2026, 4, 8), new Date(2026, 4, 9))).toBe(false)
  })

  it('isSameMonth', () => {
    expect(isSameMonth(new Date(2026, 4, 1), new Date(2026, 4, 31))).toBe(true)
    expect(isSameMonth(new Date(2026, 4, 1), new Date(2026, 5, 1))).toBe(false)
  })

  it('isSameYear', () => {
    expect(isSameYear(new Date(2026, 0, 1), new Date(2026, 11, 31))).toBe(true)
    expect(isSameYear(new Date(2026, 0, 1), new Date(2025, 11, 31))).toBe(false)
  })
})

describe('isWeekend / isWeekday', () => {
  it('Saturday and Sunday are weekend', () => {
    expect(isWeekend(new Date(2026, 4, 9))).toBe(true)
    expect(isWeekend(new Date(2026, 4, 10))).toBe(true)
  })

  it('Friday is weekday', () => {
    expect(isWeekday(new Date(2026, 4, 8))).toBe(true)
    expect(isWeekend(new Date(2026, 4, 8))).toBe(false)
  })
})

describe('legacy compare', () => {
  it('isEqual / isBefore / isAfter', () => {
    const a = new Date(2026, 0, 1)
    const b = new Date(2026, 0, 2)
    expect(isEqual(a, new Date(a.getTime()))).toBe(true)
    expect(isBefore(a, b)).toBe(true)
    expect(isAfter(b, a)).toBe(true)
  })
})
