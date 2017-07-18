import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import firebase from 'firebase/app';
import 'firebase/auth';

import './index.less';

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(error) {
        console.error('app onError -- ', error);
    },
});

// 2. Plugins
app.use(createLoading({ effect: true }));

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

const config = {
    projectId: 'dva-admin',
    apiKey: 'AIzaSyCJU9v5f1ygHyvrUGOxueN9OV18VIEuFWA',
    authDomain: 'dva-admin.firebaseapp.com',
};
firebase.initializeApp(config);
