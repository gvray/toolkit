import { injectStyle, removeStyle } from '../src';

describe('removeStyle', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('should remove the style element with the given id', () => {
    injectStyle('theme-root', ':root { --color-primary: #007aff; }');
    expect(document.getElementById('theme-root')).not.toBeNull();

    removeStyle('theme-root');
    expect(document.getElementById('theme-root')).toBeNull();
    expect(document.head.querySelectorAll('style')).toHaveLength(0);
  });

  it('should be a no-op when the style element does not exist', () => {
    expect(() => removeStyle('non-existent')).not.toThrow();
    expect(document.head.querySelectorAll('style')).toHaveLength(0);
  });
});
