import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';

import styles from './sider.less';

const SubMenu = Menu.SubMenu;

const Sider = ({
    collapsible,
    collapsed,
    onCollapse,
    breakpoint,
    menuTheme,
    menus,
}) => {
    const props = {
        collapsible,
        collapsed,
        onCollapse,
        breakpoint,
        trigger: null,
    };

    const topMenus = menus.map(item => item.key);

    const isTopMenu = (key) => {
        return topMenus.indexOf(key) >= 0;
    };

    const getMenus = (menuArray, parentPath = '/') => {
        return menuArray.map((menu) => {
            const linkTo = parentPath + menu.key;
            if (menu.subMenu && menu.subMenu.length > 0) {
                return (
                    <SubMenu
                        key={linkTo}
                        className={collapsed && isTopMenu(menu.key) ? styles.arrow : ''}
                        style={{ 'padding-left': '24px' }}
                        title={
                            <span>
                                {menu.icon ? <Icon type={menu.icon} className={collapsed && isTopMenu(menu.key) ? styles.collapsedIcon : ''} /> : ''}
                                {collapsed && isTopMenu(menu.key) ? '' : <span>{menu.name}</span>}
                            </span>}
                    >
                        {getMenus(menu.subMenu, `${linkTo}/`)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={linkTo}>
                        <Link to={linkTo}>
                            {menu.icon ? <Icon type={menu.icon} className={collapsed && isTopMenu(menu.key) ? styles.collapsedIcon : ''} /> : ''}
                            {collapsed && isTopMenu(menu.key) ? '' : <span>{menu.name}</span>}
                        </Link>
                    </Menu.Item>
                );
            }
        });
    };

    const menuItems = getMenus(menus);

    return (
        <Layout.Sider {...props}>
            <div className={styles.logo}>
                <img alt="logo" src="/favicon.ico" className={styles.dva} />
                {collapsed ? '' : <span className={styles.title}>Dva Admin</span>}
            </div>
            <Menu theme={menuTheme} mode={collapsed ? 'vertical' : 'inline'}>
                {menuItems}
            </Menu>
        </Layout.Sider>
    );
};

Sider.__ANT_LAYOUT_SIDER = true;

Sider.defaultProps = {
    breakpoint: 'lg',
    menuTheme: 'dark',
};

Sider.propTypes = {
    collapsible: PropTypes.bool,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    breakpoint: PropTypes.string,
    menuTheme: PropTypes.string,
    menus: PropTypes.any,
};

export default Sider;
