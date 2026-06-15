import normalize from './normalize';

/**
 * 将路径转换为 file:// URL。
 *
 * @param path - 要转换的路径
 * @returns file:// URL 字符串
 *
 * @example
 * toFileUrl('/foo/bar')              // => 'file:///foo/bar'
 * toFileUrl('C:\\temp\\foo.txt')     // => 'file:///C:/temp/foo.txt'
 * toFileUrl('//host/share/file.txt') // => 'file://host/share/file.txt'
 *
 * @since 1.0.0
 */
const toFileUrl = (path: string): string => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }

  // 处理空路径
  if (!path) {
    return 'file:///';
  }

  // 规范化路径
  let normalizedPath = normalize(path);

  // 处理当前目录
  if (normalizedPath === '.') {
    return 'file:///';
  }

  // 处理 Windows 驱动器路径
  if (/^[A-Za-z]:/.test(normalizedPath)) {
    normalizedPath = `/${normalizedPath}`;
  }

  const isUNC = normalizedPath.startsWith('//');

  // 处理普通路径
  // 确保路径以斜杠开头
  if (!isUNC && !normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`;
  }

  // 编码特殊字符，但保留冒号（用于 Windows 驱动器）
  const encodedPath = normalizedPath
    .split('/')
    .map((segment) => {
      // 对于 Windows 驱动器段（如 C:），不编码冒号
      if (/^[A-Za-z]:$/.test(segment)) {
        return segment;
      }
      return encodeURIComponent(segment);
    })
    .join('/');

  return isUNC ? `file://${encodedPath.slice(2)}` : `file://${encodedPath}`;
};

export default toFileUrl;
