import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import RegisterForm from '../../components/RegisterForm'
import { noticeSuccess, noticeError } from '../../utils/notice'
import styles from './register.less'

class Register extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get registerFormProps() {
    return {
      loading: this.props.loading,
      onRegister: this.props.onRegister
    }
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle" className={styles.normal}>
        <Col xs={22} sm={14} md={10} lg={8} xl={6}>
          <RegisterForm {...this.registerFormProps} />
        </Col>
      </Row>
    )
  }
}

Register.childContextTypes = {
  currentLanguage: PropTypes.string
}

Register.defaultProps = {
  loading: false
}

Register.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onRegister: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.app.currentLanguage,
    loading: state.loading.models.register
  }
}

const mapDispatchToProps = dispatch => ({
  onRegister: (email, password) => dispatch({
    type: 'register/register',
    payload: {
      email,
      password
    },
    onSuccess: msg => noticeSuccess(msg),
    onError: (code, msg) => noticeError(code, msg)
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
