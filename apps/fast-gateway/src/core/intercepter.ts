import type { WebSiteDataModel, PageModelItem } from './types';

export const matchWebsite = (
  host: string,
  websites: Record<string, WebSiteDataModel>,
): WebSiteDataModel | undefined => {
  return websites[host];
}

/**
 * @description path = / 时 '/'.split('/') 等于 ['', ''], 需要处理成 ['']
 */
const splitPath = (path) => {
  if (!path) {
    return [];
  } else if (path === '/') {
    return [''];
  } else {
    return path.split('/');
  }
}

/**
 *
 * @param website WebSiteDataModel
 * @param path startWith / , eg: / , /goods , /goods/detail
 * @returns PageModelItem
 */
export const matchPath = (
  website: WebSiteDataModel | undefined,
  targetPath: string,
): { path: string; data: PageModelItem } | undefined => {

  if (!website) return;

  const targetPathArr = splitPath(targetPath);

  if (targetPathArr.find((i) => i === '*')) {
    throw new Error(
      '[matchPath] website custome path include *, redirect to 404',
    );
  }

  // 全匹配
  if (website[targetPath]) {
    return {
      path: targetPath,
      data: website[targetPath],
    };
  }

  // .html 后缀 且 不等于 index.html,
  if (/\/[^\/]+\.html$/.test(targetPath) && !/\/index\.html/.test(targetPath)) {
    return {
      path: targetPath,
      data: website[targetPath],
    };
  }

  // 通配
  let matchLen = 0;
  let resultKey: string;
  Object.keys(website || {}).forEach((path) => {

    if (!path.startsWith('/')) path = `/${path}`;

    const pathArr = splitPath(path);
    // 非必须容错：仅允许最后一个字符出现 *
    if (pathArr.slice(0, -1).find((i) => i === '*'))
      throw new Error('[matchPath] path include *');

    /**
     * 遍历路由规则列表，匹配命中立即停止遍历
     */
    let currentMatchLen = 0;
    let currentResultKey: string;
    for (let i = 0; i < pathArr.length; i += 1) {
      if (targetPathArr[i] !== pathArr[i]) {
        currentMatchLen = 0;
        currentResultKey = undefined;
        return;
      } else if (undefined === targetPathArr[i]) {
        currentMatchLen = 0;
        currentResultKey = undefined;
        return;
      }
      currentMatchLen = i + 1;
      currentResultKey = path;
    }

    if (matchLen < currentMatchLen) {
      matchLen = currentMatchLen;
      resultKey = currentResultKey;
    }
  });

  return {
    path: resultKey,
    data: website[resultKey],
  };
}

export const getMatchedSync = (
  urlObj: URL,
  websites: Record<string, WebSiteDataModel> = {},
): { path: string | undefined; data: PageModelItem | undefined } | undefined => {

  if (!urlObj.hostname) {
    return undefined;
  }

  const website = matchWebsite(urlObj.hostname, websites);

  if (!website) {
    return undefined;
  }

  const { data, path } = matchPath(website, urlObj.pathname);

  if (!data) {
    return { path: undefined, data: undefined };
  }

  return { data, path };
}