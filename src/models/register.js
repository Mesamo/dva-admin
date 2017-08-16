import { routerRedux } from 'dva/router';

import { fetchRegister } from '../services/login.service.';

export default {
  namespace: 'register',
  state: {
  },
  reducers: {
  },
  effects: {
    *register({ payload }, { call, put }) {
      const { email, password, onSuccess, onError } = payload;
      try {
        const response = yield call(fetchRegister, email, password);
        if (response) {
          // 调用登录成功回调
          yield onSuccess('Register success : )');
          // 缓存邮箱
          yield put({ type: 'login/cacheEmail', payload: { email } });
          // 路由切换到登录页面
          yield put(routerRedux.push('/login'));
        } else {
          // 调用登录失败回调
          yield onError(response.message);
        }
      } catch (error) {
        yield onError(error.code, error.message);
      }
    }
  },
  subscriptions: {
  }
};
