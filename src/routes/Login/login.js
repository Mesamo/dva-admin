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
      login: this.props.login,
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

Login.propTypes = {
  login: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  supportLanguages: PropTypes.array.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  login: state.login,
  currentLanguage: state.app.currentLanguage,
  supportLanguages: state.app.supportLanguages,
  loading: state.loading.models.login
})

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (values) => {
      dispatch({ type: 'login/triggerCheckBox', payload: { rememberMe: values } })
    },
    onLogin: (email, password) => {
      dispatch({
        type: 'login/login',
        payload: {
          email,
          password
        },
        onSuccess: msg => noticeSuccess(msg),
        onError: (code, msg) => noticeError(code, msg)
      })
    },
    onMenuClick: (language) => {
      dispatch({ type: 'app/changeLanguage', currentLanguage: language })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
