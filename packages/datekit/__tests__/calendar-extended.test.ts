import { dayOfYear, weekOfYear } from '../src/calendar'

describe('calendar extended', () => {
  it('weekOfYear and dayOfYear', () => {
    const date = new Date(2026, 4, 8)
    expect(weekOfYear(date)).toBeGreaterThan(0)
    expect(dayOfYear(date)).toBeGreaterThan(0)
  })
})
