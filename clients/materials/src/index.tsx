/*
 * @Author: Cookie
 * @Date: 2021-07-18 15:49:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 23:22:18
 * @Description:
 */

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import routes from '@/router';
import NestedRoute from '@/router/NestedRoute';
import './base.less'

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  <div className="body">
    <BrowserRouter>
      <Switch>
        {
          routes.map((item, index) => (
            <NestedRoute {...item} key={index} />
          ))
        }
        <Redirect to="/" exact />
      </Switch>
    </BrowserRouter>
  </div>,
);
