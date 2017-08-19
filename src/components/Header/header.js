import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Popover } from 'antd'

import translate from '../../i18n/translate'
import getMenus from '../Menus/menus'
import styles from './header.less'

const SubMenu = Menu.SubMenu

const Header = ({
  menus,
  pathname,
  isNavbar,
  onSwitchSider,
  collapsed,
  headerMenus,
  headerMenusFunc,
  currentLanguage,
  supportLanguages,
  onChangeLanguage,
  username,
  messages
}) => {
  const { translations } = messages
  const handleClickMenu = e => headerMenusFunc[e.key]()
  const handleSwitchSider = () => onSwitchSider()
  const handleChangeLanguage = ({ key }) => {
    onChangeLanguage(key)
  }

  let headerButton

  if (isNavbar) {
    const content = (
      <Menu key="1" selectedKeys={[pathname]} mode="inline">
        {getMenus(menus, currentLanguage)}
      </Menu>
    )

    headerButton = (
      <Popover placement="bottomLeft" overlayClassName={styles.popovermenu} content={content}>
        <div className={styles.button}>
          <Icon type="bars" />
        </div>
      </Popover>
    )
  } else {
    headerButton = (
      <div className={styles.button} onClick={handleSwitchSider}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
    )
  }

  return (
    <Layout.Header className={styles.header}>
      {headerButton}
      <div className={styles.right}>
        <Menu mode="horizontal" onClick={handleChangeLanguage} style={{ textAlign: 'center', zIndex: 1 }}>
          <SubMenu title={<span>{translations}</span>}>
            {supportLanguages
              .filter(language => language !== currentLanguage)
              .map((language) => {
                return (
                  <Menu.Item key={language}>
                    {language}
                  </Menu.Item>
                )
              })
            }
          </SubMenu>
        </Menu>
        <Menu mode="horizontal" onClick={handleClickMenu} style={{ textAlign: 'center', zIndex: 1 }}>
          <SubMenu title={<span><Icon type="user" />{username}</span>}>
            {headerMenus.map(menu => (
              <Menu.Item key={menu.key}>
                <a>{messages[menu.name] ? messages[menu.name] : menu.name}</a>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

Header.defaultProps = {
  messages: {
    translations: 'Translations'
  },
  username: 'user'
}

Header.propTypes = {
  menus: PropTypes.array,
  pathname: PropTypes.string,
  isNavbar: PropTypes.bool,
  onSwitchSider: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
  headerMenus: PropTypes.array,
  headerMenusFunc: PropTypes.object,
  currentLanguage: PropTypes.string,
  supportLanguages: PropTypes.array,
  onChangeLanguage: PropTypes.func,
  username: PropTypes.string,
  messages: PropTypes.object
}

export default translate('Header')(Header)
