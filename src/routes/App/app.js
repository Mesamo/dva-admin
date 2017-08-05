import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Layout } from 'antd';

import styles from './app.less';
import Header from '../../components/Header/header';
import Sider from '../../components/Sider/sider';
import menus from '../../utils/menu';

const { Content, Footer } = Layout;

class App extends React.Component {
    getChildContext() {
        const { currentLanguage } = this.props.app;
        return {
            currentLanguage
        };
    }

    render() {
        const { app, dispatch, children, location } = this.props;
        const { collapsed, darkTheme, username, currentLanguage, supportLanguages } = app;
        const onCollapse = () => dispatch({ type: 'app/toggleCollapse' });
        const changeTheme = checked => dispatch({ type: 'app/changeTheme', darkTheme: checked });
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
            currentLanguage,
            pathname: location.pathname
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
                name: 'logoutText'
            }
        ];

        const changeLanguage = (language) => {
            dispatch({ type: 'app/changeLanguage', currentLanguage: language });
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

        return (
            <Layout className={styles.normal}>
                <Sider {...siderProps} />
                <Layout className={styles.layout} style={{ marginLeft: collapsed ? 64 : 200 }}>
                    <Header {...headerProps} />
                    <Content className={styles.content}>
                        {children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

App.childContextTypes = {
    currentLanguage: PropTypes.string
};

const mapStateToProps = state => ({
    app: state.app,
    login: state.login
});

export default connect(mapStateToProps)(App);
