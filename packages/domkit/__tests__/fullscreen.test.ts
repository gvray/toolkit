import exitFullscreen from '../src/exitFullscreen';
import requestFullscreen from '../src/requestFullscreen';
import isFullscreen from '../src/isFullscreen';
import onFullscreenChange from '../src/onFullscreenChange';

describe('isFullscreen', () => {
  it('returns false when no fullscreen element', () => {
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    expect(isFullscreen()).toBe(false);
  });

  it('returns true when fullscreen element exists', () => {
    const el = document.createElement('div');
    Object.defineProperty(document, 'fullscreenElement', { value: el, configurable: true });
    expect(isFullscreen()).toBe(true);
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
  });
});

describe('exitFullscreen', () => {
  it('calls document.exitFullscreen when available', async () => {
    const mockExit = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(document, 'exitFullscreen', {
      value: mockExit,
      configurable: true,
      writable: true,
    });
    await exitFullscreen();
    expect(mockExit).toHaveBeenCalled();
  });

  it('calls webkitExitFullscreen as fallback', async () => {
    Object.defineProperty(document, 'exitFullscreen', {
      value: null,
      configurable: true,
      writable: true,
    });
    const mockWebkitExit = jest.fn().mockResolvedValue(undefined);
    (document as any).webkitExitFullscreen = mockWebkitExit;
    await exitFullscreen();
    expect(mockWebkitExit).toHaveBeenCalled();
    delete (document as any).webkitExitFullscreen;
    Object.defineProperty(document, 'exitFullscreen', {
      value: document.exitFullscreen,
      configurable: true,
      writable: true,
    });
  });
});

describe('requestFullscreen', () => {
  it('calls element.requestFullscreen when available', async () => {
    const el = document.createElement('div');
    const mockReq = jest.fn().mockResolvedValue(undefined);
    (el as any).requestFullscreen = mockReq;
    await requestFullscreen(el);
    expect(mockReq).toHaveBeenCalled();
  });

  it('calls webkitRequestFullscreen as fallback', async () => {
    const el = document.createElement('div');
    (el as any).requestFullscreen = undefined;
    const mockWebkitReq = jest.fn().mockResolvedValue(undefined);
    (el as any).webkitRequestFullscreen = mockWebkitReq;
    await requestFullscreen(el);
    expect(mockWebkitReq).toHaveBeenCalled();
  });

  it('uses document.documentElement as default', async () => {
    const mockReq = jest.fn().mockResolvedValue(undefined);
    (document.documentElement as any).requestFullscreen = mockReq;
    await requestFullscreen();
    expect(mockReq).toHaveBeenCalled();
    delete (document.documentElement as any).requestFullscreen;
  });
});

describe('onFullscreenChange', () => {
  it('registers callback that fires on fullscreenchange', () => {
    const callback = jest.fn();
    const cleanup = onFullscreenChange(callback);
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(callback).toHaveBeenCalled();
    cleanup();
  });

  it('returns cleanup function that removes listener', () => {
    const callback = jest.fn();
    const cleanup = onFullscreenChange(callback);
    cleanup();
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('callback receives boolean isFull value', () => {
    const callback = jest.fn();
    const cleanup = onFullscreenChange(callback);
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(callback).toHaveBeenCalledWith(false);
    cleanup();
  });
});
