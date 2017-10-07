import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'dva/router'
import { connect } from 'dva'

import { currentUser } from '../../services/login.service'

class AuthorizedRoute extends React.Component {
  render() {
    const {
      path, exact, asyncComponent, location, dispatch
    } = this.props
    if (currentUser()) {
      return (
        <Route path={path} exact={exact} component={asyncComponent} />
      )
    } else {
      dispatch({ type: 'app/saveAttemptedUrl', payload: { attemptedUrl: location.pathname } })
      return (
        <Redirect to="/login" />
      )
    }
  }
}

AuthorizedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  asyncComponent: PropTypes.func.isRequired
}

export default connect()(AuthorizedRoute)
