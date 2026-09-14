import { formatDateTime } from '../src/format';

describe('formatDateTime', () => {
  const d = new Date('2024-01-15T10:30:00');

  it('formats a Date with default styles', () => {
    const result = formatDateTime(d);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('formats string and number inputs', () => {
    expect(typeof formatDateTime('2024-01-15T10:30:00')).toBe('string');
    expect(typeof formatDateTime(1705276800000)).toBe('string');
  });

  it('timeStyle none returns date only (no time component pattern)', () => {
    const result = formatDateTime(d, { timeStyle: 'none' });
    expect(result).not.toMatch(/\d{1,2}:\d{2}/);
  });

  it('returns fallback for null and undefined', () => {
    expect(formatDateTime(null, { fallback: '-' })).toBe('-');
    expect(formatDateTime(undefined, { fallback: '-' })).toBe('-');
  });

  it('returns fallback for invalid date', () => {
    expect(formatDateTime('not-a-date', { fallback: '-' })).toBe('-');
  });

  it('default fallback is empty string', () => {
    expect(formatDateTime(null)).toBe('');
  });
});
