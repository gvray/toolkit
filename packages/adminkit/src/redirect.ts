export const REDIRECT_QUERY_KEY = 'redirect';

export const DEFAULT_REDIRECT_DENY_LIST = [
  '/login',
  '/register',
  '/logout',
  '/403',
  '/404',
  '/500',
];

export interface RedirectKeyOptions {
  /** query key — @default 'redirect' */
  key?: string;
}

export interface SafeRedirectOptions extends RedirectKeyOptions {
  /** 额外禁止跳转的路径列表 */
  denyList?: string[];
}

/**
 * 生成带 redirect 参数的登录地址。
 *
 * @example
 * createLoginRedirect('/login', '/system/user?id=1')
 * // => /login?redirect=%2Fsystem%2Fuser%3Fid%3D1
 */
export function createLoginRedirect(
  loginPath: string,
  redirect: string,
  options: RedirectKeyOptions = {}
): string {
  const { key = REDIRECT_QUERY_KEY } = options;
  const url = new URL(loginPath, location.origin);
  url.searchParams.set(key, redirect);
  return `${url.pathname}${url.search}`;
}

/**
 * 从 search 字符串中读取 redirect 值。
 *
 * @example
 * getLoginRedirect('?redirect=%2Fuser%3Fid%3D1')
 * // => /user?id=1
 */
export function getLoginRedirect(
  search = location.search,
  options: RedirectKeyOptions = {}
): string | null {
  const { key = REDIRECT_QUERY_KEY } = options;
  return new URLSearchParams(search).get(key);
}

/**
 * 规范化 redirect 路径：去掉 hash，合并开头多余的 `/`。
 *
 * @example
 * normalizeRedirect('/page#section')  // => /page
 * normalizeRedirect('///user')        // => /user
 * normalizeRedirect('/page?foo=1')    // => /page?foo=1
 * normalizeRedirect('')               // => /
 */
export function normalizeRedirect(redirect: string): string {
  if (!redirect) return '/';
  return redirect.split('#')[0].replace(/^\/+/, '/');
}

/**
 * 判断 redirect 是否安全（站内路径、不在黑名单内）。
 *
 * @example
 * isSafeRedirect('/dashboard')           // => true
 * isSafeRedirect('/login')               // => false  (黑名单)
 * isSafeRedirect('//evil.com')           // => false  (协议相对 URL)
 * isSafeRedirect('https://evil.com')     // => false  (外站)
 * isSafeRedirect('/javascript:alert(1)') // => false
 * isSafeRedirect('/admin', { denyList: ['/admin'] }) // => false
 */
export function isSafeRedirect(
  redirect: string | null | undefined,
  options: SafeRedirectOptions = {}
): boolean {
  if (!redirect) return false;
  if (redirect.startsWith('//')) return false;
  if (/^[/\\]+[/\\]/.test(redirect)) return false;

  const normalized = normalizeRedirect(redirect);

  if (!normalized.startsWith('/')) return false;
  if (normalized.toLowerCase().startsWith('/javascript:')) return false;

  const denyList = [...DEFAULT_REDIRECT_DENY_LIST, ...(options.denyList ?? [])];
  return !denyList.includes(normalized.split('?')[0]);
}

/**
 * 读取并校验 redirect，不安全时返回 fallback。
 *
 * @example
 * getSafeLoginRedirect('?redirect=%2Fdashboard')  // => /dashboard
 * getSafeLoginRedirect('?redirect=%2Flogin')       // => /  (在黑名单内)
 */
export function getSafeLoginRedirect(
  search = location.search,
  fallback = '/',
  options: SafeRedirectOptions = {}
): string {
  const redirect = getLoginRedirect(search, options);
  return isSafeRedirect(redirect, options) ? normalizeRedirect(redirect!) : fallback;
}
