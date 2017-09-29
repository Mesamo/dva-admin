import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import LoginForm from '../../components/LoginForm'
import ChangeLanguage from '../../components/ChangeLanguage'
import { noticeSuccess, noticeError } from '../../utils/notice'
import styles from './login.less'

class Login extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get loginFormProps() {
    return {
      email: this.props.email,
      rememberMe: this.props.rememberMe,
      loading: this.props.loading,
      onLogin: this.props.onLogin,
      onChange: this.props.onChange
    }
  }

  get changeLanguageProps() {
    return {
      currentLanguage: this.props.currentLanguage,
      supportLanguages: this.props.supportLanguages,
      onMenuClick: this.props.onMenuClick
    }
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle" className={styles.normal}>
        <ChangeLanguage {...this.changeLanguageProps} />
        <Col xs={22} sm={12} md={8} lg={6} xl={4}>
          <LoginForm {...this.loginFormProps} />
        </Col>
      </Row>
    )
  }
}

Login.childContextTypes = {
  currentLanguage: PropTypes.string
}

Login.defaultProps = {
  loading: false
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  currentLanguage: PropTypes.string.isRequired,
  supportLanguages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  email: state.login.email,
  rememberMe: state.login.rememberMe,
  loading: state.loading.models.login,
  currentLanguage: state.app.currentLanguage,
  supportLanguages: state.app.supportLanguages
})

const mapDispatchToProps = dispatch => ({
  onChange: values => dispatch({ type: 'login/triggerCheckBox', payload: { rememberMe: values } }),
  onMenuClick: language => dispatch({ type: 'app/changeLanguage', currentLanguage: language }),
  onLogin: (email, password) => dispatch({
    type: 'login/login',
    payload: {
      email,
      password
    },
    onSuccess: msg => noticeSuccess(msg),
    onError: (code, msg) => noticeError(code, msg)
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
