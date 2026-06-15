/**
 * Returns whether the document is currently in fullscreen mode.
 *
 * @returns `true` when fullscreen is active.
 *
 * @example
 * isFullscreen() // => false
 *
 * @since 1.0.0
 */
const isFullscreen = (): boolean => {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return Boolean(document.fullscreenElement || doc.webkitFullscreenElement);
};

export default isFullscreen;
