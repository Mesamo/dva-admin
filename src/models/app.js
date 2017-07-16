import { routerRedux } from 'dva/router';

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
        toggleCollapse(state, action) {
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
