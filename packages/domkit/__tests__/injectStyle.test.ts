import { injectStyle } from '../src';

describe('injectStyle', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('should create a new style element with the given id and css', () => {
    injectStyle('theme-root', ':root { --color-primary: #007aff; }');

    const el = document.getElementById('theme-root');
    expect(el).toBeInstanceOf(HTMLStyleElement);
    expect(el?.textContent).toBe(':root { --color-primary: #007aff; }');
    expect(document.head.querySelectorAll('style')).toHaveLength(1);
  });

  it('should update the existing style element when called with the same id', () => {
    injectStyle('theme-root', ':root { --color-primary: #007aff; }');
    injectStyle('theme-root', ':root { --color-primary: #ff3b30; }');

    const el = document.getElementById('theme-root');
    expect(el?.textContent).toBe(':root { --color-primary: #ff3b30; }');
    expect(document.head.querySelectorAll('style')).toHaveLength(1);
  });

  it('should create separate style elements for different ids', () => {
    injectStyle('style-a', '.a {}');
    injectStyle('style-b', '.b {}');

    expect(document.head.querySelectorAll('style')).toHaveLength(2);
    expect(document.getElementById('style-a')?.textContent).toBe('.a {}');
    expect(document.getElementById('style-b')?.textContent).toBe('.b {}');
  });

  it('should allow empty css string', () => {
    injectStyle('empty-style', '');

    const el = document.getElementById('empty-style');
    expect(el?.textContent).toBe('');
  });

  it('should set the media attribute when provided', () => {
    injectStyle('print-style', 'body { color: black; }', { media: 'print' });

    const el = document.getElementById('print-style') as HTMLStyleElement;
    expect(el.media).toBe('print');
  });

  it('should update the media attribute on subsequent calls', () => {
    injectStyle('responsive-style', '.x {}', { media: 'screen' });
    injectStyle('responsive-style', '.x {}', { media: 'print' });

    const el = document.getElementById('responsive-style') as HTMLStyleElement;
    expect(el.media).toBe('print');
  });

  it('should return a dispose function that removes the style element', () => {
    const dispose = injectStyle('theme-root', ':root { --color-primary: #007aff; }');
    expect(document.getElementById('theme-root')).not.toBeNull();

    dispose();
    expect(document.getElementById('theme-root')).toBeNull();
  });
});
