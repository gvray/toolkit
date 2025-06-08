import { ValidationResult, Validator } from './validators'

export interface SchemaField {
  validators: Validator[]
  required?: boolean
  label?: string
}

export interface Schema {
  [key: string]: SchemaField
}

export interface SchemaValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
}

/**
 * Validates an object against a schema.
 * 根据模式验证对象。
 *
 * @param data - The data to validate / 要验证的数据
 * @param schema - The validation schema / 验证模式
 * @returns Validation result / 验证结果
 *
 * @example
 * ```typescript
 * const userSchema = {
 *   email: { validators: [required, email], required: true },
 *   age: { validators: [min(18), max(120)] }
 * }
 *
 * const result = validateSchema({ email: 'test@example.com', age: 25 }, userSchema)
 * ```
 */
export function validateSchema(data: Record<string, any>, schema: Schema): SchemaValidationResult {
  const errors: Record<string, string[]> = {}
  let isValid = true

  for (const [field, config] of Object.entries(schema)) {
    const value = data[field]
    const fieldErrors: string[] = []

    // Check if required field is missing
    if (config.required && (value === undefined || value === null || value === '')) {
      fieldErrors.push(`${config.label || field} is required / ${config.label || field}为必填项`)
      isValid = false
      errors[field] = fieldErrors
      continue
    }

    // Skip validation if field is not required and empty
    if (!config.required && (value === undefined || value === null || value === '')) {
      continue
    }

    // Run validators
    for (const validator of config.validators) {
      const result = validator(value)
      if (!result.isValid && result.message) {
        fieldErrors.push(result.message)
        isValid = false
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }

  return { isValid, errors }
}
