import isType from './isType';
/**
 * Checks if a value is an ArrayBuffer object.
 * 检查值是否为ArrayBuffer对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an ArrayBuffer object / 如果值是ArrayBuffer对象则返回true
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(16)
 * const uint8Array = new Uint8Array(buffer)
 * const dataView = new DataView(buffer)
 *
 * isArrayBuffer(buffer) // => true
 * isArrayBuffer(uint8Array) // => false (typed array, not ArrayBuffer)
 * isArrayBuffer(dataView) // => false (DataView, not ArrayBuffer)
 * isArrayBuffer(uint8Array.buffer) // => true (the underlying buffer)
 * isArrayBuffer([1, 2, 3]) // => false
 * isArrayBuffer('buffer') // => false
 * isArrayBuffer(null) // => false
 * ```
 *
 * @since 1.0.0
 */
const isArrayBuffer = (value: unknown): value is Array<unknown> => isType('ArrayBuffer', value);

export default isArrayBuffer;
