import React from 'react';
import { Router, Route } from 'dva/router';

import {
    IndexPage,
    Login,
    App,
} from './routes';

const RouterConfig = ({ history }) => {
    return (
        <Router history={history}>
            <Route path="/" component={IndexPage} />
            <Route path="/login" component={Login} />
            <Route path="/app" component={App} />
        </Router>
    );
};

export default RouterConfig;
