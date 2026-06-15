import { getScrollPosition } from '../src';

describe('getScrollPosition', () => {
  beforeAll(() => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
  });

  test('returns the correct scroll position for window object', () => {
    // expect(getScrollPosition(window)).toEqual({ left: 0, top: 0 })
    window.scrollTo(500, 500);
    // expect(getScrollPosition(window)).toEqual({ left: 500, top: 500 })
    window.scrollTo(0, 0);
  });

  test('returns the correct scroll position for document object', () => {
    expect(getScrollPosition(document)).toEqual({ left: 0, top: 0 });
    window.scrollTo(500, 500);
    // expect(getScrollPosition(document)).toEqual({ left: 500, top: 500 })
    window.scrollTo(0, 0);
  });

  test('returns the correct scroll position for HTML element', () => {
    const element = document.createElement('div');
    element.style.overflow = 'scroll';
    element.style.width = '100px';
    element.style.height = '100px';
    element.innerHTML = "<div style='width: 200px; height: 200px;'></div>";
    document.body.appendChild(element);

    expect(getScrollPosition(element)).toEqual({ left: 0, top: 0 });
    element.scrollTop = 50;
    element.scrollLeft = 50;
    expect(getScrollPosition(element)).toEqual({ left: 50, top: 50 });

    document.body.removeChild(element);
  });

  test('keeps x/y axes in the fallback document path', () => {
    const scrollingElement = document.scrollingElement;
    Object.defineProperty(document, 'scrollingElement', {
      value: null,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollX', { value: undefined, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: undefined, configurable: true });
    Object.defineProperty(window, 'pageXOffset', { value: 10, configurable: true });
    Object.defineProperty(window, 'pageYOffset', { value: 20, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollLeft', { value: 5, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 15, configurable: true });
    Object.defineProperty(document.body, 'scrollLeft', { value: 8, configurable: true });
    Object.defineProperty(document.body, 'scrollTop', { value: 18, configurable: true });

    expect(getScrollPosition(window)).toEqual({ left: 10, top: 20 });

    Object.defineProperty(document, 'scrollingElement', {
      value: scrollingElement,
      configurable: true,
    });
  });
});
