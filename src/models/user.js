import pathToRegexp from 'path-to-regexp';

import { addUser, delUser } from '../services/user.service';
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
        users: [],
        selectedKeys: []
    },
    reducers: {
        saveUsers(state, action) {
            return {
                ...state,
                users: action.users
            };
        },
        onSelectedChange(state, action) {
            return {
                ...state,
                selectedKeys: action.selectedKeys
            };
        }
    },
    effects: {
        *addUser({ payload }, { call }) {
            const { user, onSuccess, onError } = payload;
            try {
                yield call(addUser, user);
                onSuccess('add success : )');
            } catch (error) {
                onError(error.message);
            }
        },
        *delUser({ payload }, { call }) {
            const { key, onSuccess, onError } = payload;
            try {
                yield call(delUser, key);
                onSuccess('delete success : )');
            } catch (error) {
                onError(error.message);
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
