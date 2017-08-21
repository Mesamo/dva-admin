import pathToRegexp from 'path-to-regexp'

import { addUser, delUser } from '../services/user.service'
import firebaseApp from '../utils/firebase'

export default {
  namespace: 'user',
  state: {
    users: [],
    selectedKeys: [],
    addModalVisible: false
  },
  reducers: {
    saveUsers(state, action) {
      return {
        ...state,
        users: action.users
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
        addModalVisible: true
      }
    },
    hideAddModal(state) {
      return {
        ...state,
        addModalVisible: false
      }
    }
  },
  effects: {
    *addUser({ payload, onSuccess, onError }, { call, put }) {
      const { user } = payload
      try {
        yield call(addUser, user)
        onSuccess('add success : )')
        yield put({ type: 'hideAddModal' })
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
    *convert({ payload }, { put }) {
      const { usersObj } = payload
      const users = []
      usersObj.forEach((snapshort) => {
        const user = snapshort.val()
        user.key = snapshort.key
        users.push(user)
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
