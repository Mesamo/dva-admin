import { routerRedux } from 'dva/router';

import { fetchLogin } from '../services/login';
import { write, read, remove } from '../utils/localstorge';

const authorizedUrl = [
    '/',
    '',
];

export default {
    namespace: 'login',
    state: {
        email: '',
        attemptedUrl: '/',
        rememberMe: true,
    },
    reducers: {
        triggerCheckBox(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        cacheEmail(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        saveAttemptedUrl(state, action) {
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
            const attemptedUrl = yield select(state => state.login.attemptedUrl);
            try {
                const response = yield call(fetchLogin, email, password);
                if (response) {
                    if (onSuccess && typeof onSuccess === 'function') {
                        yield onSuccess('Login success : )');
                        yield sessionStorage.setItem('isLogin', true);
                    }
                    if (rememberMe) {
                        yield write('email', email);
                    } else {
                        yield remove('email');
                    }
                    yield put(routerRedux.push({ pathname: attemptedUrl }));
                } else if (onError && typeof onError === 'function') {
                    yield onError(response.message);
                }
            } catch (error) {
                const message = `${error.code}; ${error.message}`;
                if (onError && typeof onError === 'function') {
                    yield onError(message);
                }
            }
        },
        *redirectToLogin({ payload }, { put }) {
            const isLogin = yield sessionStorage.getItem('isLogin');
            if (!isLogin) {
                const { attemptedUrl } = payload;
                yield put({ type: 'saveAttemptedUrl', payload: { attemptedUrl } });
                yield put(routerRedux.push('/login'));
            }
        },
        *redirectToApp({ payload }, { put }) {
            const isLogin = sessionStorage.getItem('isLogin');
            if (isLogin) {
                yield put(routerRedux.push({ pathname: '/' }));
            }
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            const email = read('email');
            dispatch({ type: 'cacheEmail', payload: { email } });
        },
        checkLogin({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/login') {
                    dispatch({ type: 'redirectToApp', payload: {} });
                } else if (authorizedUrl.indexOf(pathname) > -1) {
                    dispatch({ type: 'redirectToLogin', payload: { attemptedUrl: pathname } });
                }
            });
        },
    },
};
