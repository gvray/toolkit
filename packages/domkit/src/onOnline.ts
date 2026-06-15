import isBrowser from './isBrowser';

/**
 * Registers a callback for when the browser comes back online and returns an unsubscribe function.
 *
 * @example
 * const off = onOnline(() => console.log('back online'))
 * off()
 * @since 1.0.0
 */
const onOnline = (callback: () => void): (() => void) => {
  if (!isBrowser()) return () => undefined;
  window.addEventListener('online', callback);
  return () => window.removeEventListener('online', callback);
};

export default onOnline;
