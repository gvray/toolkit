/**
 * Normalized list response shape used by admin backends.
 * admin 后台常用的分页响应结构。
 *
 * @since 1.3.0
 */
export interface ListResponse<T> {
  items: T[];
  total: number;
}

/**
 * Normalizes list data to `{ items, total }`.
 * Supports both `{ items, total }` and plain array responses.
 * 归一化列表接口返回数据，兼容 `{ items, total }` 和纯数组两种形态。
 *
 * @param data - Raw list data / 原始列表数据
 * @returns Normalized list response / 归一化后的列表响应
 *
 * @since 1.3.0
 */
export const normalizeListResponse = <T>(data: unknown): ListResponse<T> => {
  if (!data) return { items: [], total: 0 };

  const typed = data as Partial<ListResponse<T>> & { length?: number };
  const items = typed.items ?? (Array.isArray(typed) ? typed : []);
  const total = typed.total ?? (Array.isArray(typed) ? typed.length : 0);

  return {
    items: Array.isArray(items) ? items : [],
    total: Number(total) || 0,
  };
};

/**
 * Extracts list data from a response object.
 * 从响应对象中提取列表数据。
 *
 * @param response - Response with optional `data` field / 可能包含 `data` 字段的响应
 * @returns Normalized list response / 归一化后的列表响应
 *
 * @since 1.3.0
 */
export const extractListData = <T>(
  response: { data?: unknown } | undefined | null
): ListResponse<T> => normalizeListResponse<T>(response?.data);
