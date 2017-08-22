import React from 'react'
import { Router } from 'dva/router'

import App from './routes/App/app'
import AppModel from './models/app';

const cached = {}
// 注册model
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    cached[model.namespace] = 1
    app.model(model)
  }
}

const RouterConfig = ({ history, app }) => {
  // 登录验证
  const requireAuth = (nextState, replace, callback) => {
    app._store.dispatch({
      type: 'app/checkAuth',
      payload: { attemptedUrl: nextState.location.pathname },
      callback
    })
  }

  registerModel(app, AppModel)

  const routes = [{
    // app
    path: '/',
    component: App,
    onEnter: requireAuth,
    getIndexRoute(nextState, callback) {
      require.ensure([], (require) => {
        callback(null, {
          component: require('./routes/IndexPage/index')
        })
      })
    },
    childRoutes: [{
      // Dashboard
      path: 'dashboard',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./routes/Contents/dashboard/dashboard'))
        })
      }
    }, {
      // Users
      path: 'users',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/user'))
          callback(null, require('./routes/Contents/users/users'))
        })
      }
    }]
  }, {
    // login
    path: 'login',
    name: 'login',
    getComponent(nextState, callback) {
      require.ensure([], (require) => {
        registerModel(app, require('./models/login'))
        callback(null, require('./routes/Login/login'))
      })
    }
  }, {
    // Register
    path: 'register',
    name: 'register',
    getComponent(nextState, callback) {
      require.ensure([], (require) => {
        registerModel(app, require('./models/register'))
        callback(null, require('./routes/Register/register'))
      })
    }
  }, {
    // Reset
    path: 'reset',
    name: 'reset',
    getComponent(nextState, callback) {
      require.ensure([], (require) => {
        registerModel(app, require('./models/reset'))
        callback(null, require('./routes/Reset/reset'))
      })
    }
  }, {
    // Error
    path: '*',
    name: 'error',
    getComponent(nextState, callback) {
      require.ensure([], (require) => {
        callback(null, require('./routes/Error/error'))
      })
    }
  }]

  return (
    <Router history={history} routes={routes} />
  )
}

export default RouterConfig
