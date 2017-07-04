import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';

import LoginForm from '../components/login/LoginForm';

const Login = ({
  login,
  dispatch,
}) => {
  const onLogin = (values) => {
    dispatch({ type: 'login/login', payload: values });
  };

  const onChange = (values) => {
    dispatch({ type: 'login/triggerCheckBox', checked: values });
  };

  const prop = {
    login,
    onLogin,
    onChange,
    usernameText: '用户名',
    passwordText: '密码',
    rememberMeText: '记住密码',
    forgetPasswdText: '忘记密码',
    loginButtonText: '登录',
    registerText: '现在注册',
  };

  return (
    <div className={styles.normal}>
      <LoginForm {...prop} />
    </div>
  );
};

// function mapStateToProps() {
//   return {};
// }

export default connect(({ login }) => ({ login }))(Login);
