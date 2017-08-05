import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import translate from '../../i18n/translate';
import styles from './header.less';

const SubMenu = Menu.SubMenu;

const Header = ({
    onSwitchSider,
    collapsed,
    menus,
    menusFunc,
    currentLanguage,
    supportLanguages,
    changeLanguage,
    username,
    messages
}) => {
    const { translations } = messages;
    const handleClickMenu = e => menusFunc[e.key]();
    const handleSwitchSider = () => onSwitchSider();
    const handleChangeLanguage = ({ key }) => {
        changeLanguage(key);
    };

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.button} onClick={handleSwitchSider}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <div className={styles.right}>
                <Menu mode="horizontal" onClick={handleChangeLanguage} style={{ zIndex: 1 }}>
                    <SubMenu title={<span>{translations}</span>}>
                        {supportLanguages
                            .filter(language => language !== currentLanguage)
                            .map((language) => {
                                return (
                                    <Menu.Item key={language}>
                                        {language}
                                    </Menu.Item>
                                );
                            })
                        }
                    </SubMenu>
                </Menu>
                <Menu mode="horizontal" onClick={handleClickMenu} style={{ textAlign: 'center', zIndex: 1 }}>
                    <SubMenu title={<span><Icon type="user" />{username}</span>}>
                        {menus.map(menu => (
                            <Menu.Item key={menu.key}>
                                <a>{messages[menu.name]}</a>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </div>
        </Layout.Header>
    );
};

Header.defaultProps = {
    messages: {
        translations: 'Translations'
    },
    username: 'user'
};

Header.propTypes = {
    onSwitchSider: PropTypes.func.isRequired,
    collapsed: PropTypes.bool,
    menus: PropTypes.array,
    menusFunc: PropTypes.object,
    currentLanguage: PropTypes.string,
    supportLanguages: PropTypes.array,
    changeLanguage: PropTypes.func,
    username: PropTypes.string,
    messages: PropTypes.object
};

export default translate('Header')(Header);
