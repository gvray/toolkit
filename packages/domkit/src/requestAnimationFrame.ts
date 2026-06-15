/**
 * The requestAnimationFrame() method tells the browser that you wish to perform an animation
 * and requests that the browser calls a specified function to update an animation before the
 * next repaint. The method takes as an argument a callback to be invoked before the repaint.
 * The callback accepts a parameter, a timestamp, which indicates the current time when callbacks
 * queued by requestAnimationFrame() begin to fire.
 *
 * This method searches for the appropriate version of requestAnimationFrame() to use, with fallbacks
 * for older versions in use by some browsers.
 *
 * @param fn A function specifying the animation to perform for each frame.
 * @returns A numeric ID which can be passed to cancelAnimationFrame() to cancel the requested animation.
 *
 * @example
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * const id = requestAnimationFrame(() => { el.style.top = '2px' })
 * console.log(typeof id)
 *
 * @since 1.0.0
 */
const requestAnimationFrame = (fn: FrameRequestCallback): number => {
  const method =
    window.requestAnimationFrame ||
    // @ts-expect-error vendor prefix not in TS types
    window.webkitRequestAnimationFrame ||
    // @ts-expect-error vendor prefix not in TS types
    window.mozRequestAnimationFrame ||
    // @ts-expect-error vendor prefix not in TS types
    window.msRequestAnimationFrame ||
    function (f) {
      return setTimeout(f, 16);
    };

  return method(fn);
};
export default requestAnimationFrame;
