import { routerRedux } from 'dva/router';

import { fetchLogin } from '../services/login';

export default {
    namespace: 'login',
    state: {
        login: false,
        rememberMe: false,
    },
    reducers: {
        triggerCheckBox(state, action) {
            return {
                ...state,
                rememberMe: action.checked,
            };
        },
        loginSuccess(state) {
            return {
                ...state,
                login: true,
            };
        },
        loginFail(state) {
            return {
                ...state,
                login: false,
            };
        },
        cacheUser(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    effects: {
        *login({ payload }, { call, put, select }) {
            const { values, onSuccess, onError } = payload;
            const rememberMe = yield select(state => state.login.rememberMe);
            try {
                const data = yield call(fetchLogin, values);
                if (data.success) {
                    yield put({ type: 'loginSuccess' });
                    if (onSuccess && typeof onSuccess === 'function') {
                        yield onSuccess('Login success : )');
                    }
                    if (rememberMe) {
                        yield put({ type: 'cacheUser', payload: { ...values } });
                    }
                    yield put(routerRedux.push({ pathname: '/dashboard' }));
                } else {
                    yield put({ type: 'loginFail' });
                    if (onError && typeof onError === 'function') {
                        yield onError(data.message);
                    }
                }
            } catch (err) {
                yield onError(err.message);
            }
        },
    },
    subscriptions: {},
};
