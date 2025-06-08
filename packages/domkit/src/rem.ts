interface RemOptions {
  maxWith?: number
  minWith?: number
  scale?: number
}
/**
 * Set font size of HTML tag according to the design width.
 *
 * @param designWidth - The design width of the page.
 * @param options - The optional parameters.
 *
 * @example
 * // Sets the HTML font size based on a design width of 750 pixels
 * // with a maximum width of 2000 pixels and a minimum width of 375 pixels.
 * rem(750, { maxWith: 2000, minWith: 375 });
 */
const rem = (designWidth: number, options: RemOptions = {}): void => {
  const { maxWith = 1000, minWith = 100, scale = 100 } = options

  const changeHtmlSize = function () {
    const htmlTag = document.documentElement
    const { clientWidth } = htmlTag
    if (clientWidth === 0 || designWidth === 0) {
      htmlTag.style.fontSize = '0px'
      return
    }

    if (clientWidth < 0) {
      htmlTag.style.fontSize = '0px'
      return
    }

    const screenWidth = Math.max(Math.min(clientWidth, maxWith), minWith)
    const fontSize = `${(screenWidth / designWidth) * scale}px`
    htmlTag.style.fontSize = fontSize
    document.documentElement.style.setProperty('--html-font-size', fontSize)
  }

  const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let timer: number | null = null
  const handleWindowResize = () => {
    if (timer) {
      // 取消上一次未执行的任务
      window.cancelAnimationFrame(timer)
      timer = null
    }

    timer = window.requestAnimationFrame(changeHtmlSize)
  }

  // 立即执行一次
  changeHtmlSize()

  handleWindowResize()
  window.addEventListener(resizeEvent, handleWindowResize, false)
  document.addEventListener('DOMContentLoaded', changeHtmlSize, false)
}

export default rem
