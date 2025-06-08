import isType from './isType'
/**
 * Checks if a value is an ArrayBuffer object.
 * 检查值是否为ArrayBuffer对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an ArrayBuffer object / 如果值是ArrayBuffer对象则返回true
 *
 * @example
 * ```typescript
 * // Creating ArrayBuffers
 * const buffer1 = new ArrayBuffer(16)
 * const buffer2 = new ArrayBuffer(8)
 *
 * isArrayBuffer(buffer1) // true
 * isArrayBuffer(buffer2) // true
 *
 * // Test with related types
 * const uint8Array = new Uint8Array(buffer1)
 * const dataView = new DataView(buffer1)
 *
 * isArrayBuffer(uint8Array) // false (typed array, not ArrayBuffer)
 * isArrayBuffer(dataView) // false (DataView, not ArrayBuffer)
 * isArrayBuffer(uint8Array.buffer) // true (the underlying buffer)
 *
 * // Test with other types
 * isArrayBuffer([1, 2, 3]) // false (regular array)
 * isArrayBuffer('buffer') // false (string)
 * isArrayBuffer(null) // false
 * isArrayBuffer(undefined) // false
 * isArrayBuffer({}) // false
 *
 * // Practical usage
 * function processBuffer(data: unknown) {
 *   if (isArrayBuffer(data)) {
 *     console.log(`ArrayBuffer size: ${data.byteLength} bytes`)
 *     return new Uint8Array(data)
 *   }
 *   throw new Error('Expected ArrayBuffer')
 * }
 * ```
 *
 * @since 1.0.0
 */
const isArrayBuffer = (value: unknown): value is Array<unknown> => isType('ArrayBuffer', value)

export default isArrayBuffer
