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
 * ```typescript
 * // As a default callback / 作为默认回调
 * function processData(data: any[], callback = noop) {
 *   // Process data...
 *   callback()
 * }
 *
 * // As a placeholder in event handlers / 作为事件处理程序中的占位符
 * const button = {
 *   onClick: noop, // Default empty handler
 *   onHover: noop
 * }
 *
 * // In conditional assignments / 在条件赋值中
 * const handler = shouldHandle ? actualHandler : noop
 *
 * // For testing / 用于测试
 * const mockCallback = noop
 * someFunction(data, mockCallback)
 * ```
 *
 * @since 1.0.0
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
const noop = () => {}

export default noop
