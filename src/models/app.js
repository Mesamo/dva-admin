import { routerRedux } from 'dva/router';

import { fetchLogout } from '../services/login.service.';
import { takeLatest } from '../utils/sageHelper';
import firebaseApp from '../firebase';

export default {
    namespace: 'app',
    state: {
        currentLanguage: 'en-US',
        supportLanguages: ['zh-CN', 'en-US'],
        username: 'user',
        collapsed: false,
        darkTheme: true,
        attemptedUrl: '',
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
        changeLanguage(state, action) {
            return {
                ...state,
                currentLanguage: action.currentLanguage
            };
        }
    },
    effects: {
        logout: takeLatest(function* logout({ payload }, { call, put }) {
            yield call(fetchLogout);
            yield put({ type: 'redirectToLogin', payload: { attemptedUrl: '/' } });
        }),
        *redirectToLogin({ payload }, { put }) {
            yield put({ type: 'saveAttemptedUrl', payload });
            yield put(routerRedux.push('/login'));
        },
        *redirectToApp({ payload }, { put, select }) {
            const attemptedUrl = yield select(state => state.app.attemptedUrl);
            yield put(routerRedux.push({ pathname: attemptedUrl }));
        }
    },
    subscriptions: {
        checkLogin({ dispatch }) {
            firebaseApp.auth().onAuthStateChanged((user) => {
                if (user) {
                    const username = user.email.split('@')[0];
                    dispatch({ type: 'saveUsername', username });
                    dispatch({ type: 'redirectToApp' });
                }
            });
        }
    }
};
