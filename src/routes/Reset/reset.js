import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import ResetForm from '../../components/ResetForm'
import { noticeSuccess, noticeError } from '../../utils/notice'
import styles from './reset.less'

class Reset extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get resetFormProps() {
    return {
      loading: this.props.loading,
      onSendEmail: this.props.onSendEmail
    }
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle" className={styles.normal}>
        <Col xs={22} sm={12} md={8} lg={6} xl={4}>
          <ResetForm {...this.resetFormProps} />
        </Col>
      </Row>
    )
  }
}

Reset.childContextTypes = {
  currentLanguage: PropTypes.string
}

Reset.defaultProps = {
  loading: false
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

const mapDispatchToProps = dispatch => ({
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
