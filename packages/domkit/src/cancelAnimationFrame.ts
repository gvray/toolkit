/**
 * Cancel animation frame
 * @param {number} handler The return that requestAnimationFrame back
 * @since 1.0.0
 * @example
 * const tick = () => {}
 * const id = requestAnimationFrame(tick)
 * cancelAnimationFrame(id)
 * console.log(typeof id)
 * @todo jest
 */
const cancelAnimationFrame = (handler: number): void => {
  const method =
    window.cancelAnimationFrame ||
    // @ts-expect-error vendor prefix not in TS types
    window.webkitCancelAnimationFrame ||
    // @ts-expect-error vendor prefix not in TS types
    window.mozCancelAnimationFrame ||
    // @ts-expect-error vendor prefix not in TS types
    window.msCancelAnimationFrame ||
    clearTimeout;

  method(handler);
};

export default cancelAnimationFrame;
