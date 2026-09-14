import { safeJsonParse } from '../src';

describe('safeJsonParse', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse<{ a: number }>('{"a":1}')).toEqual({ a: 1 });
  });

  it('returns fallback on invalid JSON', () => {
    expect(safeJsonParse('invalid', 'fb')).toBe('fb');
  });

  it('returns undefined when no fallback and invalid', () => {
    expect(safeJsonParse('not json')).toBeUndefined();
  });

  it('returns fallback for non-string input', () => {
    expect(safeJsonParse(123, 'fb')).toBe('fb');
    expect(safeJsonParse(null, 'fb')).toBe('fb');
    expect(safeJsonParse(undefined, 'fb')).toBe('fb');
  });

  it('preserves parsed value type with generic', () => {
    const arr = safeJsonParse<number[]>('[1,2,3]', []);
    expect(arr).toEqual([1, 2, 3]);
  });
});
