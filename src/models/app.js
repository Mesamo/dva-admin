import { routerRedux } from 'dva/router';

import { fetchLogout, currentUser } from '../services/login';
import { readObject } from '../utils/localstorge';
import CONSTANTS from '../utils/constants';

export default {
    namespace: 'app',
    state: {
        username: 'user',
        collapsed: false,
        menuTheme: 'dark',
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
        saveUsername(state, action) {
            return {
                ...state,
                username: action.username,
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
            yield put(routerRedux.push('/login'));
            yield put({ type: 'saveAttemptedUrl', payload });
        },
        *redirectToApp({ payload }, { put }) {
            yield put(routerRedux.push({ pathname: '/' }));
        },
        *checkLogin({ payload, onComplete }, { put, call }) {
            const user = yield call(currentUser);
            const cacheUser = readObject(CONSTANTS.KEY_FOR_AUTH);
            const isAuthUser = user || cacheUser;
            if (isAuthUser) {
                const username = isAuthUser.email.split('@')[0];
                yield put({ type: 'saveUsername', username });
                onComplete();
            } else {
                const { attemptedUrl } = payload;
                yield put({ type: 'redirectToLogin', payload: { attemptedUrl } });
            }
        },
    },
    subscriptions: {
    },
};
