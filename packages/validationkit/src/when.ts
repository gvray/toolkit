import { ValidationResult, Validator } from './validators'

/**
 * Applies validators only when a field matches the expected value.
 * 仅当字段等于期望值时才应用一组校验器。
 *
 * @param field - Dependent field name / 依赖字段名
 * @param expected - Expected value / 期望值
 * @param validators - Validators to run / 要执行的校验器
 * @returns Conditional validator for the whole object / 针对整个对象的校验器
 *
 * @example
 * when('type', 'admin', [required()])
 */
export function when<T extends Record<string, unknown>>(
  field: keyof T & string,
  expected: unknown,
  validators: Validator<T>[]
): Validator<T> {
  return (value: T): ValidationResult => {
    if (value?.[field] !== expected) {
      return { isValid: true }
    }

    for (const validator of validators) {
      const result = validator(value)
      if (!result.isValid) {
        return result
      }
    }

    return { isValid: true }
  }
}
