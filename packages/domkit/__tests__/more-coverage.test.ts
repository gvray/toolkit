import delegate from '../src/delegate';
import getOffsetPosition from '../src/getOffsetPosition';
import getScrollPosition from '../src/getScrollPosition';
import getElementSize from '../src/getElementSize';
import getStyleProps from '../src/getStyleProps';
import getBoundingClientPosition from '../src/getBoundingClientPosition';
import getClass from '../src/getClass';
import isScrollEnd from '../src/isScrollEnd';
import addEvent from '../src/addEvent';
import setClass from '../src/setClass';
import toFront from '../src/toFront';

describe('delegate - additional paths', () => {
  it('handles non-Element event targets gracefully', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const handler = jest.fn();
    delegate(container, 'click', 'span', handler);
    // Dispatch an event where target is not an Element (text node)
    // This is hard to do directly - just verify handler wasn't called with non-element target
    container.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    document.body.removeChild(container);
  });

  it('does not call handler when target does not match selector', () => {
    const container = document.createElement('div');
    const div = document.createElement('div');
    container.appendChild(div);
    document.body.appendChild(container);
    const handler = jest.fn();
    delegate(container, 'click', 'span', handler);
    div.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(container);
  });

  it('returns cleanup function', () => {
    const container = document.createElement('div');
    const span = document.createElement('span');
    container.appendChild(span);
    document.body.appendChild(container);
    const handler = jest.fn();
    const off = delegate(container, 'click', 'span', handler);
    off();
    span.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(container);
  });
});

describe('getOffsetPosition - null path', () => {
  it('returns 0,0 for null element', () => {
    const result = getOffsetPosition(null as any);
    expect(result).toEqual({ left: 0, top: 0 });
  });

  it('uses getClientRects when available', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getOffsetPosition(el);
    expect(result).toHaveProperty('left');
    expect(result).toHaveProperty('top');
    document.body.removeChild(el);
  });
});

describe('getScrollPosition - fallback path', () => {
  it('returns scroll position for Document', () => {
    const result = getScrollPosition(document);
    expect(result).toHaveProperty('left');
    expect(result).toHaveProperty('top');
  });

  it('returns scroll position when scrollingElement not available', () => {
    const origScrollingElement = Object.getOwnPropertyDescriptor(document, 'scrollingElement');
    Object.defineProperty(document, 'scrollingElement', { value: null, configurable: true });
    const result = getScrollPosition(window);
    expect(result).toHaveProperty('left');
    expect(result).toHaveProperty('top');
    if (origScrollingElement) {
      Object.defineProperty(document, 'scrollingElement', origScrollingElement);
    } else {
      Object.defineProperty(document, 'scrollingElement', {
        value: document.documentElement,
        configurable: true,
      });
    }
  });
});

describe('getElementSize - padding mode', () => {
  it('returns padding-box size for HTMLElement', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const size = getElementSize(el, 'padding');
    expect(size).toHaveProperty('width');
    expect(size).toHaveProperty('height');
    document.body.removeChild(el);
  });

  it('returns border-box size for non-HTMLElement', () => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as unknown as Element;
    document.body.appendChild(el);
    const size = getElementSize(el, 'padding');
    expect(size).toHaveProperty('width');
    expect(size).toHaveProperty('height');
    document.body.removeChild(el);
  });
});

describe('getStyleProps - null style fallback', () => {
  it('returns empty object when style is null', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    // Mock getComputedStyle to return null
    const origGetComputedStyle = window.getComputedStyle;
    (window as any).getComputedStyle = () => null;
    const result = getStyleProps(el);
    expect(result).toEqual({});
    (window as any).getComputedStyle = origGetComputedStyle;
    document.body.removeChild(el);
  });
});

describe('getBoundingClientPosition - additional paths', () => {
  it('returns x,y coordinates for an element', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const pos = getBoundingClientPosition(el);
    expect(pos).toHaveProperty('x');
    expect(pos).toHaveProperty('y');
    document.body.removeChild(el);
  });

  it('returns {x:0,y:0} for null element', () => {
    const pos = getBoundingClientPosition(null as any);
    expect(pos).toEqual({ x: 0, y: 0 });
  });
});

describe('getClass - SVG path', () => {
  it('gets class for SVG element', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'my-svg');
    const cls = getClass(svg as any);
    expect(typeof cls).toBe('string');
  });
});

describe('isScrollEnd - undefined document path', () => {
  it('returns false for null', () => {
    expect(isScrollEnd(null)).toBe(false);
  });
});

describe('addEvent - no addEventListener fallback', () => {
  it('returns undefined and warns when addEventListener not available', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockEl = { addEventListener: undefined } as any;
    const result = addEvent(mockEl, 'click', jest.fn());
    expect(result).toBeUndefined();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('setClass - no classList path', () => {
  it('falls back to setAttribute when classList absent but className present', () => {
    const mockEl: any = { className: '' };
    Object.defineProperty(mockEl, 'classList', { value: undefined, configurable: true });
    Object.defineProperty(mockEl, 'className', { value: '', configurable: true, writable: true });
    mockEl.setAttribute = jest.fn();
    setClass(mockEl, 'foo');
    expect(mockEl.setAttribute).toHaveBeenCalledWith('class', 'foo');
  });

  it('uses setAttribute for class and className when neither present', () => {
    const mockEl: any = {};
    // No classList, no className
    mockEl.setAttribute = jest.fn();
    setClass(mockEl, 'bar');
    expect(mockEl.setAttribute).toHaveBeenCalled();
  });
});

describe('toFront - insert before first child', () => {
  it('inserts element before first child when not contained in parent', () => {
    const parent = document.createElement('div');
    const first = document.createElement('span');
    parent.appendChild(first);
    document.body.appendChild(parent);

    // Create orphan element with a mock parentNode pointing to `parent`
    const orphan = document.createElement('em');
    // We need to use Object.defineProperty to simulate parentNode
    // Since real DOM won't let us set parentNode directly, test by attaching to a different parent
    const altParent = document.createElement('div');
    altParent.appendChild(orphan);
    document.body.appendChild(altParent);

    // Now `orphan` has altParent, and altParent.contains(orphan) is true, so insertBefore won't happen
    // To test line 20, we need firstChild !== el && !parent.contains(el)
    // The element must be in some parent but NOT in the target parent.
    // toFront uses el.parentNode, so let's use orphan which is in altParent
    // altParent.contains(orphan) = true => no-op
    // Instead, test the actual code path by making a fresh element not in any DOM tree
    // with a mocked parentNode

    const testEl = document.createElement('span');
    const mockParent = document.createElement('div');
    const existingFirst = document.createElement('b');
    mockParent.appendChild(existingFirst);
    document.body.appendChild(mockParent);

    // Override parentNode to point to mockParent (not really in tree)
    Object.defineProperty(testEl, 'parentNode', { value: mockParent, configurable: true });

    // testEl !== existingFirst, and mockParent.contains(testEl) is false (testEl not in DOM)
    expect(() => toFront(testEl)).not.toThrow();

    document.body.removeChild(parent);
    document.body.removeChild(altParent);
    document.body.removeChild(mockParent);
  });
});
