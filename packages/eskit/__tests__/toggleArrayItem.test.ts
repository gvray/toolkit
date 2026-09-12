import { toggleArrayItem } from '../src';

describe('toggleArrayItem', () => {
  it('removes existing item', () => {
    expect(toggleArrayItem([1, 2, 3], 2)).toEqual([1, 3]);
  });

  it('appends missing item', () => {
    expect(toggleArrayItem([1, 3], 2)).toEqual([1, 3, 2]);
  });

  it('does not mutate original array', () => {
    const original = [1, 2, 3];
    const result = toggleArrayItem(original, 2);
    expect(original).toEqual([1, 2, 3]);
    expect(result).not.toBe(original);
  });
});
