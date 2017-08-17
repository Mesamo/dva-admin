import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Layout } from 'antd'

import styles from './app.less'
import Header from '../../components/Header/header'
import Sider from '../../components/Sider/sider'
import menus from '../../utils/menu'

const { Content, Footer } = Layout

class App extends React.Component {
  getChildContext() {
    const { currentLanguage } = this.props.app
    return {
      currentLanguage
    }
  }

  render() {
    const {
      app,
      onCollapse,
      onChangeTheme,
      toIndex,
      onLogout,
      onChangeLanguage,
      children,
      location
    } = this.props

    const {
      isNavbar,
      collapsed,
      darkTheme,
      username,
      currentLanguage,
      supportLanguages
    } = app

    const siderProps = {
      collapsible: true,
      collapsed,
      onCollapse,
      breakpoint: 'lg',
      darkTheme,
      menus,
      toIndex,
      onChangeTheme,
      currentLanguage,
      pathname: location.pathname
    }

    const headerMenusFunc = {
      logout: onLogout
    }

    const headerMenus = [
      {
        key: 'logout',
        name: 'logoutText'
      }
    ]

    const headerProps = {
      isNavbar,
      menus,
      pathname: location.pathname,
      onSwitchSider: onCollapse,
      collapsed,
      headerMenus,
      menusFunc: headerMenusFunc,
      currentLanguage,
      supportLanguages,
      onChangeLanguage,
      username
    }

    return (
      <Layout className={styles.normal}>
        {!isNavbar ? <Sider {...siderProps} /> : ''}
        <Layout className={styles.layout}>
          <Header {...headerProps} />
          <Content className={styles.content}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

App.childContextTypes = {
  currentLanguage: PropTypes.string
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  toIndex: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapse: () => dispatch({ type: 'app/toggleCollapse' }),
    onChangeTheme: checked => dispatch({ type: 'app/changeTheme', darkTheme: checked }),
    toIndex: () => dispatch(routerRedux.push('/')),
    onLogout: () => dispatch({ type: 'app/logout' }),
    onChangeLanguage: language => dispatch({ type: 'app/changeLanguage', currentLanguage: language })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
