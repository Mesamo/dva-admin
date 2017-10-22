import firebaseApp from '../utils/firebase'

export const getUsers = () => {
  const userListRef = firebaseApp.database().ref('users')
  return userListRef.once('value')
}

export const delUser = (key) => {
  const userRef = firebaseApp.database().ref('users').child(key)
  return userRef.remove()
}

export const addUser = (user) => {
  const userRef = firebaseApp.database().ref('users').push()
  return userRef.set(user)
}

export const updateUser = (user) => {
  const { key, ...withOutKeyUser } = user
  const userRef = firebaseApp.database().ref('users').child(key)
  if (userRef) {
    userRef.update(withOutKeyUser)
  }
}
