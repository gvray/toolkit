export interface RgbColor {
  r: number
  g: number
  b: number
  a?: number
}

export interface HslColor {
  h: number
  s: number
  l: number
  a?: number
}

export interface HsvColor {
  h: number
  s: number
  v: number
  a?: number
}

const clamp = (n: number, min = 0, max = 255): number => Math.min(max, Math.max(min, n))

export function parseColor(input: string): RgbColor {
  const hex = input.trim()
  if (hex.startsWith('#')) {
    const raw = hex.slice(1)
    if (raw.length === 3) {
      return {
        r: parseInt(raw[0] + raw[0], 16),
        g: parseInt(raw[1] + raw[1], 16),
        b: parseInt(raw[2] + raw[2], 16),
        a: 1
      }
    }
    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
      a: raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1
    }
  }
  const match = hex.match(/rgba?\(([^)]+)\)/i)
  if (!match) {
    throw new RangeError('unsupported color format')
  }
  const [r, g, b, a = '1'] = match[1].split(',').map((part) => part.trim())
  return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) }
}

export const hexToRgb = (hex: string): RgbColor => parseColor(hex)
export const rgbToHex = ({ r, g, b }: RgbColor): string =>
  `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`

export function rgbToHsl({ r, g, b, a }: RgbColor): HslColor {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: l * 100, ...(a !== undefined ? { a } : {}) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0)
      break
    case gn:
      h = (bn - rn) / d + 2
      break
    default:
      h = (rn - gn) / d + 4
  }
  return { h: (h / 6) * 360, s: s * 100, l: l * 100, ...(a !== undefined ? { a } : {}) }
}

export function hslToRgb({ h, s, l, a }: HslColor): RgbColor {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let rp = 0
  let gp = 0
  let bp = 0
  if (h < 60) [rp, gp, bp] = [c, x, 0]
  else if (h < 120) [rp, gp, bp] = [x, c, 0]
  else if (h < 180) [rp, gp, bp] = [0, c, x]
  else if (h < 240) [rp, gp, bp] = [0, x, c]
  else if (h < 300) [rp, gp, bp] = [x, 0, c]
  else [rp, gp, bp] = [c, 0, x]
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
    ...(a !== undefined ? { a } : {})
  }
}

export function rgbToHsv({ r, g, b, a }: RgbColor): HsvColor {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d) % 6
        break
      case gn:
        h = (bn - rn) / d + 2
        break
      default:
        h = (rn - gn) / d + 4
    }
    h *= 60
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : (d / max) * 100
  return { h, s, v: max * 100, ...(a !== undefined ? { a } : {}) }
}

export function hsvToRgb({ h, s, v, a }: HsvColor): RgbColor {
  const sn = s / 100
  const vn = v / 100
  const c = vn * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = vn - c
  let rp = 0
  let gp = 0
  let bp = 0
  if (h < 60) [rp, gp, bp] = [c, x, 0]
  else if (h < 120) [rp, gp, bp] = [x, c, 0]
  else if (h < 180) [rp, gp, bp] = [0, c, x]
  else if (h < 240) [rp, gp, bp] = [0, x, c]
  else if (h < 300) [rp, gp, bp] = [x, 0, c]
  else [rp, gp, bp] = [c, 0, x]
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
    ...(a !== undefined ? { a } : {})
  }
}

export const hexToHsl = (hex: string): HslColor => rgbToHsl(hexToRgb(hex))
export const toRgbString = (color: RgbColor): string => `rgb(${color.r}, ${color.g}, ${color.b})`
export const toRgbaString = (color: RgbColor): string => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`
export const toHexString = (color: RgbColor): string => rgbToHex(color)
export const toHslString = (hsl: HslColor): string => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

const adjustLightness = (hex: string, amount: number): string => {
  const hsl = rgbToHsl(parseColor(hex))
  hsl.l = clamp(hsl.l + amount, 0, 100)
  return rgbToHex(hslToRgb(hsl))
}

export const lighten = (hex: string, amount: number): string => adjustLightness(hex, amount)
export const darken = (hex: string, amount: number): string => adjustLightness(hex, -amount)

export const saturate = (hex: string, amount: number): string => {
  const hsl = rgbToHsl(parseColor(hex))
  hsl.s = clamp(hsl.s + amount, 0, 100)
  return rgbToHex(hslToRgb(hsl))
}

export const desaturate = (hex: string, amount: number): string => saturate(hex, -amount)

export const alpha = (hex: string, value: number): string => {
  const rgb = parseColor(hex)
  return toRgbaString({ ...rgb, a: value })
}

export const mix = (a: string, b: string, weight = 0.5): string => {
  const ca = parseColor(a)
  const cb = parseColor(b)
  const w = clamp(weight * 100, 0, 100) / 100
  return rgbToHex({
    r: Math.round(ca.r * (1 - w) + cb.r * w),
    g: Math.round(ca.g * (1 - w) + cb.g * w),
    b: Math.round(ca.b * (1 - w) + cb.b * w)
  })
}

export const tint = (hex: string, weight: number): string => mix(hex, '#ffffff', weight)
export const shade = (hex: string, weight: number): string => mix(hex, '#000000', weight)
export const invert = (hex: string): string => {
  const rgb = parseColor(hex)
  return rgbToHex({ r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b })
}

export const rotate = (hex: string, degrees: number): string => {
  const hsl = rgbToHsl(parseColor(hex))
  hsl.h = (hsl.h + degrees) % 360
  return rgbToHex(hslToRgb(hsl))
}

export const complement = (hex: string): string => rotate(hex, 180)

const luminance = (rgb: RgbColor): number => {
  const transform = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * transform(rgb.r) + 0.7152 * transform(rgb.g) + 0.0722 * transform(rgb.b)
}

export const getLuminance = (hex: string): number => luminance(parseColor(hex))
export const isLight = (hex: string): boolean => getLuminance(hex) > 0.5
export const isDark = (hex: string): boolean => !isLight(hex)

export const getContrastRatio = (a: string, b: string): number => {
  const l1 = getLuminance(a)
  const l2 = getLuminance(b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export const isAccessible = (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const ratio = getContrastRatio(foreground, background)
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7
}

export const getReadableTextColor = (background: string): string => (isLight(background) ? '#000000' : '#ffffff')

export const randomColor = (): string => {
  const n = Math.floor(Math.random() * 0xffffff)
  return `#${n.toString(16).padStart(6, '0')}`
}

export const generatePalette = (hex: string, steps = 5): string[] => {
  const arr: string[] = []
  for (let i = 0; i < steps; i++) {
    arr.push(lighten(hex, (i - Math.floor(steps / 2)) * (50 / steps)))
  }
  return arr
}

export const generateGradient = (from: string, to: string, steps: number): string[] => {
  return Array.from({ length: steps }, (_, index) => mix(from, to, index / Math.max(steps - 1, 1)))
}
