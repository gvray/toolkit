import {
  email,
  phone,
  url,
  required,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  isLetterOrDigit,
  chineseIdCard,
  chineseMobile
} from '../src/validators'

describe('validators', () => {
  describe('email', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user_123@test-domain.com'
      ]

      validEmails.forEach((emailAddress) => {
        const result = email(emailAddress)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect email addresses', () => {
      const invalidEmails = ['invalid-email', 'test@', '@domain.com', 'test@domain', '']

      invalidEmails.forEach((emailAddress) => {
        const result = email(emailAddress)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid email format / 邮箱格式无效')
      })
    })
  })

  describe('phone', () => {
    it('should validate phone numbers with correct length', () => {
      const validPhones = ['1234567890', '+1 (555) 123-4567', '555-123-4567', '15512345678', '+86 155 1234 5678']

      validPhones.forEach((phoneNumber) => {
        const result = phone(phoneNumber)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate phone numbers with incorrect length', () => {
      const invalidPhones = ['123', '12345', '123456789012345678', 'abcdefghij', '']

      invalidPhones.forEach((phoneNumber) => {
        const result = phone(phoneNumber)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid phone number / 手机号格式无效')
      })
    })
  })

  describe('url', () => {
    it('should validate correct URLs', () => {
      const validUrls = [
        'https://www.example.com',
        'http://localhost:3000',
        'ftp://files.example.com',
        'https://sub.domain.com/path?query=value#fragment'
      ]

      validUrls.forEach((urlValue) => {
        const result = url(urlValue)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect URLs', () => {
      const invalidUrls = ['not-a-url', 'just-text', 'http://', '']

      invalidUrls.forEach((urlValue) => {
        const result = url(urlValue)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid URL format / URL格式无效')
      })
    })
  })

  describe('required', () => {
    it('should validate non-empty values', () => {
      const validValues = ['text', 123, true, false, [1, 2, 3], { key: 'value' }, 0]

      validValues.forEach((value) => {
        const result = required(value)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate empty values', () => {
      const emptyValues = [null, undefined, '', [], {}]

      emptyValues.forEach((value) => {
        const result = required(value)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('This field is required / 此字段为必填项')
      })
    })
  })

  describe('minLength', () => {
    it('should validate strings with sufficient length', () => {
      const validator = minLength(5)
      const result = validator('hello world')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate strings that are too short', () => {
      const validator = minLength(5)
      const result = validator('hi')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Minimum length is 5 characters / 最小长度为5个字符')
    })

    it('should validate strings with exact minimum length', () => {
      const validator = minLength(5)
      const result = validator('hello')
      expect(result.isValid).toBe(true)
    })
  })

  describe('maxLength', () => {
    it('should validate strings within maximum length', () => {
      const validator = maxLength(10)
      const result = validator('short')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate strings that are too long', () => {
      const validator = maxLength(5)
      const result = validator('too long string')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Maximum length is 5 characters / 最大长度为5个字符')
    })

    it('should validate strings with exact maximum length', () => {
      const validator = maxLength(5)
      const result = validator('hello')
      expect(result.isValid).toBe(true)
    })
  })

  describe('min', () => {
    it('should validate numbers above minimum', () => {
      const validator = min(5)
      const result = validator(10)
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate numbers below minimum', () => {
      const validator = min(5)
      const result = validator(3)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Minimum value is 5 / 最小值为5')
    })

    it('should validate numbers at exact minimum', () => {
      const validator = min(5)
      const result = validator(5)
      expect(result.isValid).toBe(true)
    })
  })

  describe('max', () => {
    it('should validate numbers below maximum', () => {
      const validator = max(10)
      const result = validator(5)
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate numbers above maximum', () => {
      const validator = max(10)
      const result = validator(15)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Maximum value is 10 / 最大值为10')
    })

    it('should validate numbers at exact maximum', () => {
      const validator = max(10)
      const result = validator(10)
      expect(result.isValid).toBe(true)
    })
  })

  describe('pattern', () => {
    it('should validate strings matching pattern', () => {
      const validator = pattern(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone format')
      const result = validator('123-456-7890')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should invalidate strings not matching pattern', () => {
      const validator = pattern(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone format')
      const result = validator('1234567890')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Invalid phone format')
    })

    it('should use default message when none provided', () => {
      const validator = pattern(/^\d+$/)
      const result = validator('abc')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Invalid format / 格式无效')
    })
  })

  describe('isLetterOrDigit', () => {
    it('should validate letters and digits', () => {
      const validChars = ['a', 'Z', '5', 'M', '0', '9']

      validChars.forEach((char) => {
        const result = isLetterOrDigit(char)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate non-alphanumeric characters', () => {
      const invalidChars = ['@', '#', '$', '%', '!', ' ', '.', '-']

      invalidChars.forEach((char) => {
        const result = isLetterOrDigit(char)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Character must be a letter or digit / 字符必须是字母或数字')
      })
    })

    it('should invalidate multi-character strings', () => {
      const result = isLetterOrDigit('abc')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Input must be a single character / 输入必须是单个字符')
    })

    it('should invalidate empty string', () => {
      const result = isLetterOrDigit('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Input must be a single character / 输入必须是单个字符')
    })
  })

  describe('chineseIdCard', () => {
    it('should validate correct Chinese ID cards', () => {
      const validIds = ['11010519491231002X', '110105194912310021', '32050419881028001X']

      validIds.forEach((id) => {
        const result = chineseIdCard(id)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect Chinese ID cards', () => {
      const invalidIds = ['123456789012345678', '01010519491231002X', '110105194912310', 'invalid-id']

      invalidIds.forEach((id) => {
        const result = chineseIdCard(id)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid Chinese ID card / 身份证号格式无效')
      })
    })
  })

  describe('chineseMobile', () => {
    it('should validate correct Chinese mobile numbers', () => {
      const validMobiles = ['13812345678', '15987654321', '18765432109', '19123456789']

      validMobiles.forEach((mobile) => {
        const result = chineseMobile(mobile)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should invalidate incorrect Chinese mobile numbers', () => {
      const invalidMobiles = ['12345678901', '1381234567', '138123456789', '0381234567', 'invalid-mobile']

      invalidMobiles.forEach((mobile) => {
        const result = chineseMobile(mobile)
        expect(result.isValid).toBe(false)
        expect(result.message).toBe('Invalid Chinese mobile number / 手机号格式无效')
      })
    })
  })
})
