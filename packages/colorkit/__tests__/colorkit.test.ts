import {
  alpha,
  complement,
  darken,
  desaturate,
  generateGradient,
  generatePalette,
  getContrastRatio,
  getLuminance,
  getReadableTextColor,
  hexToHsl,
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  invert,
  isAccessible,
  isDark,
  isLight,
  lighten,
  mix,
  parseColor,
  randomColor,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rotate,
  saturate,
  shade,
  tint,
  toHexString,
  toHslString,
  toRgbString,
  toRgbaString
} from '../src'

describe('colorkit', () => {
  it('parses and converts', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    expect(parseColor('#abc').r).toBeGreaterThan(0)
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000')
    expect(hexToHsl('#ff0000').h).toBeGreaterThanOrEqual(0)
    expect(hslToRgb({ h: 0, s: 100, l: 50 }).r).toBe(255)
    expect(rgbToHsv({ r: 255, g: 0, b: 0 }).v).toBe(100)
    expect(hsvToRgb({ h: 0, s: 100, v: 100 }).r).toBe(255)
  })

  it('string outputs', () => {
    const rgb = { r: 10, g: 20, b: 30, a: 0.5 }
    expect(toRgbString(rgb)).toContain('10')
    expect(toRgbaString(rgb)).toContain('0.5')
    expect(toHexString(rgb)).toMatch(/^#/)
    expect(toHslString({ h: 0, s: 50, l: 50 })).toContain('hsl')
  })

  it('manipulates colors', () => {
    expect(lighten('#000000', 20)).not.toBe('#000000')
    expect(darken('#ffffff', 20)).not.toBe('#ffffff')
    expect(saturate('#888888', 10)).toMatch(/^#/)
    expect(desaturate('#ff0000', 10)).toMatch(/^#/)
    expect(alpha('#ff0000', 0.5)).toContain('rgba')
    expect(mix('#ff0000', '#0000ff', 0.5)).toMatch(/^#/)
    expect(tint('#ff0000', 0.5)).toMatch(/^#/)
    expect(shade('#ff0000', 0.5)).toMatch(/^#/)
    expect(invert('#ff0000')).toMatch(/^#/)
    expect(rotate('#ff0000', 120)).toMatch(/^#/)
    expect(complement('#ff0000')).toMatch(/^#/)
  })

  it('accessibility and generators', () => {
    expect(getLuminance('#ffffff')).toBeGreaterThan(0.5)
    expect(isLight('#ffffff')).toBe(true)
    expect(isDark('#000000')).toBe(true)
    expect(getContrastRatio('#000000', '#ffffff')).toBeGreaterThan(10)
    expect(isAccessible('#000000', '#ffffff')).toBe(true)
    expect(getReadableTextColor('#ffffff')).toBe('#000000')
    expect(randomColor()).toMatch(/^#/)
    expect(generatePalette('#336699', 5)).toHaveLength(5)
    expect(generateGradient('#ff0000', '#0000ff', 3)).toHaveLength(3)
    expect(() => parseColor('not-a-color')).toThrow()
  })
})
