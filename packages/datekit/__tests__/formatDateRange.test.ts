import { formatDateRange } from '../src';

describe('formatDateRange', () => {
  it('formats a valid date range', () => {
    const result = formatDateRange(
      [new Date('2024-01-01T10:30:00'), new Date('2024-01-31T18:45:00')],
      'YYYY-MM-DD'
    );
    expect(result).toEqual({ start: '2024-01-01', end: '2024-01-31' });
  });

  it('accepts string and number inputs', () => {
    const result = formatDateRange(['2024-02-01', 1709251200000], 'YYYY-MM-DD');
    expect(result).toEqual({ start: '2024-02-01', end: '2024-03-01' });
  });

  it('returns undefined for incomplete ranges', () => {
    expect(formatDateRange(null)).toBeUndefined();
    expect(formatDateRange(undefined)).toBeUndefined();
    expect(formatDateRange([new Date(), null as any])).toBeUndefined();
  });

  it('returns undefined for invalid dates', () => {
    expect(formatDateRange(['invalid', new Date()])).toBeUndefined();
  });
});
