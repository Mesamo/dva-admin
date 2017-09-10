import firebaseApp from '../utils/firebase'

export const fetchLogin = (email, password) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password)
}

export const fetchLogout = () => {
  return firebaseApp.auth().signOut()
}

export const currentUser = () => {
  return firebaseApp.auth().currentUser
}

export const fetchRegister = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
}

export const sendResetPasswordEmail = (email) => {
  return firebaseApp.auth().sendPasswordResetEmail(email)
}
