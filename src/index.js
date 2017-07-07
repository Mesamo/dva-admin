import dva from 'dva';
import { browserHistory } from 'dva/router';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({
    history: browserHistory,
});

// 2. Plugins
app.use(createLoading({ effect: true }));

if (process.env.NODE_ENV === 'development') {
    app.use({ onAction: createLogger() });
}

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
