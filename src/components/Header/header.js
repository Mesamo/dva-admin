import React, { PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';

import styles from './header.less';

const SubMenu = Menu.SubMenu;

const Header = ({
    onSwitchSider,
    collapsed,
    menus,
    menusFunc,
    username
}) => {
    const handleClickMenu = e => menusFunc[e.key]();
    const handleSwitchSider = () => onSwitchSider();

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.button} onClick={handleSwitchSider}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <div className={styles.right}>
                <Menu mode="horizontal" onClick={handleClickMenu} style={{ textAlign: 'center' }}>
                    <SubMenu title={<span><Icon type="user" />{username}</span>}>
                        {menus.map(menu => (
                            <Menu.Item key={menu.key}>
                                <a>{menu.text}</a>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </div>
        </Layout.Header>
    );
};

Header.defaultProps = {
    username: 'user'
};

Header.propTypes = {
    onSwitchSider: PropTypes.func.isRequired,
    collapsed: PropTypes.bool,
    menus: PropTypes.array,
    menusFunc: PropTypes.object,
    username: PropTypes.string
};

export default Header;
