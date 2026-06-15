/**
 * Extra tests to push colorkit statement coverage to 96%+.
 * Targets uncovered lines: 54-55, 100-101, 128-129, 159-162, 188-192
 */

import { parseColor, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, isAccessible } from '../src/color';

// ── parseColor: rgb/rgba string parsing (lines 54-55) ────────────────────────

describe('parseColor rgb/rgba strings', () => {
  it('parses rgb() string', () => {
    const c = parseColor('rgb(100, 150, 200)');
    expect(c.r).toBe(100);
    expect(c.g).toBe(150);
    expect(c.b).toBe(200);
    expect(c.a).toBe(1);
  });

  it('parses rgba() string', () => {
    const c = parseColor('rgba(10, 20, 30, 0.5)');
    expect(c.r).toBe(10);
    expect(c.g).toBe(20);
    expect(c.b).toBe(30);
    expect(c.a).toBe(0.5);
  });

  it('parses 8-digit hex with alpha', () => {
    // line 47 – raw.length === 8 branch
    const c = parseColor('#ff000080');
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
    expect(c.a).toBeCloseTo(0.502, 1);
  });
});

// ── rgbToHsl: green-max branch (lines 100-101) ───────────────────────────────

describe('rgbToHsl green/blue max branches', () => {
  it('green is max (h in 60-180 range)', () => {
    // Pure green: max = gn
    const hsl = rgbToHsl({ r: 0, g: 255, b: 0 });
    expect(hsl.h).toBeCloseTo(120, 0);
    expect(hsl.s).toBeCloseTo(100, 0);
    expect(hsl.l).toBeCloseTo(50, 0);
  });

  it('blue is max (default case)', () => {
    // Pure blue: max = bn
    const hsl = rgbToHsl({ r: 0, g: 0, b: 255 });
    expect(hsl.h).toBeCloseTo(240, 0);
    expect(hsl.s).toBeCloseTo(100, 0);
    expect(hsl.l).toBeCloseTo(50, 0);
  });

  it('achromatic (max === min)', () => {
    // line 91 – returns early with s=0
    const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(0);
  });

  it('passes alpha through', () => {
    const hsl = rgbToHsl({ r: 0, g: 255, b: 0, a: 0.7 });
    expect(hsl.a).toBe(0.7);
  });

  it('high lightness saturation branch (l > 0.5)', () => {
    // l > 0.5 → uses d / (2 - max - min)
    const hsl = rgbToHsl({ r: 200, g: 255, b: 200 });
    expect(hsl.s).toBeGreaterThan(0);
  });
});

// ── hslToRgb: h in 240-300 and 300-360 ranges (lines 128-129) ────────────────

describe('hslToRgb h range branches', () => {
  it('h < 60 (red-yellow range)', () => {
    const rgb = hslToRgb({ h: 30, s: 100, l: 50 });
    expect(rgb.r).toBeGreaterThan(0);
  });

  it('h < 120 (yellow-green range)', () => {
    const rgb = hslToRgb({ h: 90, s: 100, l: 50 });
    expect(rgb.g).toBeGreaterThan(0);
  });

  it('h < 180 (green-cyan range)', () => {
    const rgb = hslToRgb({ h: 150, s: 100, l: 50 });
    expect(rgb.g).toBeGreaterThan(0);
    expect(rgb.b).toBeGreaterThan(0);
  });

  it('h < 240 (cyan-blue range)', () => {
    const rgb = hslToRgb({ h: 210, s: 100, l: 50 });
    expect(rgb.b).toBeGreaterThan(0);
  });

  it('h < 300 (blue-magenta range) — line 128', () => {
    const rgb = hslToRgb({ h: 270, s: 100, l: 50 });
    expect(rgb.b).toBeGreaterThan(0);
    expect(rgb.r).toBeGreaterThan(0);
  });

  it('h >= 300 (magenta-red range) — line 129', () => {
    const rgb = hslToRgb({ h: 330, s: 100, l: 50 });
    expect(rgb.r).toBeGreaterThan(0);
    expect(rgb.b).toBeGreaterThan(0);
  });

  it('passes alpha through', () => {
    const rgb = hslToRgb({ h: 270, s: 100, l: 50, a: 0.3 });
    expect(rgb.a).toBe(0.3);
  });
});

// ── rgbToHsv: green-max and blue-max branches (lines 159-162) ─────────────────

describe('rgbToHsv branches', () => {
  it('green is max — line 159', () => {
    const hsv = rgbToHsv({ r: 0, g: 255, b: 100 });
    expect(hsv.h).toBeGreaterThan(60);
    expect(hsv.h).toBeLessThan(180);
    expect(hsv.v).toBeCloseTo(100, 0);
  });

  it('blue is max (default) — line 162', () => {
    const hsv = rgbToHsv({ r: 0, g: 100, b: 255 });
    expect(hsv.h).toBeGreaterThan(180);
    expect(hsv.h).toBeLessThan(300);
  });

  it('h < 0 correction — line 165', () => {
    // When gn < bn with red max, h can be negative → gets +360
    const hsv = rgbToHsv({ r: 255, g: 0, b: 100 });
    expect(hsv.h).toBeGreaterThanOrEqual(0);
    expect(hsv.h).toBeLessThan(360);
  });

  it('max === 0 → s = 0', () => {
    // line 167 – max === 0 branch
    const hsv = rgbToHsv({ r: 0, g: 0, b: 0 });
    expect(hsv.s).toBe(0);
    expect(hsv.v).toBe(0);
  });

  it('passes alpha through', () => {
    const hsv = rgbToHsv({ r: 0, g: 255, b: 0, a: 0.8 });
    expect(hsv.a).toBe(0.8);
  });
});

// ── hsvToRgb: h in 240-300 and 300-360 ranges (lines 188-192) ────────────────

describe('hsvToRgb branches', () => {
  it('h < 60 (red-yellow)', () => {
    const rgb = hsvToRgb({ h: 30, s: 100, v: 100 });
    expect(rgb.r).toBeGreaterThan(0);
  });

  it('h < 120 (yellow-green)', () => {
    const rgb = hsvToRgb({ h: 90, s: 100, v: 100 });
    expect(rgb.g).toBeGreaterThan(0);
  });

  it('h < 180 (green-cyan)', () => {
    const rgb = hsvToRgb({ h: 150, s: 100, v: 100 });
    expect(rgb.g).toBeGreaterThan(0);
    expect(rgb.b).toBeGreaterThan(0);
  });

  it('h < 240 (cyan-blue)', () => {
    const rgb = hsvToRgb({ h: 210, s: 100, v: 100 });
    expect(rgb.b).toBeGreaterThan(0);
  });

  it('h < 300 (blue-magenta) — line 191', () => {
    const rgb = hsvToRgb({ h: 270, s: 100, v: 100 });
    expect(rgb.b).toBeGreaterThan(0);
    expect(rgb.r).toBeGreaterThan(0);
  });

  it('h >= 300 (magenta-red) — line 192', () => {
    const rgb = hsvToRgb({ h: 330, s: 100, v: 100 });
    expect(rgb.r).toBeGreaterThan(0);
    expect(rgb.b).toBeGreaterThan(0);
  });

  it('passes alpha through', () => {
    const rgb = hsvToRgb({ h: 270, s: 100, v: 100, a: 0.5 });
    expect(rgb.a).toBe(0.5);
  });
});

// ── isAccessible AAA level ────────────────────────────────────────────────────

describe('isAccessible AAA level', () => {
  it('passes AAA for black on white', () => {
    expect(isAccessible('#000000', '#ffffff', 'AAA')).toBe(true);
  });

  it('fails AAA for low contrast pair', () => {
    expect(isAccessible('#cccccc', '#ffffff', 'AAA')).toBe(false);
  });
});
