import isBrowser from './isBrowser';

/**
 * Returns the current platform: `'iOS'`, `'Android'`, `'MacOS'`, `'Windows'`, `'Linux'`, or `'Unknown'`.
 *
 * @example
 * getPlatform() // => 'MacOS'
 * @since 1.0.0
 */
const getPlatform = (): string => {
  if (!isBrowser()) return 'Unknown';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Mac OS X/i.test(ua)) return 'MacOS';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown';
};

export default getPlatform;
