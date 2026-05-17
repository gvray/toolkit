const isFullscreen = (): boolean => {
  const doc = document as Document & { webkitFullscreenElement?: Element | null }
  return Boolean(document.fullscreenElement || doc.webkitFullscreenElement)
}

export default isFullscreen
