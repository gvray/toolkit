import observeScroll from '../src/observeScroll';

describe('observeScroll', () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('calls onScroll when scroll event fires', () => {
    const onScroll = jest.fn();
    observeScroll(el, onScroll);
    el.dispatchEvent(new Event('scroll'));
    expect(onScroll).toHaveBeenCalled();
  });

  it('returns a function that stops observing', () => {
    const onScroll = jest.fn();
    const stop = observeScroll(el, onScroll);
    stop();
    el.dispatchEvent(new Event('scroll'));
    expect(onScroll).not.toHaveBeenCalled();
  });

  it('calls onScrollStop via requestAnimationFrame', () => {
    jest.useFakeTimers();
    const onScroll = jest.fn();
    const onScrollStop = jest.fn();
    observeScroll(el, onScroll, onScrollStop);
    el.dispatchEvent(new Event('scroll'));
    // requestAnimationFrame callback fires
    jest.runAllTimers();
    expect(onScrollStop).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('does not call onScroll twice before checkScrollStop runs', () => {
    const onScroll = jest.fn();
    observeScroll(el, onScroll);
    el.dispatchEvent(new Event('scroll'));
    el.dispatchEvent(new Event('scroll')); // Should be ignored while isScrolling
    expect(onScroll).toHaveBeenCalledTimes(1);
  });

  it('works without onScrollStop callback', () => {
    jest.useFakeTimers();
    const onScroll = jest.fn();
    observeScroll(el, onScroll);
    el.dispatchEvent(new Event('scroll'));
    expect(() => jest.runAllTimers()).not.toThrow();
    jest.useRealTimers();
  });
});
