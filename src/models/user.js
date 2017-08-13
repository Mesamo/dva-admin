import pathToRegexp from 'path-to-regexp';

import { addUser, delUser } from '../services/user.service';
import { noticeError } from '../utils/notice';
import firebaseApp from '../firebase';

const convertUsersObjToArray = (usersObj) => {
    const users = [];
    usersObj.forEach((snapshort) => {
        const user = snapshort.val();
        user.key = snapshort.key;
        users.push(user);
    });
    return users;
};

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
        }
    },
    subscriptions: {
        onUsersChange({ history, dispatch }) {
            const userRef = firebaseApp.database().ref('users');
            history.listen(({ pathname }) => {
                const match = pathToRegexp('/users').exec(pathname);
                if (match) {
                    userRef.on('value', (snapshort) => {
                        const users = convertUsersObjToArray(snapshort);
                        dispatch({ type: 'saveUsers', users });
                    });
                } else {
                    userRef.off();
                }
            });
        }
    }
};
