import { isElement } from '../src';

describe('isElement', () => {
  it('returns true for dom elements and false for non-elements', () => {
    expect(isElement(document.body)).toBe(true);
    expect(isElement(document)).toBe(true);
    expect(isElement(null)).toBe(false);
    expect(isElement({})).toBe(false);
  });

  it('returns false when DOM constructors are unavailable', () => {
    const originalElement = global.Element;
    const originalHTMLDocument = global.HTMLDocument;
    // @ts-expect-error: simulate SSR environment
    delete global.Element;
    // @ts-expect-error: simulate SSR environment
    delete global.HTMLDocument;

    expect(isElement({})).toBe(false);

    global.Element = originalElement;
    global.HTMLDocument = originalHTMLDocument;
  });
});
