import React from 'react'
import { Switch, Route, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'

import App from './routes/App'
import AuthorizedRoute from './routes/AuthorizedRoute/authorized-route'
import AppModel from './models/app'

const { ConnectedRouter } = routerRedux

const Routers = ({ history, app }) => {
  app.model(AppModel)

  const publicRoutes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/Login/login')
    },
    {
      path: '/register',
      models: () => [import('./models/register')],
      component: () => import('./routes/Register/register')
    },
    {
      path: '/reset',
      models: () => [import('./models/reset')],
      component: () => import('./routes/Reset/reset')
    }
  ]

  const authRoutes = [
    {
      path: '/',
      component: () => import('./routes/Contents/IndexPage/index-page')
    },
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/Contents/dashboard/dashboard')
    },
    {
      path: '/users',
      models: () => [import('./models/user')],
      component: () => import('./routes/Contents/users/users')
    }
  ]

  const error = dynamic({
    app,
    component: () => import('./routes/Error/error')
  })

  const getPublickRoutes = () => publicRoutes.map(({ path, ...dynamics }) => (
    <Route
      key={`public-${path}`}
      exact
      path={path}
      component={dynamic({ app, ...dynamics })}
    />
  ))

  const getAuthRoutes = () => authRoutes.map(({ path, ...dynamics }) => (
    <AuthorizedRoute
      key={`product-${path}`}
      exact
      path={path}
      asyncComponent={dynamic({ app, ...dynamics })}
    />
  ))

  return (
    <ConnectedRouter history={history}>
      <App publicPaths={publicRoutes.map(({ path }) => path)}>
        <Switch>
          {getPublickRoutes()}
          {getAuthRoutes()}
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

export default Routers
