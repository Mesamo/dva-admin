import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import LoginForm from '../../components/LoginForm/login-form'
import ChangeLanguage from '../../components/ChangeLanguage/change-language'
import { noticeSuccess, noticeError } from '../../utils/notice'
import styles from './login.less'

class Login extends React.Component {
  getChildContext() {
    const currentLanguage = this.props.currentLanguage
    return {
      currentLanguage
    }
  }

  render() {
    const {
      login,
      currentLanguage,
      supportLanguages,
      loading,
      onLogin,
      onChange,
      onMenuClick
    } = this.props

    const loginFormProps = {
      login,
      loading,
      onLogin,
      onChange
    }

    const changeLanguageProps = {
      currentLanguage,
      supportLanguages,
      onMenuClick
    }

    return (
      <Row type="flex" justify="center" align="middle" className={styles.normal}>
        <ChangeLanguage {...changeLanguageProps} />
        <Col xs={22} sm={12} md={8} lg={6} xl={4}>
          <LoginForm {...loginFormProps} />
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
