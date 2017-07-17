import React, { PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';

import styles from './header.less';

const SubMenu = Menu.SubMenu;

const Header = ({
    switchSider,
    collapsed,
    handleClickMenu,
    username,
    logoutText,
}) => {
    return (
        <Layout.Header className={styles.header}>
            <div className={styles.button} onClick={switchSider}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <div className={styles.right}>
                <Menu mode="horizontal" onClick={handleClickMenu} style={{ textAlign: 'center' }}>
                    <SubMenu title={<span><Icon type="user" />{username}</span>}>
                        <Menu.Item key="logout">
                            <a>{logoutText}</a>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </Layout.Header>
    );
};

Header.defaultProps = {
    username: 'user',
    logoutText: 'logout',
};

Header.propTypes = {
    switchSider: PropTypes.func,
    collapsed: PropTypes.bool.isRequired,
    handleClickMenu: PropTypes.func.isRequired,
    username: PropTypes.string,
    logoutText: PropTypes.string,
};

export default Header;
