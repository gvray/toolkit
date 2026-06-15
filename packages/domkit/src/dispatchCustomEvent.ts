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
 * const el = document.createElement('div')
 * document.body.appendChild(el)
 * el.addEventListener('my-event', (e) => console.log('fired', e.detail))
 * dispatchCustomEvent(el, 'my-event', { data: 1 })
 *
 * @since 1.0.0
 */
const dispatchCustomEvent = <T>(target: EventTarget, eventName: string, detail?: T): boolean => {
  const event = new CustomEvent<T>(eventName, {
    bubbles: true,
    cancelable: true,
    ...(detail !== undefined ? { detail } : {}),
  });

  return target.dispatchEvent(event);
};

export default dispatchCustomEvent;
