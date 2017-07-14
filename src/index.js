import dva from 'dva';
import { browserHistory } from 'dva/router';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import * as firebase from 'firebase';
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

if (process.env.NODE_ENV === 'development') {
    app.use({ onAction: createLogger() });
}

// 3. Model
app.model(require('./models/app'));
// app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

const config = {
    apiKey: 'AIzaSyCJU9v5f1ygHyvrUGOxueN9OV18VIEuFWA',
    authDomain: 'dva-admin.firebaseapp.com',
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
    // storageBucket: '<BUCKET>.appspot.com',
};
firebase.initializeApp(config);
