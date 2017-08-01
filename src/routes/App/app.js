import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Layout } from 'antd';

import styles from './app.less';
import Header from '../../components/Header/header';
import Sider from '../../components/Sider/sider';
import menus from '../../utils/menu';

const { Content, Footer } = Layout;

const App = ({ app, dispatch, children }) => {
    const { collapsed, darkTheme, username, currentLanguage, supportLanguages, message } = app;
    const onCollapse = () => dispatch({ type: 'app/toggleCollapse' });
    const changeTheme = () => dispatch({ type: 'app/changeTheme' });
    const toIndex = () => dispatch(routerRedux.push('/'));

    const siderProps = {
        collapsible: true,
        collapsed,
        onCollapse,
        breakpoint: 'lg',
        darkTheme,
        menus,
        toIndex,
        changeTheme,
        language: currentLanguage
    };

    const logout = () => {
        dispatch({ type: 'app/logout' });
    };

    const headerMenusFunc = {
        logout
    };

    const headerMenus = [
        {
            key: 'logout',
            name: message ? message.logout : 'Sign out'
        }
    ];

    const changeLanguage = (language) => {
        dispatch({ type: 'app/getMessage', payload: { currentLanguage: language } });
    };

    const headerProps = {
        onSwitchSider: onCollapse,
        collapsed,
        menus: headerMenus,
        menusFunc: headerMenusFunc,
        currentLanguage,
        supportLanguages,
        changeLanguage,
        username
    };

    if (message) {
        headerProps.translations = message.translations;
        siderProps.changeThemeText = message.changeThemeText;
        siderProps.darkText = message.darkText;
        siderProps.lightText = message.lightText;
    }

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
    login: state.login
});

export default connect(mapStateToProps)(App);
