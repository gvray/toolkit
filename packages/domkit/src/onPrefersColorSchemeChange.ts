import isBrowser from './isBrowser';
import type { ColorScheme } from './getPrefersColorScheme';

/**
 * Subscribes to changes of the user's preferred color scheme, as reported by
 * the `prefers-color-scheme` CSS media feature.
 *
 * Does not fire in non-browser environments; returns a no-op unsubscribe.
 *
 * @param callback Called with the new color scheme whenever it changes.
 * @returns A cleanup function that removes the listener.
 *
 * @example
 * const off = onPrefersColorSchemeChange((scheme) => {
 *   console.log(scheme) // 'light' | 'dark'
 * })
 * off() // unsubscribe
 *
 * @since 1.3.0
 */
const onPrefersColorSchemeChange = (callback: (scheme: ColorScheme) => void): (() => void) => {
  if (!isBrowser()) return () => undefined;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (event: MediaQueryListEvent): void => {
    callback(event.matches ? 'dark' : 'light');
  };
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
};

export default onPrefersColorSchemeChange;
