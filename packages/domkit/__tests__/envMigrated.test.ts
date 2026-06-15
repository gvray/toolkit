import {
  getBrowserVersion,
  isDesktop,
  isMobile,
  isTablet,
  isTouchDevice,
  onOffline,
  onOnline,
  supportsWebGL,
  supportsWebP,
} from '../src';

function setUA(ua: string) {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: ua,
    writable: true,
    configurable: true,
  });
}

describe('getBrowserVersion', () => {
  it('extracts Chrome version', () => {
    setUA('Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.6099.109 Safari/537.36');
    expect(getBrowserVersion()).toBe('120.0.6099.109');
  });

  it('returns empty when UA has no recognisable version token', () => {
    setUA('SomeObscureBrowser/1.0');
    expect(getBrowserVersion()).toBe('');
  });
});

describe('isMobile / isTablet / isDesktop', () => {
  it('isMobile returns true for mobile UA', () => {
    setUA('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile/Safari');
    expect(isMobile()).toBe(true);
    expect(isDesktop()).toBe(false);
  });

  it('isTablet returns true for iPad UA', () => {
    setUA('Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15');
    expect(isTablet()).toBe(true);
    expect(isDesktop()).toBe(false);
  });

  it('isDesktop returns true for desktop UA', () => {
    setUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    expect(isDesktop()).toBe(true);
    expect(isMobile()).toBe(false);
    expect(isTablet()).toBe(false);
  });
});

describe('isTouchDevice', () => {
  it('returns false when maxTouchPoints is 0', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      value: 0,
      writable: true,
      configurable: true,
    });
    expect(isTouchDevice()).toBe(false);
  });

  it('returns true when maxTouchPoints > 0', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      value: 5,
      writable: true,
      configurable: true,
    });
    expect(isTouchDevice()).toBe(true);
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });
});

describe('onOnline / onOffline', () => {
  it('onOnline registers and removes listener', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const cb = jest.fn();
    const off = onOnline(cb);
    expect(addSpy).toHaveBeenCalledWith('online', cb);
    off();
    expect(removeSpy).toHaveBeenCalledWith('online', cb);
  });

  it('onOffline registers and removes listener', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const cb = jest.fn();
    const off = onOffline(cb);
    expect(addSpy).toHaveBeenCalledWith('offline', cb);
    off();
    expect(removeSpy).toHaveBeenCalledWith('offline', cb);
  });
});

describe('supportsWebGL', () => {
  it('returns false when canvas returns null context', () => {
    jest.spyOn(document, 'createElement').mockReturnValueOnce({
      getContext: jest.fn(() => null),
    } as unknown as HTMLCanvasElement);
    expect(supportsWebGL()).toBe(false);
  });

  it('returns true when canvas returns a context', () => {
    jest.spyOn(document, 'createElement').mockReturnValueOnce({
      getContext: jest.fn(() => ({})),
    } as unknown as HTMLCanvasElement);
    expect(supportsWebGL()).toBe(true);
  });

  it('returns false when getContext throws', () => {
    jest.spyOn(document, 'createElement').mockReturnValueOnce({
      getContext: jest.fn(() => {
        throw new Error('not supported');
      }),
    } as unknown as HTMLCanvasElement);
    expect(supportsWebGL()).toBe(false);
  });
});

describe('supportsWebP', () => {
  afterEach(() => {
    delete (globalThis as unknown as Record<string, unknown>).Image;
  });

  it('resolves to false when image errors', async () => {
    (globalThis as unknown as Record<string, unknown>).Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_: string) {
        setTimeout(() => this.onerror?.(), 0);
      }
    };
    expect(await supportsWebP()).toBe(false);
  });

  it('resolves to true when image loads with width 1', async () => {
    (globalThis as unknown as Record<string, unknown>).Image = class {
      width = 1;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_: string) {
        setTimeout(() => this.onload?.(), 0);
      }
    };
    expect(await supportsWebP()).toBe(true);
  });
});
