import { FormValidator } from '../src/form'
import { required, email, minLength, min } from '../src/validators'

describe('form', () => {
  const schema = {
    email: {
      validators: [email],
      required: true,
      label: 'Email'
    },
    name: {
      validators: [minLength(2)],
      required: true,
      label: 'Name'
    },
    age: {
      validators: [min(18)],
      required: false,
      label: 'Age'
    }
  }

  let formValidator: FormValidator

  beforeEach(() => {
    formValidator = new FormValidator(schema)
  })

  describe('FormValidator', () => {
    describe('validateForm', () => {
      it('should validate entire form successfully', () => {
        const formState = {
          email: { value: 'test@example.com' },
          name: { value: 'John Doe' },
          age: { value: 25 }
        }

        const result = formValidator.validateForm(formState)
        expect(result.isValid).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should detect form validation errors', () => {
        const formState = {
          email: { value: 'invalid-email' },
          name: { value: 'J' },
          age: { value: 15 }
        }

        const result = formValidator.validateForm(formState)
        expect(result.isValid).toBe(false)
        expect(result.errors.email).toBeDefined()
        expect(result.errors.name).toBeDefined()
        expect(result.errors.age).toBeDefined()
      })
    })

    describe('validateField', () => {
      it('should validate single field successfully', () => {
        const result = formValidator.validateField('email', 'test@example.com')
        expect(result.isValid).toBe(true)
        expect(result.error).toBeUndefined()
      })

      it('should detect single field validation error', () => {
        const result = formValidator.validateField('email', 'invalid-email')
        expect(result.isValid).toBe(false)
        expect(result.error).toBe('Invalid email format / 邮箱格式无效')
      })

      it('should handle required field validation', () => {
        const result = formValidator.validateField('email', '')
        expect(result.isValid).toBe(false)
        expect(result.error).toBe('Email is required / Email为必填项')
      })

      it('should skip validation for non-required empty fields', () => {
        const result = formValidator.validateField('age', '')
        expect(result.isValid).toBe(true)
        expect(result.error).toBeUndefined()
      })

      it('should return valid for unknown fields', () => {
        const result = formValidator.validateField('unknownField', 'any value')
        expect(result.isValid).toBe(true)
        expect(result.error).toBeUndefined()
      })
    })

    describe('updateField', () => {
      it('should update field value', () => {
        const initialState = {
          email: { value: '' }
        }

        const newState = formValidator.updateField(initialState, 'email', 'test@example.com')
        expect(newState.email.value).toBe('test@example.com')
        expect(newState.email.dirty).toBe(true)
      })

      it('should validate field when validate option is true', () => {
        const initialState = {
          email: { value: '' }
        }

        const newState = formValidator.updateField(initialState, 'email', 'invalid-email', { validate: true })
        expect(newState.email.error).toBe('Invalid email format / 邮箱格式无效')
      })

      it('should not validate field when validate option is false', () => {
        const initialState = {
          email: { value: '' }
        }

        const newState = formValidator.updateField(initialState, 'email', 'invalid-email', { validate: false })
        expect(newState.email.error).toBeUndefined()
      })

      it('should mark field as touched when markTouched is true', () => {
        const initialState = {
          email: { value: '' }
        }

        const newState = formValidator.updateField(initialState, 'email', 'test@example.com', { markTouched: true })
        expect(newState.email.touched).toBe(true)
      })

      it('should preserve existing touched state', () => {
        const initialState = {
          email: { value: '', touched: true }
        }

        const newState = formValidator.updateField(initialState, 'email', 'test@example.com')
        expect(newState.email.touched).toBe(true)
      })

      it('should create new field if it does not exist', () => {
        const initialState = {}

        const newState = formValidator.updateField(initialState, 'newField', 'value')
        expect(newState.newField.value).toBe('value')
        expect(newState.newField.dirty).toBe(true)
      })
    })

    describe('touchField', () => {
      it('should mark field as touched', () => {
        const initialState = {
          email: { value: 'test@example.com' }
        }

        const newState = formValidator.touchField(initialState, 'email')
        expect(newState.email.touched).toBe(true)
      })

      it('should validate field on blur when validateOnBlur is enabled', () => {
        const validatorWithBlurValidation = new FormValidator(schema, { validateOnBlur: true })
        const initialState = {
          email: { value: 'invalid-email' }
        }

        const newState = validatorWithBlurValidation.touchField(initialState, 'email')
        expect(newState.email.error).toBe('Invalid email format / 邮箱格式无效')
      })

      it('should not validate field on blur when validateOnBlur is disabled', () => {
        const validatorWithoutBlurValidation = new FormValidator(schema, { validateOnBlur: false })
        const initialState = {
          email: { value: 'invalid-email' }
        }

        const newState = validatorWithoutBlurValidation.touchField(initialState, 'email')
        expect(newState.email.error).toBeUndefined()
      })

      it('should create field if it does not exist', () => {
        const initialState = {}

        const newState = formValidator.touchField(initialState, 'newField')
        expect(newState.newField.touched).toBe(true)
      })
    })

    describe('isFormValid', () => {
      it('should return true for valid form', () => {
        const formState = {
          email: { value: 'test@example.com' },
          name: { value: 'John Doe' }
        }

        expect(formValidator.isFormValid(formState)).toBe(true)
      })

      it('should return false for invalid form', () => {
        const formState = {
          email: { value: 'invalid-email' },
          name: { value: 'J' }
        }

        expect(formValidator.isFormValid(formState)).toBe(false)
      })
    })

    describe('getFormErrors', () => {
      it('should return empty errors for valid form', () => {
        const formState = {
          email: { value: 'test@example.com' },
          name: { value: 'John Doe' }
        }

        const errors = formValidator.getFormErrors(formState)
        expect(errors).toEqual({})
      })

      it('should return errors for invalid form', () => {
        const formState = {
          email: { value: 'invalid-email' },
          name: { value: 'J' }
        }

        const errors = formValidator.getFormErrors(formState)
        expect(errors.email).toBeDefined()
        expect(errors.name).toBeDefined()
      })
    })

    describe('constructor options', () => {
      it('should use default options', () => {
        const validator = new FormValidator(schema)
        const initialState = { email: { value: '' } }

        // Should validate on change by default
        const newState = validator.updateField(initialState, 'email', 'invalid-email')
        expect(newState.email.error).toBe('Invalid email format / 邮箱格式无效')
      })

      it('should respect validateOnChange option', () => {
        const validator = new FormValidator(schema, { validateOnChange: false })
        const initialState = { email: { value: '' } }

        const newState = validator.updateField(initialState, 'email', 'invalid-email')
        expect(newState.email.error).toBeUndefined()
      })
    })
  })
})
