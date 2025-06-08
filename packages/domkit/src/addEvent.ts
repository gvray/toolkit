import { throttle, debounced } from '@gvray/eskit'
/**
 * Adds an event listener to a given element.
 *
 * @example
 * const button = document.querySelector('button');
 * addEvent(button, 'click', () => console.log('Button clicked!'));
 *
 * @param ele - The element to which the event listener should be added.
 * @param type - The type of event to listen for.
 * @param eventHandle - The function to be called when the event occurs.
 * @param options - Additional options to modify the behavior of the event listener.
 * @param options.useCapture - A boolean indicating whether events of this type should be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
 * @param options.useThrottle - A boolean indicating whether the event handler should be throttled.
 * @param options.useDebounce - A boolean indicating whether the event handler should be debounced.
 * @returns A function to remove the event listener.
 * @since 1.0.0
 */
const addEvent = <T extends HTMLElement | SVGElement>(
  ele: T,
  type: keyof HTMLElementEventMap,
  eventHandle: (ev: HTMLElementEventMap[keyof HTMLElementEventMap]) => void,
  { useCapture = false, useThrottle = false, useDebounce = false } = {}
): (() => void) | undefined => {
  if (!ele) return undefined
  let callback = eventHandle
  if (useThrottle) {
    callback = throttle(eventHandle, 201, { leading: true })
  }
  if (useDebounce) {
    callback = debounced(eventHandle, 201)
  }

  if (ele.addEventListener) {
    ele.addEventListener(type, callback, useCapture)
    return () => ele.removeEventListener(type, callback, useCapture)
  } else {
    console.warn('addEventListener is not supported in this browser')
    return undefined
  }
}

export default addEvent
