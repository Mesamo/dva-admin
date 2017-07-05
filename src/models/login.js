import { routerRedux } from 'dva/router';

import { fetchLogin } from '../services/login';

export default {
  namespace: 'login',
  state: {
    login: false,
    loginButtonLoading: false,
    rememberMe: false,
  },
  reducers: {
    showButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true,
      };
    },
    hideButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: false,
      };
    },
    triggerCheckBox(state, action) {
      return {
        ...state,
        rememberMe: action.checked,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        loginButtonLoading: false,
        login: true,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        ...action.payload,
        loginButtonLoading: false,
        login: false,
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'showButtonLoading',
      });
      const data = yield call(fetchLogin, payload);
      if (data.success) {
        const { username } = payload;
        yield put({ type: 'loginSuccess', payload: { username } });
        yield put(routerRedux.push({
          state: {},
          pathname: '/dashboard',
          query: {},
        }));
      } else {
        yield put({ type: 'loginFail' });
      }
    },
  },
  subscriptions: {},
};
