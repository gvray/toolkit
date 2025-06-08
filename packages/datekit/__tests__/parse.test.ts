import { parse, parseISO, parseUnix, parseAny } from '../src/parse'

describe('parse', () => {
  describe('parse', () => {
    it('should parse ISO date strings', () => {
      const result = parse('2023-12-25')
      expect(result).not.toBeNull()
      expect(result!.getFullYear()).toBe(2023)
      expect(result!.getMonth()).toBe(11) // December is month 11
      expect(result!.getDate()).toBe(25)
    })

    it('should parse ISO datetime strings', () => {
      const result = parse('2023-12-25T15:30:45')
      expect(result).not.toBeNull()
      expect(result!.getFullYear()).toBe(2023)
      expect(result!.getHours()).toBe(15)
      expect(result!.getMinutes()).toBe(30)
      expect(result!.getSeconds()).toBe(45)
    })

    it('should parse custom format strings', () => {
      const result = parse('25/12/2023', 'DD/MM/YYYY')
      expect(result).not.toBeNull()
      expect(result!.getFullYear()).toBe(2023)
      expect(result!.getMonth()).toBe(11)
      expect(result!.getDate()).toBe(25)
    })

    it('should return null for invalid date strings', () => {
      const result = parse('invalid-date')
      expect(result).toBeNull()
    })

    it('should parse with different separators', () => {
      const result = parse('2023.12.25', 'YYYY.MM.DD')
      expect(result).not.toBeNull()
      expect(result!.getFullYear()).toBe(2023)
    })

    it('should return null for empty string', () => {
      const result = parse('')
      expect(result).toBeNull()
    })
  })

  describe('parseISO', () => {
    it('should parse ISO 8601 date strings', () => {
      const result = parseISO('2023-12-25T15:30:45.123Z')
      expect(result).not.toBeNull()
      expect(result!.getUTCFullYear()).toBe(2023)
      expect(result!.getUTCMonth()).toBe(11)
      expect(result!.getUTCDate()).toBe(25)
    })

    it('should handle timezone offsets', () => {
      const result = parseISO('2023-12-25T15:30:45+08:00')
      expect(result).not.toBeNull()
      expect(result).toBeInstanceOf(Date)
    })

    it('should return null for invalid ISO strings', () => {
      const result = parseISO('invalid-iso')
      expect(result).toBeNull()
    })

    it('should return null for empty string', () => {
      const result = parseISO('')
      expect(result).toBeNull()
    })
  })

  describe('parseUnix', () => {
    it('should parse Unix timestamps in seconds', () => {
      const timestamp = 1703520645 // 2023-12-25T15:30:45Z
      const result = parseUnix(timestamp)
      expect(result).not.toBeNull()
      expect(result!.getUTCFullYear()).toBe(2023)
    })

    it('should parse Unix timestamps in milliseconds', () => {
      const timestamp = 1703520645123 // 2023-12-25T15:30:45.123Z
      const result = parseUnix(timestamp, 'milliseconds')
      expect(result).not.toBeNull()
      expect(result!.getUTCFullYear()).toBe(2023)
      expect(result!.getUTCMilliseconds()).toBe(123)
    })

    it('should handle negative timestamps', () => {
      const timestamp = -86400 // 1969-12-31
      const result = parseUnix(timestamp)
      expect(result).not.toBeNull()
      expect(result!.getUTCFullYear()).toBe(1969)
    })

    it('should return null for invalid timestamps', () => {
      const result = parseUnix(NaN)
      expect(result).toBeNull()
    })
  })

  describe('parseAny', () => {
    it('should handle Date objects', () => {
      const inputDate = new Date('2023-12-25')
      const result = parseAny(inputDate)
      expect(result).toBe(inputDate)
    })

    it('should handle Unix timestamps', () => {
      const timestamp = 1703520645
      const result = parseAny(timestamp)
      expect(result).not.toBeNull()
      expect(result!.getUTCFullYear()).toBe(2023)
    })

    it('should handle date strings', () => {
      const result = parseAny('2023-12-25')
      expect(result).not.toBeNull()
      expect(result!.getFullYear()).toBe(2023)
    })

    it('should return null for invalid Date objects', () => {
      const invalidDate = new Date('invalid')
      const result = parseAny(invalidDate)
      expect(result).toBeNull()
    })
  })
})
