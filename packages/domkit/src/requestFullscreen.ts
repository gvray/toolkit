/**
 * Requests fullscreen for an element.
 */
const requestFullscreen = async (element: Element = document.documentElement): Promise<void> => {
  const el = element as HTMLElement & {
    requestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
  }
  if (el.requestFullscreen) await el.requestFullscreen()
  else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen()
}

export default requestFullscreen
