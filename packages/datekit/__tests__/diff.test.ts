import { diff } from '../src/diff'

describe('diff', () => {
  it('calendar days', () => {
    const a = new Date(2026, 4, 1)
    const b = new Date(2026, 4, 8)
    expect(diff(a, b, 'days')).toBe(7)
    expect(diff(b, a, 'days')).toBe(-7)
  })

  it('milliseconds', () => {
    const a = new Date(2026, 0, 1, 0, 0, 0, 0)
    const b = new Date(2026, 0, 1, 0, 0, 1, 500)
    expect(diff(a, b, 'milliseconds')).toBe(1500)
  })

  it('seconds and minutes', () => {
    const a = new Date(2026, 0, 1, 0, 0, 0, 0)
    const b = new Date(2026, 0, 1, 0, 3, 45, 0)
    expect(diff(a, b, 'seconds')).toBe(225)
    expect(diff(a, b, 'minutes')).toBe(3)
  })

  it('hours truncates toward zero', () => {
    const a = new Date(2026, 0, 1, 0, 0, 0)
    const b = new Date(2026, 0, 1, 2, 30, 0)
    expect(diff(a, b, 'hours')).toBe(2)
  })

  it('calendar months', () => {
    expect(diff(new Date(2026, 0, 31), new Date(2026, 1, 1), 'months')).toBe(1)
  })

  it('calendar years', () => {
    expect(diff(new Date(2025, 11, 31), new Date(2026, 0, 1), 'years')).toBe(1)
  })

  it('calendar weeks between aligned Mondays', () => {
    const a = new Date(2026, 4, 4)
    const b = new Date(2026, 4, 11)
    expect(diff(a, b, 'weeks')).toBe(1)
  })

  it('throws on invalid', () => {
    expect(() => diff(new Date(NaN), new Date(), 'days')).toThrow(RangeError)
  })
})
