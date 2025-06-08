import each from './each'

/**
 * Creates a new object with only the specified properties from the source object.
 * 从源对象中创建一个只包含指定属性的新对象。
 *
 * This function is useful for extracting specific properties from an object,
 * creating a subset with only the properties you need.
 * 此函数对于从对象中提取特定属性很有用，
 * 创建一个只包含所需属性的子集。
 *
 * @template T - The type of the source object / 源对象的类型
 * @template K - The keys to pick from the object / 要从对象中选择的键
 * @param obj - The source object / 源对象
 * @param keys - The property keys to pick / 要选择的属性键
 * @returns A new object with only the picked properties / 只包含选择属性的新对象
 *
 * @example
 * ```typescript
 * // Basic usage / 基本用法
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret',
 *   role: 'admin'
 * }
 *
 * const publicUser = pick(user, 'id', 'name', 'email')
 * // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * // With different types / 不同类型
 * const config = {
 *   host: 'localhost',
 *   port: 3000,
 *   debug: true,
 *   secret: 'my-secret',
 *   timeout: 5000
 * }
 *
 * const serverConfig = pick(config, 'host', 'port', 'timeout')
 * // { host: 'localhost', port: 3000, timeout: 5000 }
 *
 * // Empty selection / 空选择
 * const empty = pick(user)
 * // {}
 * ```
 *
 * @since 1.0.0
 */
const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  const newObj = {} as Pick<T, K>
  each(keys, (key) => {
    newObj[key] = obj[key]
  })
  return newObj
}

export default pick
