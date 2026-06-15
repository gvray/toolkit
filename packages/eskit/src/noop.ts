/**
 * A function that does nothing and returns undefined.
 * 一个什么都不做并返回undefined的函数。
 *
 * This function is useful as a default callback or placeholder function
 * when you need to provide a function but don't want it to do anything.
 * 当您需要提供一个函数但不希望它执行任何操作时，
 * 此函数作为默认回调或占位符函数很有用。
 *
 * @returns undefined
 *
 * @example
 * typeof noop // => 'function'
 * noop() // => undefined
 * noop(1, 2, 3) // => undefined
 *
 * @since 1.0.0
 */

const noop = () => {};

export default noop;
