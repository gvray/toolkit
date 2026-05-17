const onFullscreenChange = (callback: (isFull: boolean) => void): (() => void) => {
  const handler = (): void => callback(Boolean(document.fullscreenElement))
  document.addEventListener('fullscreenchange', handler)
  return () => document.removeEventListener('fullscreenchange', handler)
}

export default onFullscreenChange
