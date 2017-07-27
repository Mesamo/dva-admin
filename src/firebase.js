import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    projectId: 'dva-admin',
    apiKey: 'AIzaSyCJU9v5f1ygHyvrUGOxueN9OV18VIEuFWA',
    authDomain: 'dva-admin.firebaseapp.com'
};
firebase.initializeApp(config);
