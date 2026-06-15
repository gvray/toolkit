import { isAfter, isBefore, isBetween, isEqual } from '../src/compare';

describe('isEqual / isBefore / isAfter', () => {
  const a = new Date(2026, 0, 1);
  const b = new Date(2026, 0, 2);

  it('isEqual', () => {
    expect(isEqual(a, new Date(a.getTime()))).toBe(true);
    expect(isEqual(a, b)).toBe(false);
  });

  it('isBefore', () => {
    expect(isBefore(a, b)).toBe(true);
    expect(isBefore(b, a)).toBe(false);
    expect(isBefore(a, a)).toBe(false);
  });

  it('isAfter', () => {
    expect(isAfter(b, a)).toBe(true);
    expect(isAfter(a, b)).toBe(false);
  });
});

describe('isBetween', () => {
  it('returns true inside inclusive range', () => {
    expect(isBetween(new Date(2026, 4, 10), new Date(2026, 4, 1), new Date(2026, 4, 31))).toBe(
      true
    );
  });

  it('works when start and end are reversed', () => {
    expect(isBetween(new Date(2026, 4, 10), new Date(2026, 4, 31), new Date(2026, 4, 1))).toBe(
      true
    );
  });

  it('false outside range', () => {
    expect(isBetween(new Date(2026, 5, 1), new Date(2026, 4, 1), new Date(2026, 4, 31))).toBe(
      false
    );
  });

  it('inclusive endpoints', () => {
    const lo = new Date(2026, 4, 1);
    const hi = new Date(2026, 4, 31);
    expect(isBetween(lo, lo, hi)).toBe(true);
    expect(isBetween(hi, lo, hi)).toBe(true);
  });
});
