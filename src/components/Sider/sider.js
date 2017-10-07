import React from 'react'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import { Layout, Menu, Icon, Switch } from 'antd'

import getMenus from '../Menus/menus'
import styles from './sider.less'

const Sider = ({
  collapsed,
  breakpoint,
  darkTheme,
  menus,
  currentLanguage,
  pathname,
  messages,
  toIndex,
  onChangeTheme
}) => {
  const menuItems = getMenus(menus, currentLanguage)
  const menuTheme = darkTheme ? 'dark' : 'light'
  const textColor = {
    color: darkTheme ? 'rgba(255, 255, 255, 0.67)' : 'rgba(0, 0, 0, 0.65)'
  }

  const props = {
    collapsed,
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

  const switchTheme = (
    <QueueAnim delay={600} type="left">
      <div className={styles.switchtheme} key="1">
        <span style={textColor}><Icon type="bulb" />{changeThemeText}</span>
        <Switch
          onChange={handleOnChange}
          defaultChecked={darkTheme}
          checkedChildren={darkText}
          unCheckedChildren={lightText}
        />
      </div>
    </QueueAnim>
  )

  return (
    <Layout.Sider className={darkTheme ? '' : styles.white} {...props}>
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
      {collapsed ? '' : switchTheme}
    </Layout.Sider>
  )
}

Sider.defaultProps = {
  messages: {
    changeThemeText: 'Change Theme',
    darkText: 'dark',
    lightText: 'light'
  },
  breakpoint: 'lg'
}

Sider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  breakpoint: PropTypes.string,
  darkTheme: PropTypes.bool.isRequired,
  menus: PropTypes.any.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  messages: PropTypes.object,
  toIndex: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired
}

export default Sider
