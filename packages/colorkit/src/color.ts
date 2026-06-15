export interface RgbColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
  a?: number;
}

const clamp = (n: number, min = 0, max = 255): number => Math.min(max, Math.max(min, n));

/**
 * Parses a CSS color string (hex, rgb, rgba) into an `RgbColor` object.
 *
 * @example
 * parseColor('#ff6600') // => { r: 255, g: 102, b: 0, a: 1 }
 * @since 1.0.0
 */
export function parseColor(input: string): RgbColor {
  const hex = input.trim();
  if (hex.startsWith('#')) {
    const raw = hex.slice(1);
    if (!/^(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(raw)) {
      throw new RangeError('unsupported color format');
    }

    if (raw.length === 3) {
      return {
        r: parseInt(raw[0] + raw[0], 16),
        g: parseInt(raw[1] + raw[1], 16),
        b: parseInt(raw[2] + raw[2], 16),
        a: 1,
      };
    }

    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
      a: raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1,
    };
  }
  const match = hex.match(/rgba?\(([^)]+)\)/i);
  if (!match) {
    throw new RangeError('unsupported color format');
  }
  const [r, g, b, a = '1'] = match[1].split(',').map((part) => part.trim());
  return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
}

/**
 * Converts a hex color string to an `RgbColor` object.
 *
 * @example
 * hexToRgb('#ff6600') // => { r: 255, g: 102, b: 0, a: 1 }
 * @since 1.0.0
 */
export const hexToRgb = (hex: string): RgbColor => parseColor(hex);

/**
 * Converts an `RgbColor` object to a lowercase hex string.
 *
 * @example
 * rgbToHex({ r: 255, g: 102, b: 0 }) // => '#ff6600'
 * @since 1.0.0
 */
export const rgbToHex = ({ r, g, b }: RgbColor): string =>
  `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;

/**
 * Converts an `RgbColor` object to an `HslColor` object.
 *
 * @example
 * rgbToHsl({ r: 255, g: 102, b: 0 }) // => { h: 24, s: 100, l: 50, a: 1 }
 * @since 1.0.0
 */
export function rgbToHsl({ r, g, b, a }: RgbColor): HslColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100, ...(a !== undefined ? { a } : {}) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    default:
      h = (rn - gn) / d + 4;
  }
  return { h: (h / 6) * 360, s: s * 100, l: l * 100, ...(a !== undefined ? { a } : {}) };
}

/**
 * Converts an `HslColor` object to an `RgbColor` object.
 *
 * @example
 * hslToRgb({ h: 24, s: 100, l: 50 }) // => { r: 255, g: 102, b: 0 }
 * @since 1.0.0
 */
export function hslToRgb({ h, s, l, a }: HslColor): RgbColor {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
    ...(a !== undefined ? { a } : {}),
  };
}

/**
 * Converts an `RgbColor` object to an `HsvColor` object.
 *
 * @example
 * rgbToHsv({ r: 255, g: 102, b: 0 }) // => { h: 24, s: 100, v: 100 }
 * @since 1.0.0
 */
export function rgbToHsv({ r, g, b, a }: RgbColor): HsvColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d) % 6;
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : (d / max) * 100;
  return { h, s, v: max * 100, ...(a !== undefined ? { a } : {}) };
}

/**
 * Converts an `HsvColor` object to an `RgbColor` object.
 *
 * @example
 * hsvToRgb({ h: 24, s: 100, v: 100 }) // => { r: 255, g: 102, b: 0 }
 * @since 1.0.0
 */
export function hsvToRgb({ h, s, v, a }: HsvColor): RgbColor {
  const sn = s / 100;
  const vn = v / 100;
  const c = vn * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vn - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
    ...(a !== undefined ? { a } : {}),
  };
}

/**
 * Converts a hex color string directly to an `HslColor` object.
 *
 * @example
 * hexToHsl('#ff6600') // => { h: 24, s: 100, l: 50, a: 1 }
 * @since 1.0.0
 */
export const hexToHsl = (hex: string): HslColor => rgbToHsl(hexToRgb(hex));

/**
 * Returns a CSS `rgb(r, g, b)` string from an `RgbColor` object.
 *
 * @example
 * toRgbString({ r: 255, g: 102, b: 0 }) // => 'rgb(255, 102, 0)'
 * @since 1.0.0
 */
export const toRgbString = (color: RgbColor): string => `rgb(${color.r}, ${color.g}, ${color.b})`;

/**
 * Returns a CSS `rgba(r, g, b, a)` string from an `RgbColor` object.
 *
 * @example
 * toRgbaString({ r: 255, g: 102, b: 0, a: 0.5 }) // => 'rgba(255, 102, 0, 0.5)'
 * @since 1.0.0
 */
export const toRgbaString = (color: RgbColor): string =>
  `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`;

/**
 * Converts an `RgbColor` object to a hex string (alias of `rgbToHex`).
 *
 * @example
 * toHexString({ r: 255, g: 102, b: 0 }) // => '#ff6600'
 * @since 1.0.0
 */
export const toHexString = (color: RgbColor): string => rgbToHex(color);

/**
 * Returns a CSS `hsl(h, s%, l%)` string from an `HslColor` object.
 *
 * @example
 * toHslString({ h: 24, s: 100, l: 50 }) // => 'hsl(24, 100%, 50%)'
 * @since 1.0.0
 */
export const toHslString = (hsl: HslColor): string => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

const adjustLightness = (hex: string, amount: number): string => {
  const hsl = rgbToHsl(parseColor(hex));
  hsl.l = clamp(hsl.l + amount, 0, 100);
  return rgbToHex(hslToRgb(hsl));
};

/**
 * Lightens a hex color by increasing its HSL lightness by `amount` percent.
 *
 * @example
 * lighten('#336699', 20) // => '#5588bb'
 * @since 1.0.0
 */
export const lighten = (hex: string, amount: number): string => adjustLightness(hex, amount);

/**
 * Darkens a hex color by decreasing its HSL lightness by `amount` percent.
 *
 * @example
 * darken('#336699', 20) // => '#112244'
 * @since 1.0.0
 */
export const darken = (hex: string, amount: number): string => adjustLightness(hex, -amount);

/**
 * Increases the saturation of a hex color by `amount` percent.
 *
 * @example
 * saturate('#336699', 20) // => '#1a6eb3'
 * @since 1.0.0
 */
export const saturate = (hex: string, amount: number): string => {
  const hsl = rgbToHsl(parseColor(hex));
  hsl.s = clamp(hsl.s + amount, 0, 100);
  return rgbToHex(hslToRgb(hsl));
};

/**
 * Decreases the saturation of a hex color by `amount` percent.
 *
 * @example
 * desaturate('#336699', 20) // => '#456080'
 * @since 1.0.0
 */
export const desaturate = (hex: string, amount: number): string => saturate(hex, -amount);

/**
 * Returns a CSS `rgba()` string for the given hex color with a custom alpha.
 *
 * @example
 * alpha('#ff6600', 0.5) // => 'rgba(255, 102, 0, 0.5)'
 * @since 1.0.0
 */
export const alpha = (hex: string, value: number): string => {
  const rgb = parseColor(hex);
  return toRgbaString({ ...rgb, a: value });
};

/**
 * Mixes two hex colors together. `weight` (0–1) controls how much of `b`
 * is blended in; default is `0.5` (equal mix).
 *
 * @example
 * mix('#ff0000', '#0000ff', 0.5) // => '#7f007f'
 * @since 1.0.0
 */
export const mix = (a: string, b: string, weight = 0.5): string => {
  const ca = parseColor(a);
  const cb = parseColor(b);
  const w = clamp(weight * 100, 0, 100) / 100;
  return rgbToHex({
    r: Math.round(ca.r * (1 - w) + cb.r * w),
    g: Math.round(ca.g * (1 - w) + cb.g * w),
    b: Math.round(ca.b * (1 - w) + cb.b * w),
  });
};

/**
 * Mixes a hex color with white by `weight` (0–1) to produce a tint.
 *
 * @example
 * tint('#336699', 0.5) // => '#99b2cc'
 * @since 1.0.0
 */
export const tint = (hex: string, weight: number): string => mix(hex, '#ffffff', weight);

/**
 * Mixes a hex color with black by `weight` (0–1) to produce a shade.
 *
 * @example
 * shade('#336699', 0.5) // => '#1a334c'
 * @since 1.0.0
 */
export const shade = (hex: string, weight: number): string => mix(hex, '#000000', weight);

/**
 * Inverts a hex color by subtracting each channel from 255.
 *
 * @example
 * invert('#336699') // => '#cc9966'
 * @since 1.0.0
 */
export const invert = (hex: string): string => {
  const rgb = parseColor(hex);
  return rgbToHex({ r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b });
};

/**
 * Rotates the hue of a hex color by `degrees`.
 *
 * @example
 * rotate('#336699', 90) // => '#336633'
 * @since 1.0.0
 */
export const rotate = (hex: string, degrees: number): string => {
  const hsl = rgbToHsl(parseColor(hex));
  hsl.h = (((hsl.h + degrees) % 360) + 360) % 360;
  return rgbToHex(hslToRgb(hsl));
};

/**
 * Returns the complementary color (hue rotated 180°) of a hex color.
 *
 * @example
 * complement('#336699') // => '#993366'
 * @since 1.0.0
 */
export const complement = (hex: string): string => rotate(hex, 180);

const luminance = (rgb: RgbColor): number => {
  const transform = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(rgb.r) + 0.7152 * transform(rgb.g) + 0.0722 * transform(rgb.b);
};

/**
 * Returns the relative luminance (0–1) of a hex color per WCAG 2.x.
 *
 * @example
 * getLuminance('#ffffff') // => 1
 * getLuminance('#000000') // => 0
 * @since 1.0.0
 */
export const getLuminance = (hex: string): number => luminance(parseColor(hex));

/**
 * Returns `true` if the hex color is perceptually light (luminance > 0.5).
 *
 * @example
 * isLight('#ffffff') // => true
 * isLight('#000000') // => false
 * @since 1.0.0
 */
export const isLight = (hex: string): boolean => getLuminance(hex) > 0.5;

/**
 * Returns `true` if the hex color is perceptually dark (luminance ≤ 0.5).
 *
 * @example
 * isDark('#000000') // => true
 * isDark('#ffffff') // => false
 * @since 1.0.0
 */
export const isDark = (hex: string): boolean => !isLight(hex);

/**
 * Computes the WCAG contrast ratio between two hex colors.
 *
 * @example
 * getContrastRatio('#ffffff', '#000000') // => 21
 * @since 1.0.0
 */
export const getContrastRatio = (a: string, b: string): number => {
  const l1 = getLuminance(a);
  const l2 = getLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Returns `true` if the foreground/background pair meets the given WCAG
 * contrast level (`'AA'` requires ≥ 4.5, `'AAA'` requires ≥ 7).
 *
 * @example
 * isAccessible('#ffffff', '#000000', 'AA') // => true
 * isAccessible('#cccccc', '#ffffff', 'AA') // => false
 * @since 1.0.0
 */
export const isAccessible = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Returns `'#000000'` or `'#ffffff'` — whichever is more readable on top of
 * the given background hex color.
 *
 * @example
 * getReadableTextColor('#336699') // => '#ffffff'
 * getReadableTextColor('#ffff00') // => '#000000'
 * @since 1.0.0
 */
export const getReadableTextColor = (background: string): string =>
  isLight(background) ? '#000000' : '#ffffff';

/**
 * Returns a random hex color string.
 *
 * @example
 * randomColor() // => '#a3f2c1'
 * @since 1.0.0
 */
export const randomColor = (): string => {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, '0')}`;
};

/**
 * Generates a palette of `steps` hex colors centered around the given hex,
 * varying lightness evenly.
 *
 * @example
 * generatePalette('#336699', 3) // => ['#224477', '#336699', '#4488bb']
 * @since 1.0.0
 */
export const generatePalette = (hex: string, steps = 5): string[] => {
  const arr: string[] = [];
  for (let i = 0; i < steps; i++) {
    arr.push(lighten(hex, (i - Math.floor(steps / 2)) * (50 / steps)));
  }
  return arr;
};

/**
 * Generates an array of `steps` hex colors interpolated between `from` and
 * `to` as a gradient.
 *
 * @example
 * generateGradient('#000000', '#ffffff', 3) // => ['#000000', '#7f7f7f', '#ffffff']
 * @since 1.0.0
 */
export const generateGradient = (from: string, to: string, steps: number): string[] => {
  return Array.from({ length: steps }, (_, index) => mix(from, to, index / Math.max(steps - 1, 1)));
};
