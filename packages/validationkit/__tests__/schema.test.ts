import { validateSchema } from '../src/schema'
import { required, email, minLength, min, max } from '../src/validators'

describe('schema', () => {
  describe('validateSchema', () => {
    const userSchema = {
      email: {
        validators: [email],
        required: true,
        label: 'Email Address'
      },
      name: {
        validators: [minLength(2)],
        required: true,
        label: 'Full Name'
      },
      age: {
        validators: [min(18), max(120)],
        required: false,
        label: 'Age'
      },
      bio: {
        validators: [minLength(10)],
        required: false,
        label: 'Biography'
      }
    }

    it('should validate valid data', () => {
      const validData = {
        email: 'test@example.com',
        name: 'John Doe',
        age: 25,
        bio: 'This is a valid biography'
      }

      const result = validateSchema(validData, userSchema)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should detect missing required fields', () => {
      const invalidData = {
        age: 25
      }

      const result = validateSchema(invalidData, userSchema)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('Email Address is required / Email Address为必填项')
      expect(result.errors.name).toContain('Full Name is required / Full Name为必填项')
    })

    it('should validate individual field constraints', () => {
      const invalidData = {
        email: 'invalid-email',
        name: 'J',
        age: 15,
        bio: 'short'
      }

      const result = validateSchema(invalidData, userSchema)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('Invalid email format / 邮箱格式无效')
      expect(result.errors.name).toContain('Minimum length is 2 characters / 最小长度为2个字符')
      expect(result.errors.age).toContain('Minimum value is 18 / 最小值为18')
      expect(result.errors.bio).toContain('Minimum length is 10 characters / 最小长度为10个字符')
    })

    it('should skip validation for non-required empty fields', () => {
      const dataWithEmptyOptional = {
        email: 'test@example.com',
        name: 'John Doe',
        age: undefined,
        bio: ''
      }

      const result = validateSchema(dataWithEmptyOptional, userSchema)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should handle null and undefined values for required fields', () => {
      const dataWithNulls = {
        email: null,
        name: undefined,
        age: 25
      }

      const result = validateSchema(dataWithNulls, userSchema)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('Email Address is required / Email Address为必填项')
      expect(result.errors.name).toContain('Full Name is required / Full Name为必填项')
    })

    it('should handle empty string for required fields', () => {
      const dataWithEmptyStrings = {
        email: '',
        name: '',
        age: 25
      }

      const result = validateSchema(dataWithEmptyStrings, userSchema)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('Email Address is required / Email Address为必填项')
      expect(result.errors.name).toContain('Full Name is required / Full Name为必填项')
    })

    it('should use field name as label when label is not provided', () => {
      const schemaWithoutLabels = {
        username: {
          validators: [],
          required: true
        }
      }

      const result = validateSchema({}, schemaWithoutLabels)
      expect(result.isValid).toBe(false)
      expect(result.errors.username).toContain('username is required / username为必填项')
    })

    it('should handle multiple validation errors for a single field', () => {
      const schemaWithMultipleValidators = {
        password: {
          validators: [minLength(8), min(1)], // This will cause type issues but tests the logic
          required: true,
          label: 'Password'
        }
      }

      const result = validateSchema({ password: 'short' }, schemaWithMultipleValidators)
      expect(result.isValid).toBe(false)
      expect(result.errors.password.length).toBeGreaterThan(0)
    })

    it('should handle empty schema', () => {
      const result = validateSchema({ anyField: 'anyValue' }, {})
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should handle empty data with empty schema', () => {
      const result = validateSchema({}, {})
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })
  })
})
