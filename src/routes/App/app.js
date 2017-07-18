import React from 'react';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';

import styles from './app.less';
import Header from '../../components/Header/header';

const { Content, Footer, Sider } = Layout;

const App = ({ app, dispatch, children }) => {
    const { collapsed, mode, theme } = app;
    const onCollapse = () => dispatch({ type: 'app/toggleCollapse' });

    const siderProps = {
        collapsible: true,
        collapsed,
        onCollapse,
        breakpoint: 'lg',
    };

    const logout = () => {
        dispatch({ type: 'app/logout' });
    };

    const menusFunc = {
        logout,
    };

    const menus = [
        {
            key: 'logout',
            text: '注销',
        },
    ];

    const headerProps = {
        onSwitchSider: onCollapse,
        collapsed,
        menus,
        menusFunc,
        username: '用户',
    };

    return (
        <Layout className={styles.normal}>
            <Sider {...siderProps} >
                <div className={styles.logo}>
                    <img alt="logo" src="/favicon.ico" className={styles.dva} />
                    {collapsed ? '' : <span className={styles.title}>Dva Admin</span>}
                </div>
                <Menu theme={theme} mode={mode}>
                    <Menu.Item>test</Menu.Item>
                    <Menu.Item>test</Menu.Item>
                </Menu>
            </Sider>
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
});

export default connect(mapStateToProps)(App);
