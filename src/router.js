import React from 'react'
import { Switch, Route, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'

import App from './routes/App/app'
import AppModel from './models/app'

const { ConnectedRouter } = routerRedux

const Routers = ({ history, app }) => {
  app.model(AppModel)

  const routes = [{
    path: '/login',
    models: () => [import('./models/login')],
    component: () => import('./routes/Login/login')
  }, {
    path: '/register',
    models: () => [import('./models/register')],
    component: () => import('./routes/Register/register')
  }, {
    path: '/reset',
    models: () => [import('./models/reset')],
    component: () => import('./routes/Reset/reset')
  }, {
    path: '/',
    component: () => import('./routes/Contents/IndexPage/index-page')
  }, {
    path: '/dashboard',
    component: () => import('./routes/Contents/dashboard/dashboard')
  }, {
    path: '/users',
    models: () => [import('./models/user')],
    component: () => import('./routes/Contents/users/users')
  }]

  const error = dynamic({
    app,
    component: () => import('./routes/Error/error')
  })

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

export default Routers
