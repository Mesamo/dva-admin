import { fetchRegister } from '../services/login.service.'

export default {
  namespace: 'register',
  state: {
  },
  reducers: {
  },
  effects: {
    *register({ payload, onSuccess, onError }, { call }) {
      const { email, password } = payload
      try {
        const response = yield call(fetchRegister, email, password)
        if (response) {
          // 调用登录成功回调
          yield onSuccess('Register success : )')
        } else {
          // 调用登录失败回调
          yield onError(response.message)
        }
      } catch (error) {
        yield onError(error.code, error.message)
      }
    }
  },
  subscriptions: {
  }
}
