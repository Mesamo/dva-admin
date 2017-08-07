import pathToRegexp from 'path-to-regexp';

import { addUser, getUser } from '../services/user.service';

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
        *addUser({ payload: user }, { call }) {
            yield call(addUser, user);
        },
        *getUser({ payload }, { call, put }) {
            const data = yield call(getUser);
            const users = [];
            data.forEach((snapshort) => {
                const user = snapshort.val();
                user.key = snapshort.key;
                users.push(user);
            });
            yield put({ type: 'saveUsers', users });
        }
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/users').exec(pathname);
                if (match) {
                    dispatch({ type: 'getUser' });
                }
            });
        }
    }
};
