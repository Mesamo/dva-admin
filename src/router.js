import React from 'react';
import { Router } from 'dva/router';

import App from './routes/App/app';

const cached = {};
function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

const RouterConfig = ({ history, app }) => {
    const routes = [
        // app
        {
            path: '/',
            component: App,
            getIndexRoute(nextState, callback) {
                require.ensure([], (require) => {
                    callback(null, {
                        component: require('./routes/IndexPage/index'),
                    });
                });
            },
            childRoutes: [],
        },
        // login
        {
            path: 'login',
            name: 'login',
            getComponent(nextState, callback) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/login'));
                    callback(null, require('./routes/Login/login'));
                });
            },
        },
        // error
        {
            path: '*',
            name: 'error',
            getComponent(nextState, callback) {
                require.ensure([], (require) => {
                    callback(null, require('./routes/Error/error'));
                });
            },
        },
    ];
    return (
        <Router history={history} routes={routes} />
    );
};

export default RouterConfig;
