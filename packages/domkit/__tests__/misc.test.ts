import requireScript from '../src/require';
import setStyleProps from '../src/setStyleProps';
import setOpacity from '../src/setOpacity';
import toBack from '../src/toBack';
import toFront from '../src/toFront';
import getTextPixelWidth from '../src/getTextPixelWidth';
import removeClass from '../src/removeClass';
import scrollTo from '../src/scrollTo';

describe('requireScript', () => {
  it('appends a script element to document.body', () => {
    const callback = jest.fn();
    requireScript('https://example.com/script.js', callback);
    const scripts = document.querySelectorAll('script[src="https://example.com/script.js"]');
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('calls callback on script load event', () => {
    const callback = jest.fn();
    requireScript('https://example.com/test.js', callback);
    const script = document.querySelector(
      'script[src="https://example.com/test.js"]'
    ) as HTMLScriptElement;
    script?.dispatchEvent(new Event('load'));
    expect(callback).toHaveBeenCalled();
  });
});

describe('setStyleProps', () => {
  it('sets known CSS properties', () => {
    const el = document.createElement('div');
    setStyleProps(el, { color: 'red', fontSize: '14px' });
    expect(el.style.color).toBe('red');
    expect(el.style.fontSize).toBe('14px');
  });

  it('converts camelCase to kebab-case', () => {
    const el = document.createElement('div');
    setStyleProps(el, { backgroundColor: 'blue' });
    expect(el.style.backgroundColor).toBe('blue');
  });

  it('sets custom CSS variable for unknown property', () => {
    const el = document.createElement('div');
    setStyleProps(el, { myCustomProp: 'value' });
    expect(el.style.getPropertyValue('--my-custom-prop')).toBe('value');
  });

  it('does nothing when element is null', () => {
    expect(() => setStyleProps(null, { color: 'red' })).not.toThrow();
  });

  it('does nothing when props is empty', () => {
    const el = document.createElement('div');
    expect(() => setStyleProps(el, {})).not.toThrow();
  });
});

describe('setOpacity', () => {
  it('sets opacity via style.opacity', () => {
    const el = document.createElement('div');
    setOpacity(el, 0.5);
    expect(el.style.opacity).toBe('0.5');
  });

  it('falls back to filter when opacity not in style', () => {
    const el = { style: {} } as any;
    setOpacity(el, 0.5);
    expect(el.style.filter).toBe('alpha(opacity=50)');
  });
});

describe('toBack', () => {
  it('moves element to the back (end) of parent', () => {
    const parent = document.createElement('div');
    const a = document.createElement('span');
    const b = document.createElement('span');
    parent.appendChild(a);
    parent.appendChild(b);
    toBack(a);
    expect(parent.lastElementChild).toBe(a);
  });

  it('does nothing if no parent', () => {
    const el = document.createElement('div');
    expect(() => toBack(el)).not.toThrow();
  });
});

describe('toFront', () => {
  it('does nothing if element is already first child', () => {
    const parent = document.createElement('div');
    const a = document.createElement('span');
    const b = document.createElement('span');
    parent.appendChild(a);
    parent.appendChild(b);
    document.body.appendChild(parent);
    // a is already first child, condition 'firstChild !== el' is false so no-op
    toFront(a);
    expect(parent.firstElementChild).toBe(a);
    document.body.removeChild(parent);
  });

  it('moves an existing child to the front', () => {
    const parent = document.createElement('div');
    const a = document.createElement('span');
    const b = document.createElement('span');
    parent.appendChild(a);
    parent.appendChild(b);
    document.body.appendChild(parent);
    toFront(b);
    expect(parent.firstElementChild).toBe(b);
    expect(parent.lastElementChild).toBe(a);
    document.body.removeChild(parent);
  });
});

describe('getTextPixelWidth', () => {
  it('returns a number for text width', () => {
    const width = getTextPixelWidth('Hello World', { fontFamily: 'Arial', fontSize: 16 });
    expect(typeof width).toBe('number');
  });

  it('uses font option directly', () => {
    const width = getTextPixelWidth('Test', { font: 'bold 14px Arial' });
    expect(typeof width).toBe('number');
  });

  it('accepts string fontSize without appending px twice', () => {
    const width = getTextPixelWidth('Test', { fontFamily: 'Arial', fontSize: '16px' });
    expect(typeof width).toBe('number');
  });

  it('builds font string from options', () => {
    const width = getTextPixelWidth('Test', {
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'sans-serif',
    });
    expect(typeof width).toBe('number');
  });

  it('handles empty options', () => {
    const width = getTextPixelWidth('Test', {});
    expect(typeof width).toBe('number');
  });
});

describe('removeClass', () => {
  it('removes a single class', () => {
    const el = document.createElement('div');
    el.className = 'foo bar';
    removeClass(el, 'foo');
    expect(el.classList.contains('foo')).toBe(false);
    expect(el.classList.contains('bar')).toBe(true);
  });

  it('removes multiple classes', () => {
    const el = document.createElement('div');
    el.className = 'foo bar baz';
    removeClass(el, 'foo baz');
    expect(el.classList.contains('foo')).toBe(false);
    expect(el.classList.contains('baz')).toBe(false);
    expect(el.classList.contains('bar')).toBe(true);
  });

  it('does nothing if element is falsy', () => {
    expect(() => removeClass(null as any, 'foo')).not.toThrow();
  });

  it('does nothing if className is empty', () => {
    const el = document.createElement('div');
    el.className = 'foo';
    expect(() => removeClass(el, '')).not.toThrow();
    expect(el.className).toBe('foo');
  });

  it('falls back to regex when classList.remove not available', () => {
    const el = document.createElement('div');
    el.className = 'foo bar';
    const mockClassList = { remove: null } as any;
    Object.defineProperty(el, 'classList', { value: mockClassList, configurable: true });
    removeClass(el, 'foo');
    // Since classList.remove is null, it falls back to regex method
    expect(el.className).toBe('bar');
  });
});

describe('scrollTo extra', () => {
  it('throws for invalid target type', () => {
    expect(() => scrollTo({ x: 0, y: 0, target: 'invalid' as any })).toThrow(
      'Invalid target element type'
    );
  });

  it('handles Window target', () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
      configurable: true,
    });
    scrollTo({ x: 0, y: 100, target: window });
    // Window instanceof Window is true in jsdom
    expect(mockScrollTo).toHaveBeenCalled();
  });

  it('handles negative values by clamping to 0', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    scrollTo({ x: -10, y: -20, target: el });
    expect(el.scrollTop).toBe(0);
    document.body.removeChild(el);
  });
});
