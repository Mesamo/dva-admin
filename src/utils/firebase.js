import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  projectId: 'dva-admin',
  apiKey: 'AIzaSyCJU9v5f1ygHyvrUGOxueN9OV18VIEuFWA',
  authDomain: 'dva-admin.firebaseapp.com',
  databaseURL: 'https://dva-admin.firebaseio.com',
  storageBucket: 'dva-admin.appspot.com'
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp
