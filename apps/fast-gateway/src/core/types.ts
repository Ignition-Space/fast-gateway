export enum XY_ENV {
  dev = 'dev',
  fix = 'fix',
  test = 'test',
  prod = 'prod',
}

export interface ResponseBase {
  success: boolean;
  errorMsg?: string;
}

/**
 * @description 站点数据模型
 */
export interface WebSiteDataModel {
  /**
   * @description 站点下的所有 path 表
   */
  [host: string]: {
    [path: string]: PageModelItem;
  }
}

export interface PageModelItem {
  /**
   * @description 最后修改时间
   */
  lastModified?: number;

  /**
   * @description 页面 id
   */
  pageId?: number;

  /**
   * @description 权限
   */
  permissions?: Array<() => (boolean | Promise<boolean>) | boolean>;
}

/**
 * @description 网站路由数据模型
 */
export interface RouterDataModel {
  host: string;
  /**
   * @description 站点路由注册名称，支持 * 通配符
   */
  routes: RouteDataModel[];
  /**
   * @description 兜底路由，缺省值 404；
   * @default 404
   */
  defaultRoute?: string;
}

export interface RouteDataModel {
  path: string;
  html: string;
}
