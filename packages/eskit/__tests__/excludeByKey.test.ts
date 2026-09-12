import { excludeByKey } from '../src';

describe('excludeByKey', () => {
  it('filters out items matching the key/value', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(excludeByKey(items, 'id', 2)).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it('returns a copy when value is null or undefined', () => {
    const items = [{ id: 1 }, { id: 2 }];
    expect(excludeByKey(items, 'id', null)).toEqual(items);
    expect(excludeByKey(items, 'id', undefined)).toEqual(items);
  });

  it('does not mutate original array', () => {
    const items = [{ id: 1 }, { id: 2 }];
    const result = excludeByKey(items, 'id', 1);
    expect(items).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result).not.toBe(items);
  });
});
