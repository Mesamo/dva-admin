import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import ResetForm from '../../components/ResetForm/reset-form'
import { noticeSuccess, noticeError } from '../../utils/notice'
import styles from './reset.less'

class Reset extends React.Component {

  getChildContext() {
    const currentLanguage = this.props.currentLanguage
    return {
      currentLanguage
    }
  }

  render() {
    const {
      reset,
      loading,
      onSendEmail
    } = this.props

    const resetFormProps = {
      reset,
      loading,
      onSendEmail
    }

    return (
      <Row type="flex" justify="center" align="middle" className={styles.normal}>
        <Col xs={22} sm={12} md={8} lg={6} xl={4}>
          <ResetForm {...resetFormProps} />
        </Col>
      </Row>
    )
  }
}

Reset.childContextTypes = {
  currentLanguage: PropTypes.string
}

Reset.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onSendEmail: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.app.currentLanguage,
    loading: state.loading.models.reset
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendEmail: (email) => {
      dispatch({
        type: 'reset/sendEmil',
        payload: {
          email
        },
        onSuccess: msg => noticeSuccess(msg),
        onError: (code, msg) => noticeError(code, msg)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
