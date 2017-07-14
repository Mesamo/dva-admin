import { routerRedux } from 'dva/router';

import { fetchLogin } from '../services/login';
import { write, read, remove } from '../utils/localstorge';

export default {
    namespace: 'login',
    state: {
        login: false,
        email: '',
        rememberMe: true,
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
            const { email, password, onSuccess, onError } = payload;
            const rememberMe = yield select(state => state.login.rememberMe);
            try {
                const response = yield call(fetchLogin, email, password);
                if (response) {
                    yield put({ type: 'loginSuccess' });
                    if (onSuccess && typeof onSuccess === 'function') {
                        yield onSuccess('Login success : )');
                    }
                    if (rememberMe) {
                        yield write('email', email);
                        yield put({ type: 'cacheUser', payload: { email } });
                    } else {
                        yield remove('email');
                    }
                    yield put(routerRedux.push({ pathname: '/app' }));
                } else {
                    yield put({ type: 'loginFail' });
                    if (onError && typeof onError === 'function') {
                        yield onError(response.message);
                    }
                }
            } catch (error) {
                const message = `${error.code}; ${error.message}`;
                if (onError && typeof onError === 'function') {
                    yield onError(message);
                }
            }
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            const email = read('email');
            dispatch({ type: 'cacheUser', payload: { email } });
        },
    },
};
