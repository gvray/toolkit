import isBrowser from './isBrowser';

/**
 * Returns `true` if WebP image format is supported in the current browser.
 *
 * @example
 * const result = await supportsWebP()
 * result // => true or false
 * @since 1.0.0
 */
const supportsWebP = (): Promise<boolean> => {
  if (!isBrowser()) return Promise.resolve(false);
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width === 1);
    image.onerror = () => resolve(false);
    image.src =
      'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAAQAcJaQAA3AA/vuUAAA=';
  });
};

export default supportsWebP;
