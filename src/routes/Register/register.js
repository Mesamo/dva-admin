import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import RegisterForm from '../../components/RegisterForm/register-form';
import { noticeSuccess, noticeError } from '../../utils/notice';
import styles from './register.less';

class Register extends React.Component {
  getChildContext() {
    const currentLanguage = this.props.currentLanguage;
    return {
      currentLanguage
    };
  }

  render() {
    const { dispatch, loading } = this.props;

    const onRegister = (email, password) => dispatch({
      type: 'register/register',
      payload: {
        email,
        password
      },
      onSuccess: msg => noticeSuccess(msg),
      onError: (code, msg) => noticeError(code, msg)
    });

    const registerFormProps = {
      onRegister,
      loading
    };

    return (
      <Row type="flex" justify="center" align="middle" className={styles.normal}>
        <Col xs={22} sm={18} md={12} lg={10} xl={7}>
          <RegisterForm {...registerFormProps} />
        </Col>
      </Row>
    );
  }
}

Register.childContextTypes = {
  currentLanguage: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.app.currentLanguage,
    loading: state.loading.models.register
  };
};

export default connect(mapStateToProps)(Register);
