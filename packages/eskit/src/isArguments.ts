import isType from './isType';
/**
 * Checks if a value is an arguments object.
 * 检查值是否为arguments对象。
 *
 * @param value - The value to check / 要检查的值
 * @returns True if the value is an arguments object / 如果值是arguments对象则返回true
 *
 * @example
 * function testArgs() { return isArguments(arguments) }
 * testArgs() // => true
 * isArguments([]) // => false
 * isArguments({ length: 0 }) // => false
 *
 * @since 1.0.0
 */
const isArguments = (value: unknown): boolean => isType('Arguments', value);
export default isArguments;
