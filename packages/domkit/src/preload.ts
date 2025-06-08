type PreloadType = 'script' | 'style' | 'image' | 'audio' | 'video'

interface PreloadOptions {
  as: PreloadType
  href: string
}

export type { PreloadType }

/**
 * Preload resources according to browser support.
 *
 * @param options - The preload options.
 *
 * @example
 * const preload = getPreloader();
 * preload({ as: 'script', href: 'path/to/script.js' });
 * preload({ as: 'style', href: 'path/to/style.css' });
 * preload({ as: 'image', href: 'path/to/image.png' });
 * preload({ as: 'audio', href: 'path/to/audio.mp3' });
 * preload({ as: 'video', href: 'path/to/video.mp4' });
 *
 * @since 1.0.0
 */
const getPreloader = (): ((options: PreloadOptions) => void) => {
  const supportLink = typeof HTMLLinkElement !== 'undefined'
  const supportBeacon = typeof navigator !== 'undefined' && !!navigator.sendBeacon
  const supportImage = typeof Image !== 'undefined'

  const preloadWithLink = (options: PreloadOptions) => {
    const { as, href } = options
    const link = document.createElement('link')
    link.rel = 'preload'
    link.setAttribute('as', as)
    link.href = href
    document.head.appendChild(link)
  }

  const preloadWithBeacon = (options: PreloadOptions) => {
    const { href } = options
    const xhr = new XMLHttpRequest()
    xhr.open('HEAD', href, true)
    xhr.send()
  }

  const preloadWithImage = (options: PreloadOptions) => {
    const { href } = options
    const img = new Image()
    img.src = href
  }

  let preload: (options: PreloadOptions) => void

  if (supportLink) {
    preload = preloadWithLink
  } else if (supportBeacon) {
    preload = preloadWithBeacon
  } else if (supportImage) {
    preload = preloadWithImage
  } else {
    preload = () => {}
  }

  return preload
}

export default getPreloader()
