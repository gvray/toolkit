import isBrowser from './isBrowser';

/**
 * Registers a callback for when the browser goes offline and returns an unsubscribe function.
 *
 * @example
 * const off = onOffline(() => console.log('went offline'))
 * off()
 * @since 1.0.0
 */
const onOffline = (callback: () => void): (() => void) => {
  if (!isBrowser()) return () => undefined;
  window.addEventListener('offline', callback);
  return () => window.removeEventListener('offline', callback);
};

export default onOffline;
