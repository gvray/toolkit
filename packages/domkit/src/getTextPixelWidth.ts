interface TextMetricsExtended extends TextMetrics {
  readonly font: string;
}
/**
 * Calculates the pixel width of the given text in the specified font.
 *
 * @param text - The text to calculate the width of.
 * @param options - Options for the font.
 * @param options.font - The font string to use, e.g. `Arial`.
 * @param options.fontSize - The size of the font in pixels.
 * @param options.fontWeight - The weight of the font, e.g. `bold`.
 * @param options.fontFamily - The name of the font family, e.g. `sans-serif`.
 * @returns The pixel width of the text in the specified font.
 *
 * @example
 * getTextPixelWidth('Hello, World!', { fontFamily: 'Arial', fontSize: 20 }) // => 123
 *
 * @since 1.0.0
 */
const getTextPixelWidth = (
  text: string,
  options: {
    font?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    fontFamily?: string;
  }
): number => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to create 2D rendering context');
  }

  const { font, fontSize, fontWeight, fontFamily } = options;

  ctx.font =
    font ??
    [
      fontWeight ? `${fontWeight}` : '',
      fontSize ? (typeof fontSize === 'number' ? `${fontSize}px` : fontSize) : '',
      fontFamily ? `${fontFamily}` : '',
    ]
      .filter(Boolean)
      .join(' ');

  const metrics = ctx.measureText(text) as TextMetricsExtended;
  return metrics.width;
};
export default getTextPixelWidth;
