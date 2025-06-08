import hasOwnProperty from './hasOwnProperty'
import isArray from './isArray'
import isDate from './isDate'
import isFunction from './isFunction'
import isObject from './isObject'
import isRegExp from './isRegExp'

/**
 * Creates a deep clone of the given value, handling circular references.
 * 创建给定值的深度克隆，处理循环引用。
 *
 * This function recursively copies all properties of objects and arrays,
 * including nested objects, while maintaining the original data types
 * for dates, regular expressions, and other built-in objects.
 * 此函数递归复制对象和数组的所有属性，包括嵌套对象，
 * 同时保持日期、正则表达式和其他内置对象的原始数据类型。
 *
 * @template T - The type of the value to clone / 要克隆的值的类型
 * @param obj - The value to deep clone / 要深度克隆的值
 * @returns A deep copy of the input value / 输入值的深度副本
 *
 * @example
 * ```typescript
 * const original = {
 *   name: 'John',
 *   age: 30,
 *   hobbies: ['reading', 'gaming'],
 *   address: { city: 'New York', zip: '10001' },
 *   createdAt: new Date(),
 *   pattern: /test/gi
 * }
 *
 * const cloned = deepClone(original)
 * cloned.hobbies.push('swimming') // doesn't affect original
 * console.log(original.hobbies) // ['reading', 'gaming']
 *
 * // Handles circular references
 * const circular: any = { name: 'test' }
 * circular.self = circular
 * const clonedCircular = deepClone(circular) // works without infinite recursion
 * ```
 *
 * @since 1.0.0
 */
function deepClone<T>(obj: T): T {
  const clonedMap = new Map<any, any>()

  const cloneValue = (value: any): any => {
    if (!isObject(value)) {
      return value
    }

    if (clonedMap.has(value)) {
      return clonedMap.get(value)
    }

    let clonedObj: any

    if (isFunction(value)) {
      // Functions are returned as-is since they are immutable
      return value
    } else if (isArray(value)) {
      clonedObj = []
      clonedMap.set(value, clonedObj)

      for (let i = 0; i < value.length; i++) {
        clonedObj[i] = cloneValue(value[i])
      }
    } else if (isDate(value)) {
      clonedObj = new Date(value.getTime())
      clonedMap.set(value, clonedObj)
    } else if (isRegExp(value)) {
      clonedObj = new RegExp(value.source, value.flags)
      clonedMap.set(value, clonedObj)
    } else {
      clonedObj = Object.create(null)
      clonedMap.set(value, clonedObj)

      for (const key in value) {
        if (hasOwnProperty(value, key)) {
          clonedObj[key] = cloneValue(value[key])
        }
      }
    }

    return clonedObj
  }

  return cloneValue(obj)
}

export default deepClone
