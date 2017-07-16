import React from 'react';
import { Router } from 'dva/router';

import App from './routes/App/app';
import Login from './routes/Login/login';

const RouterConfig = ({ history }) => {
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
            component: Login,
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
