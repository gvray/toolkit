import { getLocalTimezone, getTimezoneOffset, toTimezone } from '../src/timezone'

describe('getLocalTimezone', () => {
  it('returns a non-empty string', () => {
    const tz = getLocalTimezone()
    expect(typeof tz).toBe('string')
    expect(tz.length).toBeGreaterThan(0)
  })
})

describe('getTimezoneOffset', () => {
  it('returns numeric offset for a date', () => {
    const d = new Date()
    expect(typeof getTimezoneOffset(d)).toBe('number')
  })
})

describe('toTimezone', () => {
  it('returns a Date', () => {
    const d = new Date('2026-05-08T12:00:00Z')
    const z = toTimezone(d, 'UTC')
    expect(z instanceof Date).toBe(true)
  })
})
