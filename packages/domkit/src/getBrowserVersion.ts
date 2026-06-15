import isBrowser from './isBrowser';

/**
 * Returns the version string of the current browser, or `''` outside a browser environment.
 *
 * @example
 * getBrowserVersion() // => '120.0.6099.109'
 * @since 1.0.0
 */
const getBrowserVersion = (): string => {
  if (!isBrowser()) return '';
  const ua = navigator.userAgent;
  const match =
    ua.match(/(?:Edg|OPR)\/([\d.]+)/) ?? ua.match(/(?:Firefox|Chrome|Version)\/([\d.]+)/);
  return match?.[1] ?? '';
};

export default getBrowserVersion;
