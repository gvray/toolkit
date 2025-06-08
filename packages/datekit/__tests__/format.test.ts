import { format, formatPreset, DATE_FORMATS } from '../src/format'

describe('format', () => {
  const testDate = new Date('2023-12-25T15:30:45.123Z')

  it('should format date with YYYY-MM-DD pattern', () => {
    const result = format(testDate, 'YYYY-MM-DD')
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should format date with time', () => {
    const result = format(testDate, 'YYYY-MM-DD HH:mm:ss')
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })

  it('should support Chinese locale', () => {
    const result = format(testDate, 'YYYY年MM月DD日', { locale: 'zh-CN' })
    expect(result).toMatch(/^\d{4}年\d{2}月\d{2}日$/)
  })

  it('should format with preset formats', () => {
    const result = formatPreset(testDate, 'ISO_DATE')
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should handle month names', () => {
    const result = format(testDate, 'MMMM')
    expect(result).toBe('December')
  })

  it('should handle day names', () => {
    const result = format(testDate, 'dddd')
    expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).toContain(result)
  })
})
