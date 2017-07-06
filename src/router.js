import React from 'react';
import { Router, Route } from 'dva/router';

import IndexPage from './routes/IndexPage';
import Login from './routes/Login.js';
import Dashboard from './routes/Dashboard.js';

const RouterConfig = ({ history }) => {
    return (
      <Router history={history}>
        <Route path="/" component={IndexPage} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    );
};

export default RouterConfig;
