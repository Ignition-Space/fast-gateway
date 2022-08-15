/*
 * @Author: Cookie
 * @Date: 2021-07-18 18:04:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 23:10:51
 * @Description:
 */

import App from '@/App'

export interface RouterProps {
  path: string;
  component?: any;
  title?: string;
  exact?: boolean;
  name?: string;
  routes?: RouterProps[];
}

const routes: RouterProps[] = [
  {
    path: '/',
    component: App,
    exact: true,
    title: '首页',
  },
]

export default routes;