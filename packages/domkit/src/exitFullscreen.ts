const exitFullscreen = async (): Promise<void> => {
  const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> }
  if (document.exitFullscreen) await document.exitFullscreen()
  else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen()
}

export default exitFullscreen
