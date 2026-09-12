import { arraysEqual } from '../src';

describe('arraysEqual', () => {
  it('compares arrays element-wise by default', () => {
    expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(arraysEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('uses custom comparator when provided', () => {
    const a = [{ id: 1 }, { id: 2 }];
    const b = [{ id: 1 }, { id: 2 }];
    expect(arraysEqual(a, b, (x, y) => x.id === y.id)).toBe(true);
    expect(arraysEqual(a, [{ id: 1 }, { id: 3 }], (x, y) => x.id === y.id)).toBe(false);
  });

  it('returns true for empty arrays', () => {
    expect(arraysEqual([], [])).toBe(true);
  });
});
