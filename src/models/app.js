import { routerRedux } from 'dva/router';

import { fetchLogout } from '../services/login.service.';
import fetchMessage from '../services/local.service';
import { addUser } from '../services/user.service';
import CONSTANTS from '../utils/constants';
import { takeLatest } from '../utils/sageHelper';
import firebaseApp from '../firebase';

export default {
    namespace: 'app',
    state: {
        currentLanguage: '',
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
        },
        *getMessage({ payload }, { put, call, select }) {
            try {
                const { currentLanguage } = payload;
                const language = yield select(state => state.app.currentLanguage);
                const message = yield select(state => state.app.message);

                if (!message || currentLanguage !== language) {
                    const supported = yield select(state => state.app.supportLanguages);
                    if (supported.indexOf(currentLanguage) > -1) {
                        const response = yield call(fetchMessage, currentLanguage);
                        if (response.data) {
                            yield put({ type: 'saveLanguage', currentLanguage });
                            yield put({ type: 'saveMessage', message: response.data });
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        *setUser({ payload }, { call }) {
            yield call(addUser, 'zhourui', 'test');
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            return dispatch({ type: 'getMessage', payload: { currentLanguage: CONSTANTS.DEFAULT_LOCAL } });
        },
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
