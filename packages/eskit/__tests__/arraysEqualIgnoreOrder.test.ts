import { arraysEqualIgnoreOrder } from '../src';

describe('arraysEqualIgnoreOrder', () => {
  it('ignores element order', () => {
    expect(arraysEqualIgnoreOrder([1, 2, 3], [3, 2, 1])).toBe(true);
    expect(arraysEqualIgnoreOrder(['a', 'b'], ['b', 'a'])).toBe(true);
  });

  it('returns false when elements differ', () => {
    expect(arraysEqualIgnoreOrder([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(arraysEqualIgnoreOrder([1, 2], [1, 2, 3])).toBe(false);
  });

  it('returns true for empty arrays', () => {
    expect(arraysEqualIgnoreOrder([], [])).toBe(true);
  });
});
