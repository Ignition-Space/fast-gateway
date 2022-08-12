/*
 * @Author: Cookie
 * @Date: 2021-07-18 15:49:12
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-18 16:53:32
 * @Description:
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import routerConfig from './router/index'
import './base.less'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        {
          routerConfig.routes.map((route) => {
            return (
              <Route key={route.path} {...route} />
            )
          })
        }
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
