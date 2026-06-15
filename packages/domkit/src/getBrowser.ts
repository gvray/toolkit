import isBrowser from './isBrowser';

/**
 * Returns the name of the current browser, or `'Unknown'` outside a browser environment.
 *
 * @example
 * getBrowser() // => 'Chrome'
 * @since 1.0.0
 */
const getBrowser = (): string => {
  if (!isBrowser()) return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  return 'Unknown';
};

export default getBrowser;
