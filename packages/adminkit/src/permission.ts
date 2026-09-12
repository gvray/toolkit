/**
 * Parsed segments of a `domain:resource:action` permission code.
 * `domain:resource:action` 权限码解析结果。
 *
 * @since 1.3.0
 */
export interface PermissionCodeParts {
  domain: string;
  resource: string;
  action: string;
}

/**
 * Parses a permission code in the form `domain:resource:action`.
 * 解析权限码 `domain:resource:action`。
 *
 * @param code - Permission code / 权限码
 * @returns Parsed segments / 解析后的各段
 *
 * @since 1.3.0
 */
export const parsePermissionCode = (code?: string | null): PermissionCodeParts => {
  const parts = code?.split(':').filter(Boolean) ?? [];
  return {
    domain: parts[0] || '',
    resource: parts[1] || '',
    action: parts[parts.length - 1] || '',
  };
};

/**
 * Extracts the action segment (last part) from a permission code.
 * 从权限码中提取 action（最后一段）。
 *
 * @param code - Permission code / 权限码
 * @returns Action segment / action 段
 *
 * @since 1.3.0
 */
export const getPermissionAction = (code?: string | null): string =>
  parsePermissionCode(code).action;

/**
 * Options for `hasPermissions`.
 * `hasPermissions` 的选项。
 *
 * @since 1.3.0
 */
export interface HasPermissionsOptions {
  /** Match mode: 'every' requires all, 'some' requires any / 匹配模式 */
  matchMode?: 'every' | 'some';
  /** Wildcard code that grants all permissions / 通配码 */
  wildcard?: string;
}

/**
 * Checks whether the user has the required permissions.
 * 判断用户是否拥有所需权限。
 *
 * @param userPerms - User's permission codes / 用户拥有的权限码列表
 * @param required - Required permission codes / 需要校验的权限码列表
 * @param options - Matching options / 匹配选项
 * @returns `true` if authorized / 授权通过时返回 `true`
 *
 * @since 1.3.0
 */
export const hasPermissions = (
  userPerms: string[] | undefined,
  required: string[] | undefined,
  options: HasPermissionsOptions = {}
): boolean => {
  const { matchMode = 'every', wildcard = '*:*:*' } = options;

  if (!required || required.length === 0) return true;
  if (!userPerms || userPerms.length === 0) return false;
  if (wildcard && userPerms.includes(wildcard)) return true;

  return matchMode === 'some'
    ? required.some((p) => userPerms.includes(p))
    : required.every((p) => userPerms.includes(p));
};
