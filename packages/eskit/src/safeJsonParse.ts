/**
 * Safely parse a JSON string, returning a fallback on failure.
 * 安全地解析 JSON 字符串，解析失败时返回 fallback。
 *
 * @template T - Expected parsed type / 期望的解析类型
 * @param value - The value to parse (non-string values return fallback) / 待解析的值（非字符串返回 fallback）
 * @param fallback - Value returned when parsing fails or input is not a string / 解析失败或输入非字符串时的返回值
 * @returns The parsed value, or `fallback` (default `undefined`) / 解析结果，或 `fallback`（默认 `undefined`）
 *
 * @example
 * safeJsonParse<{ a: number }>('{"a":1}') // => { a: 1 }
 * safeJsonParse('invalid', []) // => []
 * safeJsonParse(123, 'fb') // => 'fb' (non-string input)
 * safeJsonParse('not json') // => undefined
 *
 * @since 1.6.0
 */
const safeJsonParse = <T = unknown>(value: unknown, fallback?: T): T | undefined => {
  if (typeof value !== 'string') return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export default safeJsonParse;
