import pathToRegexp from 'path-to-regexp'

import { addUser, delUser, updateUser } from '../services/user.service'
import firebaseApp from '../utils/firebase'

export default {
  namespace: 'user',
  state: {
    mode: '',
    users: [],
    selectedUser: undefined,
    selectedKeys: [],
    modalVisible: false
  },
  reducers: {
    saveUsers(state, action) {
      return {
        ...state,
        users: action.users
      }
    },
    saveSelectedUser(state, action) {
      return {
        ...state,
        selectedUser: action.user
      }
    },
    onSelectedChange(state, action) {
      return {
        ...state,
        selectedKeys: action.selectedKeys
      }
    },
    showAddModal(state) {
      return {
        ...state,
        mode: 'add',
        modalVisible: true
      }
    },
    showEditModal(state) {
      return {
        ...state,
        mode: 'edit',
        modalVisible: true
      }
    },
    hideModal(state) {
      return {
        ...state,
        mode: '',
        modalVisible: false,
        selectedUser: undefined
      }
    }
  },
  effects: {
    *addUser({ payload, onSuccess, onError }, { call, put }) {
      const { user } = payload
      try {
        yield call(addUser, user)
        onSuccess('add success : )')
        yield put({ type: 'hideModal' })
      } catch (error) {
        onError(error.message)
      }
    },
    *editUser({ payload, onSuccess, onError }, { call, put, select }) {
      try {
        const key = yield select(state => state.user.selectedUser.key)
        const user = {
          ...payload.user,
          key
        }
        yield call(updateUser, user)
        onSuccess('edit success : )')
        yield put({ type: 'hideModal' })
      } catch (error) {
        onError(error.message)
      }
    },
    *delUser({ payload, onSuccess, onError }, { call }) {
      const { key } = payload
      try {
        yield call(delUser, key)
        onSuccess('delete success : )')
      } catch (error) {
        onError(error.message)
      }
    },
    *getSelectedUser({ payload }, { put, select }) {
      const { key } = payload
      const users = yield select(state => state.user.users)
      const user = users.find(u => u.key === key)
      yield put({ type: 'saveSelectedUser', user })
    },
    *convert({ payload }, { put }) {
      const users = []
      payload.usersObj.forEach((snapshort) => {
        users.push({ key: snapshort.key, ...snapshort.val() })
      })
      yield put({ type: 'saveUsers', users })
    }
  },
  subscriptions: {
    onUsersChange({ history, dispatch }) {
      let userRef
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/users').exec(pathname)
        if (match && !userRef) {
          userRef = firebaseApp.database().ref('users')
          userRef.on('value', (snapshort) => {
            dispatch({ type: 'convert', payload: { usersObj: snapshort } })
          })
        } else if (!match && userRef) {
          userRef.off()
          userRef = null
        }
      })
    }
  }
}
