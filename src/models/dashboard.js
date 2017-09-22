import pathToRegexp from 'path-to-regexp'

import { getCards, getSales } from '../services/dashboard.service'

export default {
  namespace: 'dashboard',
  state: {
    cards: [],
    sales: []
  },
  reducers: {
    saveCards(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    saveSales(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *getCards(action, { call, put }) {
      const response = yield call(getCards)
      yield put({ type: 'saveCards', payload: { cards: response.data } })
    },
    *getSales(action, { call, put }) {
      const response = yield call(getSales)
      yield put({ type: 'saveSales', payload: { sales: response.data } })
    }
  },
  subscriptions: {
    query({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/dashboard').exec(pathname)
        if (match) {
          dispatch({ type: 'getCards' })
          dispatch({ type: 'getSales' })
        }
      })
    }
  }
}
