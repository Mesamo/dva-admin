import { fetchRegister } from '../services/login.service'

export default {
  namespace: 'register',
  state: {},
  reducers: {},
  effects: {
    *register({ payload, onSuccess, onError }, { call }) {
      const { email, password } = payload
      try {
        const response = yield call(fetchRegister, email, password)
        if (response) {
          yield onSuccess('Register success : )')
        } else {
          yield onError(response.message)
        }
      } catch (error) {
        yield onError(error.code, error.message)
      }
    }
  },
  subscriptions: {}
}
