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
  const {
    name, gender, age, email, phone, address
  } = user
  const userRef = firebaseApp.database().ref('users').push()
  return userRef.set({
    name,
    gender,
    age,
    email,
    phone,
    address
  })
}

export const updateUser = (user) => {
  const {
    key, name, gender, age, email, phone, address
  } = user
  const userRef = firebaseApp.database().ref('users').child(key)
  if (userRef) {
    userRef.update({
      name,
      gender,
      age,
      email,
      phone,
      address
    })
  }
}
