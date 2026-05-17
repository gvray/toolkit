import { timeAgo } from '../src/relative'

describe('timeAgo', () => {
  const now = Date.now()

  it('just now', () => {
    expect(timeAgo(new Date(now - 30000))).toBe('just now')
    expect(timeAgo(new Date(now - 30000), 'zh-CN')).toBe('刚刚')
  })

  it('minutes ago', () => {
    expect(timeAgo(new Date(now - 120000))).toBe('2 minutes ago')
    expect(timeAgo(new Date(now - 120000), 'zh-CN')).toBe('2分钟前')
  })

  it('hours ago', () => {
    expect(timeAgo(new Date(now - 3600000 * 2))).toBe('2 hours ago')
    expect(timeAgo(new Date(now - 3600000 * 2), 'zh-CN')).toBe('2小时前')
  })

  it('days ago', () => {
    expect(timeAgo(new Date(now - 86400000 * 3))).toBe('3 days ago')
    expect(timeAgo(new Date(now - 86400000 * 3), 'zh-CN')).toBe('3天前')
  })

  it('months ago', () => {
    expect(timeAgo(new Date(now - 2629800000 * 4))).toBe('4 months ago')
  })

  it('years ago', () => {
    expect(timeAgo(new Date(now - 31536000000 * 2))).toBe('2 years ago')
  })
})
