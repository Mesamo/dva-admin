import React from 'react';
import { Router, Route } from 'dva/router';

import {
    IndexPage,
    Login,
    App,
    Error,
} from './routes';

const RouterConfig = ({ history }) => {
    return (
        <Router history={history}>
            <Route path="/" component={IndexPage} />
            <Route path="/login" component={Login} />
            <Route path="/app" component={App} />
            <Route path="*" component={Error} />
        </Router>
    );
};

export default RouterConfig;
