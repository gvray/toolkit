/**
 * A route-like object with optional path and children.
 * 类路由对象。
 *
 * @since 1.3.0
 */
export type RouteLike = {
  path?: string;
  children?: RouteLike[];
  [key: string]: unknown;
};

/**
 * Converts a react-router style path with `:param` into a regex pattern segment.
 * 把 react-router 风格的路径参数 `:id` 转换为正则匹配片段。
 *
 * @param path - Route path / 路由路径
 * @returns Regex-compatible pattern / 正则匹配片段
 *
 * @since 1.3.0
 */
export const createRoutePattern = (path: string): string => path.replace(/:[^/]+/g, '[^/]+');

/**
 * Checks whether a pathname matches a route path (supports `:param` dynamic segments).
 * 判断当前 pathname 是否匹配给定的 routePath（支持 :param 动态参数）。
 *
 * @param routePath - Route path / 路由路径
 * @param pathname - Current pathname / 当前 pathname
 * @returns `true` if matched / 匹配时返回 `true`
 *
 * @since 1.3.0
 */
export const matchRoutePath = (routePath: string, pathname: string): boolean => {
  if (routePath === pathname) return true;
  if (!routePath.includes(':')) return false;
  const regex = new RegExp(`^${createRoutePattern(routePath)}$`);
  return regex.test(pathname);
};

/**
 * Generates all parent path segments for a pathname, commonly used for menu openKeys.
 * 根据 pathname 生成所有父级路径数组。
 *
 * @example
 * getParentPaths('/system/user/list')
 * // => ['/system', '/system/user']
 *
 * @since 1.3.0
 */
export const getParentPaths = (pathname: string): string[] => {
  const segments = pathname.split('/').filter(Boolean);
  const keys: string[] = [];
  let path = '';

  for (let i = 0; i < segments.length - 1; i++) {
    path += `/${segments[i]}`;
    keys.push(path);
  }

  return keys;
};
