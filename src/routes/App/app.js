import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';

import styles from './app.less';
import Header from '../../components/Header/header';
import Sider from '../../components/Sider/sider';
import menus from '../../utils/menu';

const { Content, Footer } = Layout;

const App = ({ app, dispatch, children }) => {
    const { collapsed, darkTheme, username } = app;
    const onCollapse = () => dispatch({ type: 'app/toggleCollapse' });
    const changeTheme = () => dispatch({ type: 'app/changeTheme' });

    const siderProps = {
        collapsible: true,
        collapsed,
        onCollapse,
        breakpoint: 'lg',
        darkTheme,
        menus,
        changeTheme,
    };

    const logout = () => {
        dispatch({ type: 'app/logout' });
    };

    const headerMenusFunc = {
        logout,
    };

    const headerMenus = [
        {
            key: 'logout',
            text: '注销',
        },
    ];

    const headerProps = {
        onSwitchSider: onCollapse,
        collapsed,
        menus: headerMenus,
        menusFunc: headerMenusFunc,
        username,
    };

    return (
        <Layout className={styles.normal}>
            <Sider {...siderProps} />
            <Layout>
                <Header {...headerProps} />
                <Content>
                    { children }
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

const mapStateToProps = state => ({
    app: state.app,
    login: state.login,
});

export default connect(mapStateToProps)(App);
