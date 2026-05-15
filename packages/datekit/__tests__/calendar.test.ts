import { calendarMatrix, daysInMonth, quarter } from '../src/calendar'

describe('daysInMonth', () => {
  it('February non-leap', () => {
    expect(daysInMonth(new Date(2026, 1, 1))).toBe(28)
  })

  it('February leap year', () => {
    expect(daysInMonth(new Date(2024, 1, 1))).toBe(29)
  })

  it('April has 30 days', () => {
    expect(daysInMonth(new Date(2026, 3, 1))).toBe(30)
  })
})

describe('quarter', () => {
  it('maps months to 1–4', () => {
    expect(quarter(new Date(2026, 0, 1))).toBe(1)
    expect(quarter(new Date(2026, 4, 8))).toBe(2)
    expect(quarter(new Date(2026, 7, 1))).toBe(3)
    expect(quarter(new Date(2026, 11, 1))).toBe(4)
  })
})

describe('calendarMatrix', () => {
  it('returns 6 by 7', () => {
    const m = calendarMatrix(2026, 5)
    expect(m).toHaveLength(6)
    expect(m[0]).toHaveLength(7)
  })

  it('first cell is Monday startOf week for May 2026', () => {
    const m = calendarMatrix(2026, 5)
    expect(m[0][0].getDay()).toBe(1)
  })

  it('throws on invalid month', () => {
    expect(() => calendarMatrix(2026, 0)).toThrow(RangeError)
    expect(() => calendarMatrix(2026, 13)).toThrow(RangeError)
  })

  it('throws on non-integer year', () => {
    expect(() => calendarMatrix(2026.5 as unknown as number, 5)).toThrow(RangeError)
  })
})
