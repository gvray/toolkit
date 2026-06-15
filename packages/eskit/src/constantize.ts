/**
 * Freezes an object and its immediate properties (shallow freeze).
 * 冻结对象及其直接属性（浅冻结）。
 *
 * @param obj - The object to freeze / 要冻结的对象
 *
 * @example
 * const config = { api: { url: 'https://api.example.com', timeout: 5000 }, debug: true }
 * constantize(config)
 * Object.isFrozen(config) // => true
 * Object.isFrozen(config.api) // => true
 * try {
 *   config.debug = false
 * } catch (e) {
 *   e.message // => Cannot assign to read only property 'debug'...
 * }
 *
 * @since 1.0.0
 */
const constantize = <T extends Record<string, any>>(obj: T): void => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (typeof val === 'object' && val !== null) {
      Object.freeze(val);
    }
  });
};
export default constantize;
