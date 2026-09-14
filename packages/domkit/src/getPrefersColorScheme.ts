import isBrowser from './isBrowser';

/**
 * The user's preferred color scheme, matching the values of the
 * [CSS `prefers-color-scheme` media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Returns the user's preferred color scheme according to the
 * `prefers-color-scheme` CSS media feature.
 *
 * Returns `'dark'` only when the user has actively expressed a preference for
 * dark; returns `'light'` otherwise, including in non-browser environments
 * (e.g. SSR) where the media query cannot be evaluated.
 *
 * @returns The current preferred color scheme.
 *
 * @example
 * getPrefersColorScheme()
 * // => 'dark'
 *
 * @since 1.3.0
 */
const getPrefersColorScheme = (): ColorScheme => {
  if (!isBrowser()) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default getPrefersColorScheme;
