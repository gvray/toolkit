import { caseInsensitiveFilter } from '../src';

describe('caseInsensitiveFilter', () => {
  const items = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'User' },
  ];

  it('filters items case-insensitively', () => {
    expect(caseInsensitiveFilter(items, 'ALI', [(item) => item.name])).toEqual([items[0]]);
  });

  it('checks multiple fields', () => {
    expect(
      caseInsensitiveFilter(items, 'admin', [(item) => item.name, (item) => item.role])
    ).toEqual([items[0]]);
  });

  it('returns original array when keyword is empty', () => {
    expect(caseInsensitiveFilter(items, ' ', [(item) => item.name])).toEqual(items);
  });

  it('skips undefined field values', () => {
    expect(caseInsensitiveFilter([{ name: undefined }], 'x', [(item) => item.name])).toEqual([]);
  });
});
