import pathToRegexp from 'path-to-regexp'

import { fetchLogin } from '../services/login.service'
import { write, read, remove } from '../utils/localstorge'
import { takeLatest } from '../utils/sageHelper'

export default {
  namespace: 'login',
  state: {
    email: '',
    rememberMe: false
  },
  reducers: {
    triggerCheckBox(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    saveEmail(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    login: takeLatest(function* login({ payload, onSuccess, onError }, { call, select }) {
      const { email, password } = payload
      const rememberMe = yield select(state => state.login.rememberMe)
      try {
        const response = yield call(fetchLogin, email, password)
        if (response) {
          yield onSuccess('Login success : )')
          if (rememberMe) {
            yield write('email', email)
          } else {
            yield remove('email')
          }
        } else {
          yield onError(response.message)
        }
      } catch (error) {
        yield onError(error.code, error.message)
      }
    })
  },
  subscriptions: {
    saveEmail({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/login').exec(pathname)
        if (match) {
          const email = read('email')
          if (email) {
            dispatch({ type: 'saveEmail', payload: { email } })
          }
        }
      })
    }
  }
}
