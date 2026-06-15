import isBrowser from './isBrowser';

/**
 * Returns `true` if WebGL is supported in the current browser environment.
 *
 * @example
 * supportsWebGL() // true in most modern browsers
 * @since 1.0.0
 */
const supportsWebGL = (): boolean => {
  if (!isBrowser()) return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

export default supportsWebGL;
