import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import Header from '../../components/Header'
import menus from '../../utils/menu'

class HeaderContainer extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get headerProps() {
    const headerMenusFunc = {
      logout: this.props.onLogout
    }

    const headerMenus = [
      {
        key: 'logout',
        name: 'logoutText'
      }
    ]

    return {
      isNavbar: this.props.isNavbar,
      collapsed: this.props.collapsed,
      username: this.props.username,
      pathname: this.props.pathname,
      currentLanguage: this.props.currentLanguage,
      supportLanguages: this.props.supportLanguages,
      menus,
      headerMenus,
      headerMenusFunc,
      onSwitchSider: this.props.onSwitchSider,
      onChangeLanguage: this.props.onChangeLanguage
    }
  }

  render() {
    return (
      <Header {...this.headerProps} />
    )
  }
}

HeaderContainer.childContextTypes = {
  currentLanguage: PropTypes.string.isRequired
}

HeaderContainer.propTypes = {
  isNavbar: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  supportLanguages: PropTypes.array.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSwitchSider: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isNavbar: state.app.isNavbar,
  collapsed: state.app.collapsed,
  username: state.app.username,
  pathname: state.routing.location.pathname,
  currentLanguage: state.app.currentLanguage,
  supportLanguages: state.app.supportLanguages
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({ type: 'app/logout' }),
  onSwitchSider: () => dispatch({ type: 'app/toggleCollapse' }),
  onChangeLanguage: language => dispatch({ type: 'app/changeLanguage', currentLanguage: language })
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
