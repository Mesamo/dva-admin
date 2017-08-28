import React from 'react'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import { Layout, Menu, Icon, Switch } from 'antd'

import translate from '../../i18n/translate'
import getMenus from '../Menus/menus'
import styles from './sider.less'

const Sider = ({
  collapsed,
  onCollapse,
  breakpoint,
  darkTheme,
  menus,
  toIndex,
  onChangeTheme,
  currentLanguage,
  pathname,
  messages
}) => {
  const menuItems = getMenus(menus, currentLanguage)
  const menuTheme = darkTheme ? 'dark' : 'light'
  const textColor = {
    color: darkTheme ? 'rgba(255, 255, 255, 0.67)' : 'rgba(0, 0, 0, 0.65)'
  }

  const props = {
    collapsed,
    onCollapse,
    breakpoint,
    trigger: null
  }

  const {
    changeThemeText,
    darkText,
    lightText
  } = messages

  const handleToIndex = () => {
    toIndex()
  }

  const handleOnChange = (checked) => {
    onChangeTheme(checked)
  }

  return (
    <Layout.Sider
      {...props}
      className={darkTheme ? '' : styles.white}
    >
      <QueueAnim delay={200} type="top" onClick={handleToIndex}>
        <div className={styles.logo} key="1">
          <img alt="logo" src="/favicon.ico" className={styles.dva} />
          {collapsed ? '' : <span className={styles.title} style={textColor}>Dva Admin</span>}
        </div>
      </QueueAnim>
      <QueueAnim delay={400} type="left">
        <Menu key="1" theme={menuTheme} mode={collapsed ? 'vertical' : 'inline'} selectedKeys={[pathname]}>
          {menuItems}
        </Menu>
      </QueueAnim>
      {collapsed ? '' :
      <QueueAnim delay={600} type="top">
        <div className={styles.switchtheme} key="1">
          <span style={textColor}><Icon type="bulb" />{changeThemeText}</span>
          <Switch
            onChange={handleOnChange}
            defaultChecked={darkTheme}
            checkedChildren={darkText}
            unCheckedChildren={lightText}
          />
        </div>
      </QueueAnim>}
    </Layout.Sider>
  )
}

Sider.defaultProps = {
  messages: {
    changeThemeText: 'Change Theme',
    darkText: 'dark',
    lightText: 'light'
  },
  currentLanguage: 'en',
  breakpoint: 'lg',
  darkTheme: true
}

Sider.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  breakpoint: PropTypes.string,
  darkTheme: PropTypes.bool,
  menus: PropTypes.any,
  toIndex: PropTypes.func,
  onChangeTheme: PropTypes.func,
  currentLanguage: PropTypes.string,
  pathname: PropTypes.string,
  messages: PropTypes.object
}

export default translate('Sider')(Sider)
