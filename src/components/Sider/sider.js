import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import QueueAnim from 'rc-queue-anim';
import { Layout, Menu, Icon, Switch } from 'antd';

import styles from './sider.less';

const SubMenu = Menu.SubMenu;

const Sider = ({
    collapsible,
    collapsed,
    onCollapse,
    breakpoint,
    darkTheme,
    menus,
    changeTheme
}) => {
    const props = {
        collapsible,
        collapsed,
        onCollapse,
        breakpoint,
        trigger: null
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
                        title={
                            <span>
                                {menu.icon ? <Icon type={menu.icon} /> : ''}
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
                            {menu.icon ? <Icon type={menu.icon} /> : ''}
                            <span>{menu.name}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });
    };

    const menuItems = getMenus(menus);
    const menuTheme = darkTheme ? 'dark' : 'light';
    const textColor = {
        color: darkTheme ? 'rgba(255, 255, 255, 0.67)' : 'rgba(0, 0, 0, 0.65)'
    };

    return (
        <Layout.Sider {...props} className={darkTheme ? '' : styles.white}>
            <QueueAnim delay={200} type="top">
                <div className={styles.logo} key="1">
                    <img alt="logo" src="/favicon.ico" className={styles.dva} />
                    {collapsed ? '' : <span className={styles.title} style={textColor}>Dva Admin</span>}
                </div>
            </QueueAnim>
            <QueueAnim delay={400} type="left">
                <Menu key="1" theme={menuTheme} mode={collapsed ? 'vertical' : 'inline'}>
                    {menuItems}
                </Menu>
            </QueueAnim>
            {collapsed ? '' :
            <QueueAnim delay={600} type="top">
                <div className={styles.switchtheme} key="1">
                    <span style={textColor}><Icon type="bulb" />切换主题</span>
                    <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
                </div>
            </QueueAnim>}
        </Layout.Sider>
    );
};

Sider.__ANT_LAYOUT_SIDER = true;

Sider.defaultProps = {
    breakpoint: 'lg',
    darkTheme: true
};

Sider.propTypes = {
    collapsible: PropTypes.bool,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    breakpoint: PropTypes.string,
    darkTheme: PropTypes.bool,
    menus: PropTypes.any
};

export default Sider;
