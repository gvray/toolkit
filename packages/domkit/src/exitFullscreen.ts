/**
 * Exits fullscreen mode, using the vendor-prefixed API when necessary.
 *
 * @returns A promise that resolves when fullscreen has been exited.
 *
 * @example
 * exitFullscreen()
 *
 * @since 1.0.0
 */
const exitFullscreen = async (): Promise<void> => {
  const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> };
  if (document.exitFullscreen) await document.exitFullscreen();
  else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
};

export default exitFullscreen;
