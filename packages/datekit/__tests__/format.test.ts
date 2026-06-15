import { format, DATE_FORMATS } from '../src/format';

describe('format', () => {
  const d = new Date(2024, 0, 15, 10, 30, 45, 123); // 2024-01-15 10:30:45.123 local

  it('YYYY-MM-DD', () => {
    expect(format(d, 'YYYY-MM-DD')).toBe('2024-01-15');
  });

  it('YYYY-MM-DD HH:mm:ss', () => {
    expect(format(d, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-15 10:30:45');
  });

  it('zh-CN locale', () => {
    expect(format(d, 'YYYY年MM月DD日', { locale: 'zh-CN' })).toBe('2024年01月15日');
  });

  it('month name MMMM / MMM', () => {
    expect(format(d, 'MMMM', { locale: 'en-US' })).toBe('January');
    expect(format(d, 'MMM', { locale: 'en-US' })).toBe('Jan');
  });

  it('day name dddd / ddd', () => {
    const monday = new Date(2026, 4, 4);
    expect(format(monday, 'dddd', { locale: 'en-US' })).toBe('Monday');
    expect(format(monday, 'ddd', { locale: 'en-US' })).toBe('Mon');
  });

  it('AM/PM', () => {
    expect(format(d, 'h:mm A')).toBe('10:30 AM');
    expect(format(new Date(2024, 0, 15, 14, 0, 0), 'h:mm A')).toBe('2:00 PM');
  });

  it('SSS milliseconds', () => {
    expect(format(d, 'SSS')).toBe('123');
  });

  it('DATE_FORMATS keys exist', () => {
    expect(DATE_FORMATS).toHaveProperty('ISO_DATE', 'YYYY-MM-DD');
    expect(DATE_FORMATS).toHaveProperty('DATE_CN', 'YYYY年MM月DD日');
    expect(DATE_FORMATS).toHaveProperty('ISO_DATETIME');
  });

  it('DATE_FORMATS as format argument', () => {
    expect(format(d, DATE_FORMATS.ISO_DATE)).toBe('2024-01-15');
  });

  it('unknown locale falls back to en-US', () => {
    const result = format(d, 'MMM', { locale: 'fr-FR' });
    expect(result).toBe('Jan');
  });
});
