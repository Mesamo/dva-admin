import { routerRedux } from 'dva/router';

import { fetchLogout } from '../services/login';

const authorizedUrl = [
    '/',
    '',
];

export default {
    namespace: 'app',
    state: {
        collapsed: false,
        mode: 'inline',
        theme: 'dark',
        attemptedUrl: '/',
    },
    reducers: {
        toggleCollapse(state) {
            return {
                ...state,
                collapsed: !state.collapsed,
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
        *logout({ payload }, { put, call }) {
            yield call(fetchLogout);
            yield sessionStorage.removeItem('isLogin');
            yield put(routerRedux.push({ pathname: '/login' }));
        },
        *redirectToLogin({ payload }, { put }) {
            yield put({ type: 'saveAttemptedUrl', payload });
            yield put(routerRedux.push('/login'));
        },
        *redirectToApp({ payload }, { put }) {
            yield put(routerRedux.push({ pathname: '/' }));
        },
    },
    subscriptions: {
        checkLogin({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const isLogin = sessionStorage.getItem('isLogin');
                if (isLogin && pathname === '/login') {
                    dispatch({ type: 'redirectToApp', payload: {} });
                } else if (!isLogin && authorizedUrl.indexOf(pathname) > -1) {
                    dispatch({ type: 'redirectToLogin', payload: { attemptedUrl: pathname } });
                }
            });
        },
    },
};
