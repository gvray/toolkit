/**
 * Dispatches a custom event with optional detail data.
 *
 * @template T - The event detail type.
 * @param target - The target element.
 * @param eventName - The event name.
 * @param detail - The detail payload.
 * @returns `true` when the event was not canceled.
 *
 * @example
 * dispatchCustomEvent(el, 'my-event', { data: 1 })
 * // -> true
 */
const dispatchCustomEvent = <T>(target: EventTarget, eventName: string, detail?: T): boolean => {
  const event = new CustomEvent<T>(eventName, {
    bubbles: true,
    cancelable: true,
    ...(detail !== undefined ? { detail } : {})
  })

  return target.dispatchEvent(event)
}

export default dispatchCustomEvent
