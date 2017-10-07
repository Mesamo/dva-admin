import { routerRedux } from 'dva/router'

import { fetchLogout } from '../services/login.service'
import { takeLatest } from '../utils/sageHelper'
import { read, write } from '../utils/localstorge'
import firebaseApp from '../utils/firebase'

export default {
  namespace: 'app',
  state: {
    currentLanguage: 'en-US',
    supportLanguages: ['zh-CN', 'en-US'],
    username: 'anonymous',
    collapsed: false,
    isNavbar: document.body.clientWidth < 769,
    darkTheme: true,
    attemptedUrl: '/'
  },
  reducers: {
    toggleCollapse(state) {
      return {
        ...state,
        collapsed: !state.collapsed
      }
    },
    saveAttemptedUrl(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    saveUsername(state, action) {
      return {
        ...state,
        username: action.username
      }
    },
    changeTheme(state, action) {
      write('darkTheme', action.darkTheme)
      return {
        ...state,
        darkTheme: action.darkTheme
      }
    },
    changeLanguage(state, action) {
      const { currentLanguage } = action
      write('currentLanguage', currentLanguage)
      return {
        ...state,
        currentLanguage
      }
    },
    switchSidebarResponsive(state, { payload }) {
      return {
        ...state,
        isNavbar: payload
      }
    }
  },
  effects: {
    logout: takeLatest(function* logout(action, { call, put }) {
      yield call(fetchLogout)
      yield put({ type: 'saveUsername', username: 'anonymous' })
      yield put({ type: 'redirectToLogin', payload: { attemptedUrl: '/' } })
    }),
    *redirectToLogin({ payload }, { put }) {
      yield put({ type: 'saveAttemptedUrl', payload })
      yield put(routerRedux.push('/login'))
    },
    *redirectToApp(action, { put, select }) {
      const attemptedUrl = yield select(state => state.app.attemptedUrl)
      yield put(routerRedux.push({ pathname: attemptedUrl }))
    },
    *siderResponsive(action, { put, select }) {
      const { app } = yield select(state => state)
      const isResponsive = document.body.clientWidth < 769
      if (isResponsive !== app.siderRespons) {
        yield put({ type: 'switchSidebarResponsive', payload: isResponsive })
      }
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      const currentLanguage = read('currentLanguage')
      const darkTheme = read('darkTheme')
      if (currentLanguage) {
        dispatch({ type: 'changeLanguage', currentLanguage })
      }
      if (darkTheme) {
        dispatch({ type: 'changeTheme', darkTheme: darkTheme === 'true' })
      }
    },
    onAuthStateChanged({ dispatch }) {
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          const username = user.email.split('@')[0]
          dispatch({ type: 'saveUsername', username })
          dispatch({ type: 'redirectToApp' })
        }
      })
    },
    resize({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: 'siderResponsive' })
      }
    }
  }
}
