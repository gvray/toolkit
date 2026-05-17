import {
  formatBitrate,
  formatCompact,
  formatCountdown,
  formatCurrency,
  formatDuration,
  formatFileSize,
  formatList,
  formatNumber,
  formatNumberCustom,
  formatOrdinal,
  formatPercent,
  maskBankCard,
  maskCustom,
  maskEmail,
  maskIdCard,
  maskName,
  maskPhone,
  pluralize,
  truncateText
} from '../src'

describe('formatkit', () => {
  it('number formats', () => {
    expect(formatNumber(1234.5, 2)).toContain('1')
    expect(formatCurrency(10, 'USD', 'en-US')).toContain('$')
    expect(formatPercent(0.123, 1)).toContain('%')
    expect(formatCompact(1200000, 'en')).toBeTruthy()
    expect(formatOrdinal(1)).toBe('1st')
    expect(formatOrdinal(2)).toBe('2nd')
    expect(formatNumberCustom(1234567, { thousands: '.', decimal: ',', precision: 0 })).toBe('1.234.567')
  })

  it('file and time', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(1024)).toContain('KB')
    expect(formatFileSize(1000, 2, false)).toContain('KB')
    expect(formatBitrate(1048576)).toContain('bps')
    expect(formatDuration(3661)).toContain('1h')
    expect(formatCountdown(90)).toBe('00:01:30')
    expect(() => formatFileSize(-1)).toThrow()
  })

  it('text', () => {
    expect(truncateText('hello world', 8)).toBe('hello...')
    expect(truncateText('hi', 8)).toBe('hi')
    expect(formatList(['a', 'b'])).toContain('a')
    expect(pluralize(1, 'item')).toBe('1 item')
    expect(pluralize(2, 'item')).toBe('2 items')
    expect(() => truncateText('x', -1)).toThrow()
  })

  it('mask helpers', () => {
    expect(maskPhone('13812345678')).toBe('138****5678')
    expect(maskIdCard('110101199001011234')).toContain('****')
    expect(maskBankCard('6222021234567890')).toContain('****')
    expect(maskEmail('user@example.com')).toContain('@')
    expect(maskName('张三')).toBe('张*')
    expect(maskCustom('13812345678', 3, 7)).toContain('****')
    expect(() => maskCustom('abc', 2, 1)).toThrow()
  })
})
