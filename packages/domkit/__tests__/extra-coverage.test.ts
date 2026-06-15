import insertAfter from '../src/insertAfter';
import isScrollEnd from '../src/isScrollEnd';
import loadScript from '../src/loadScript';
import scrollTo from '../src/scrollTo';
import setClass from '../src/setClass';
import getScrollLeft from '../src/getScrollLeft';
import getScrollTop from '../src/getScrollTop';
import addCss from '../src/addCss';
import getStyleProps from '../src/getStyleProps';
import getElementSize from '../src/getElementSize';

describe('insertAfter - throw path', () => {
  it('throws when reference node has no parent', () => {
    const orphan = document.createElement('div');
    expect(() => insertAfter(document.createElement('span'), orphan)).toThrow(
      'referenceNode must have a parentNode'
    );
  });
});

describe('isScrollEnd - additional paths', () => {
  it('returns false for null element', () => {
    expect(isScrollEnd(null)).toBe(false);
  });
});

describe('loadScript - callback paths', () => {
  beforeEach(() => {
    // Remove all test scripts
    document.head.querySelectorAll('script[src*="test-load"]').forEach((s) => s.remove());
  });

  it('calls callback on load event', () => {
    const callback = jest.fn();
    loadScript('https://example.com/test-load.js', callback);
    const script = document.head.querySelector('script[src*="test-load"]') as HTMLScriptElement;
    script?.dispatchEvent(new Event('load'));
    expect(callback).toHaveBeenCalled();
  });

  it('calls callback on error event', () => {
    const callback = jest.fn();
    loadScript('https://example.com/test-load-err.js', callback);
    const script = document.head.querySelector('script[src*="test-load-err"]') as HTMLScriptElement;
    script?.dispatchEvent(new Event('error'));
    expect(callback).toHaveBeenCalled();
  });

  it('does not throw when no callback provided', () => {
    expect(() => loadScript('https://example.com/no-cb.js')).not.toThrow();
  });

  it('adds cache buster with query string in url', () => {
    loadScript({ url: 'https://example.com/script.js?v=1', cache: false });
    const script = document.head.querySelector('script[src*="script.js?v=1"]') as HTMLScriptElement;
    expect(script?.src).toMatch(/&_=\d+/);
  });
});

describe('scrollTo - additional paths', () => {
  it('falls back to window.scroll when scrollTo not available', () => {
    const mockScroll = jest.fn();
    // Remove scrollBehavior support to force fallback
    const origStyle = document.documentElement.style;
    const origScrollBehavior = Object.getOwnPropertyDescriptor(origStyle, 'scrollBehavior');
    Object.defineProperty(document.documentElement.style, 'scrollBehavior', {
      value: undefined,
      configurable: true,
      writable: true,
    });
    const origScrollTo = window.scrollTo;
    Object.defineProperty(window, 'scrollTo', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'scroll', {
      value: mockScroll,
      writable: true,
      configurable: true,
    });

    scrollTo({ x: 50, y: 100 });
    expect(mockScroll).toHaveBeenCalledWith(50, 100);

    // Restore
    Object.defineProperty(window, 'scrollTo', {
      value: origScrollTo,
      writable: true,
      configurable: true,
    });
    if (origScrollBehavior) {
      Object.defineProperty(document.documentElement.style, 'scrollBehavior', origScrollBehavior);
    }
  });

  it('handles Element target with scrollTo method', () => {
    const el = document.createElement('div');
    const mockScrollTo = jest.fn();
    Object.defineProperty(el, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
      configurable: true,
    });
    document.body.appendChild(el);
    scrollTo({ x: 10, y: 20, target: el });
    expect(mockScrollTo).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it('handles Element target without scrollTo method', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollTo', { value: undefined, writable: true, configurable: true });
    document.body.appendChild(el);
    scrollTo({ x: 10, y: 20, target: el });
    expect(el.scrollTop).toBe(20);
    expect(el.scrollLeft).toBe(10);
    document.body.removeChild(el);
  });
});

describe('setClass - fallback paths', () => {
  it('uses className fallback when classList not present', () => {
    // Mock element without classList but with className
    const mockEl = {
      setAttribute: jest.fn(),
      className: '',
    } as any;
    Object.defineProperty(mockEl, 'classList', { value: undefined, configurable: true });
    setClass(mockEl, 'test-class');
    expect(mockEl.setAttribute).toHaveBeenCalledWith('class', 'test-class');
  });
});

describe('getScrollLeft - fallback', () => {
  it('returns scrollLeft for element', () => {
    const el = document.createElement('div');
    expect(typeof getScrollLeft(el)).toBe('number');
  });

  it('returns window scroll position for window', () => {
    const result = getScrollLeft(window as any);
    expect(typeof result).toBe('number');
  });
});

describe('getScrollTop - fallback', () => {
  it('returns scrollTop for element', () => {
    const el = document.createElement('div');
    expect(typeof getScrollTop(el)).toBe('number');
  });

  it('returns window scroll position for window', () => {
    const result = getScrollTop(window as any);
    expect(typeof result).toBe('number');
  });
});

describe('addCss - reuse cached sheet', () => {
  it('reuses cached stylesheet for same title', () => {
    // Clear head to avoid conflicts
    document.head.innerHTML = '';
    addCss('.foo', { color: 'red' }, 'test-cached');
    const count1 = document.styleSheets.length;
    addCss('.bar', { color: 'blue' }, 'test-cached');
    const count2 = document.styleSheets.length;
    // Count should be the same since we reuse cached sheet
    expect(count2).toBe(count1);
  });
});

describe('getStyleProps', () => {
  it('returns a specific style property as string', () => {
    const el = document.createElement('div');
    el.style.color = 'red';
    document.body.appendChild(el);
    const result = getStyleProps(el, 'color');
    expect(typeof result).toBe('string');
    document.body.removeChild(el);
  });

  it('returns all style properties when no propName given', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getStyleProps(el);
    expect(typeof result).toBe('object');
    document.body.removeChild(el);
  });
});

describe('getElementSize', () => {
  it('returns an object with width/height/etc.', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const size = getElementSize(el);
    expect(size).toHaveProperty('width');
    expect(size).toHaveProperty('height');
    document.body.removeChild(el);
  });
});
