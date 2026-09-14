import { distribute, percentage, percentageChange, safePercentage } from '../src/ratio';

describe('ratio', () => {
  it('percentage', () => {
    expect(percentage(30, 200)).toBe(15);
  });

  it('percentageChange', () => {
    expect(percentageChange(100, 120)).toBe(20);
  });

  it('distribute by weights', () => {
    expect(distribute(100, [1, 2, 2])).toEqual([20, 40, 40]);
  });

  it('distribute remainder with equal weights', () => {
    const parts = distribute(100, [1, 1, 1]);
    expect(sumParts(parts)).toBe(100);
    expect(parts).toEqual([34, 33, 33]);
  });

  it('throws when total is zero divisor in percentage', () => {
    expect(() => percentage(1, 0)).toThrow();
  });
});

describe('safePercentage', () => {
  it('returns the percentage for valid inputs', () => {
    expect(safePercentage(30, 200)).toBe(15);
  });

  it('returns fallback (default 0) when total is zero', () => {
    expect(safePercentage(10, 0)).toBe(0);
  });

  it('returns fallback (default 0) when total is negative', () => {
    expect(safePercentage(10, -5)).toBe(0);
  });

  it('returns custom fallback when total is zero', () => {
    expect(safePercentage(10, 0, -1)).toBe(-1);
  });

  it('returns fallback for non-finite inputs', () => {
    expect(safePercentage(NaN, 100)).toBe(0);
    expect(safePercentage(10, Infinity)).toBe(0);
  });
});

function sumParts(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
