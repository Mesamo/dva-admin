import { routerRedux } from 'dva/router';

import { fetchLogout, currentUser } from '../services/login.service.';
import fetchMessage from '../services/local.service';
import { readObject } from '../utils/localstorge';
import CONSTANTS from '../utils/constants';
import { takeLatest } from '../utils/sageHelper';

export default {
    namespace: 'app',
    state: {
        currentLanguage: '',
        supportLanguages: ['zh-CN', 'en-US'],
        username: 'user',
        collapsed: false,
        darkTheme: true,
        attemptedUrl: '/',
        message: null
    },
    reducers: {
        toggleCollapse(state) {
            return {
                ...state,
                collapsed: !state.collapsed
            };
        },
        saveAttemptedUrl(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
        saveUsername(state, action) {
            return {
                ...state,
                username: action.username
            };
        },
        changeTheme(state) {
            return {
                ...state,
                darkTheme: !state.darkTheme
            };
        },
        saveLanguage(state, action) {
            return {
                ...state,
                currentLanguage: action.currentLanguage
            };
        },
        saveMessage(state, action) {
            return {
                ...state,
                message: {
                    ...action.message
                }
            };
        }
    },
    effects: {
        logout: takeLatest(function* logout({ payload }, { put, call }) {
            yield call(fetchLogout);
            yield put(routerRedux.push({ pathname: '/login' }));
        }),
        *redirectToLogin({ payload }, { put }) {
            yield put({ type: 'saveAttemptedUrl', payload });
            yield put(routerRedux.push('/login'));
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
        *getMessage({ payload }, { put, call, select }) {
            try {
                const { currentLanguage } = payload;
                const supported = yield select(state => state.app.supportLanguages);
                if (supported.indexOf(currentLanguage) > -1) {
                    const response = yield call(fetchMessage, currentLanguage);
                    if (response.data) {
                        yield [
                            put({ type: 'saveLanguage', currentLanguage }),
                            put({ type: 'saveMessage', message: response.data })
                        ];
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            return dispatch({ type: 'getMessage', payload: { currentLanguage: CONSTANTS.DEFAULT_LOCAL } });
        }
    }
};
