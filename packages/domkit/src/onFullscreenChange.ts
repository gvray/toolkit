/**
 * Registers a callback that fires whenever the document enters or exits fullscreen mode.
 *
 * @param callback - Called with `true` when entering fullscreen, `false` when exiting.
 * @returns A cleanup function that removes the listener.
 *
 * @example
 * const off = onFullscreenChange((isFull) => console.log(isFull))
 * off() // remove listener
 *
 * @since 1.0.0
 */
const onFullscreenChange = (callback: (isFull: boolean) => void): (() => void) => {
  const handler = (): void => {
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    callback(Boolean(document.fullscreenElement || doc.webkitFullscreenElement));
  };
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler as EventListener);
  return () => {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler as EventListener);
  };
};

export default onFullscreenChange;
