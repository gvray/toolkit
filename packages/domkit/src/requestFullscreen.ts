/**
 * Requests fullscreen for an element, using the vendor-prefixed API when necessary.
 *
 * @param element - The element to display in fullscreen. Defaults to `document.documentElement`.
 * @returns A promise that resolves when fullscreen has been entered.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * requestFullscreen(el).catch(e => console.log('blocked:', e.message))
 *
 * @since 1.0.0
 */
const requestFullscreen = async (element: Element = document.documentElement): Promise<void> => {
  const el = element as HTMLElement & {
    requestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  };
  if (el.requestFullscreen) await el.requestFullscreen();
  else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
};

export default requestFullscreen;
