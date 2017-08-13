import pathToRegexp from 'path-to-regexp';

import { addUser, delUser, getUsers } from '../services/user.service';
import { takeLatest } from '../utils/sageHelper';
import { noticeError } from '../utils/notice';

export default {
    namespace: 'user',
    state: {
        users: []
    },
    reducers: {
        saveUsers(state, action) {
            return {
                ...state,
                users: action.users
            };
        }
    },
    effects: {
        *addUser({ payload }, { call }) {
            const { user } = payload;
            try {
                yield call(addUser, user);
            } catch (error) {
                noticeError(error);
            }
        },
        *delUser({ payload }, { call }) {
            const { key } = payload;
            try {
                yield call(delUser, key);
            } catch (error) {
                noticeError(error);
            }
        },
        getUsers: takeLatest(function* ({ payload }, { call, put }) {
            const data = yield call(getUsers);
            const users = [];
            data.forEach((snapshort) => {
                const user = snapshort.val();
                user.key = snapshort.key;
                users.push(user);
            });
            yield put({ type: 'saveUsers', users });
        })
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/users').exec(pathname);
                if (match) {
                    dispatch({ type: 'getUsers' });
                }
            });
        }
        // onUsersChange({ dispatch }) {
        //     const userRef = firebaseApp.database().ref('users');
        //     userRef.on('value', (snapshort) => {
        //     });
        // }
    }
};
