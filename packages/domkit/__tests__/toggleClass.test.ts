import { toggleClass } from '../src';

describe('toggleClass', () => {
  test('adds a missing class', () => {
    const element = document.createElement('div');

    expect(toggleClass(element, 'active')).toBe(true);
    expect(element.className).toBe('active');
  });

  test('removes an existing class', () => {
    const element = document.createElement('div');
    element.className = 'active';

    expect(toggleClass(element, 'active')).toBe(false);
    expect(element.className).toBe('');
  });

  test('returns false for invalid input', () => {
    // @ts-ignore test invalid input
    expect(toggleClass(null, 'active')).toBe(false);
    expect(toggleClass(document.createElement('div'), '   ')).toBe(false);
  });

  test('force true always adds the class', () => {
    const element = document.createElement('div');
    element.className = 'active';

    expect(toggleClass(element, 'active', true)).toBe(true);
    expect(element.className).toBe('active');
  });

  test('force false always removes the class', () => {
    const element = document.createElement('div');
    element.className = 'active other';

    expect(toggleClass(element, 'active', false)).toBe(false);
    expect(element.className).toBe('other');
  });
});
