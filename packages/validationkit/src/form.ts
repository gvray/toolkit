import { Schema, SchemaValidationResult, validateSchema } from './schema'

export interface FormField {
  value: any
  error?: string | undefined
  touched?: boolean | undefined
  dirty?: boolean | undefined
}

export interface FormState {
  [key: string]: FormField
}

export interface FormValidationOptions {
  validateOnChange?: boolean
  validateOnBlur?: boolean
  stopOnFirstError?: boolean
}

/**
 * Form validation manager.
 * 表单验证管理器。
 */
export class FormValidator {
  private schema: Schema
  private options: FormValidationOptions

  constructor(schema: Schema, options: FormValidationOptions = {}) {
    this.schema = schema
    this.options = {
      validateOnChange: true,
      validateOnBlur: true,
      stopOnFirstError: false,
      ...options
    }
  }

  /**
   * Validates the entire form.
   * 验证整个表单。
   */
  validateForm(formState: FormState): SchemaValidationResult {
    const data: Record<string, any> = {}

    // Extract values from form state
    for (const [field, fieldState] of Object.entries(formState)) {
      data[field] = fieldState.value
    }

    return validateSchema(data, this.schema)
  }

  /**
   * Validates a single field.
   * 验证单个字段。
   */
  validateField(field: string, value: any): { isValid: boolean; error?: string | undefined } {
    const fieldSchema = this.schema[field]
    if (!fieldSchema) {
      return { isValid: true }
    }

    // Check required
    if (fieldSchema.required && (value === undefined || value === null || value === '')) {
      return {
        isValid: false,
        error: `${fieldSchema.label || field} is required / ${fieldSchema.label || field}为必填项`
      }
    }

    // Skip validation if not required and empty
    if (!fieldSchema.required && (value === undefined || value === null || value === '')) {
      return { isValid: true }
    }

    // Run validators
    for (const validator of fieldSchema.validators) {
      const result = validator(value)
      if (!result.isValid) {
        return {
          isValid: false,
          error: result.message
        }
      }
    }

    return { isValid: true }
  }

  /**
   * Updates form state with validation.
   * 更新表单状态并验证。
   */
  updateField(
    formState: FormState,
    field: string,
    value: any,
    options: { validate?: boolean; markTouched?: boolean } = {}
  ): FormState {
    const { validate = this.options.validateOnChange, markTouched = false } = options

    const newFormState = { ...formState }
    const currentField = newFormState[field] || { value: undefined }

    newFormState[field] = {
      ...currentField,
      value,
      dirty: currentField.value !== value,
      touched: markTouched || currentField.touched
    }

    if (validate) {
      const validation = this.validateField(field, value)
      newFormState[field].error = validation.error
    }

    return newFormState
  }

  /**
   * Marks a field as touched.
   * 标记字段为已触摸。
   */
  touchField(formState: FormState, field: string): FormState {
    const newFormState = { ...formState }
    const currentField = newFormState[field] || { value: undefined }

    newFormState[field] = {
      ...currentField,
      touched: true
    }

    if (this.options.validateOnBlur) {
      const validation = this.validateField(field, currentField.value)
      newFormState[field].error = validation.error
    }

    return newFormState
  }

  /**
   * Checks if the form is valid.
   * 检查表单是否有效。
   */
  isFormValid(formState: FormState): boolean {
    const validation = this.validateForm(formState)
    return validation.isValid
  }

  /**
   * Gets all form errors.
   * 获取所有表单错误。
   */
  getFormErrors(formState: FormState): Record<string, string[]> {
    const validation = this.validateForm(formState)
    return validation.errors
  }
}
