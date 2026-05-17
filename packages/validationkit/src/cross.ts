import { ValidationResult, Validator } from './validators'

/**
 * Cross-field validator factory.
 * 跨字段校验器工厂。
 *
 * @param fields - Field names participating in validation / 参与校验的字段名
 * @param predicate - Cross-field predicate / 跨字段判断函数
 * @param message - Error message / 错误信息
 * @returns Validator for the whole object / 针对整个对象的校验器
 *
 * @example
 * cross(['password', 'confirm'], (data) => data.password === data.confirm)
 */
export function cross<T extends Record<string, unknown>>(
  fields: readonly (keyof T & string)[],
  predicate: (value: T) => boolean,
  message = 'Cross-field validation failed / 跨字段校验失败'
): Validator<T> {
  return (value: T): ValidationResult => {
    const picked = fields.reduce<Record<string, unknown>>((acc, field) => {
      acc[field] = value[field]
      return acc
    }, {})

    const hasMissing = fields.some((field) => picked[field] === undefined)
    if (hasMissing) {
      return { isValid: true }
    }

    return {
      isValid: predicate(value),
      message: predicate(value) ? undefined : message
    }
  }
}
