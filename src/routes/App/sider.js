import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import Sider from '../../components/Sider'
import menus from '../../utils/menu'

class SiderContainer extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get siderProps() {
    return {
      breakpoint: 'lg',
      menus,
      collapsed: this.props.collapsed,
      darkTheme: this.props.darkTheme,
      currentLanguage: this.props.currentLanguage,
      pathname: this.props.pathname,
      toIndex: this.props.toIndex,
      onChangeTheme: this.props.onChangeTheme
    }
  }

  render() {
    return (
      <Sider {...this.siderProps} />
    )
  }
}

SiderContainer.childContextTypes = {
  currentLanguage: PropTypes.string.isRequired
}

SiderContainer.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  toIndex: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired
}

SiderContainer.__ANT_LAYOUT_SIDER = true

const mapStateToProps = state => ({
  collapsed: state.app.collapsed,
  darkTheme: state.app.darkTheme,
  currentLanguage: state.app.currentLanguage,
  pathname: state.routing.location.pathname
})

const mapDispatchToProps = dispatch => ({
  toIndex: () => dispatch(routerRedux.push('/')),
  onChangeTheme: checked => dispatch({ type: 'app/changeTheme', darkTheme: checked })
})

export default connect(mapStateToProps, mapDispatchToProps)(SiderContainer)
