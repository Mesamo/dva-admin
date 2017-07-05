import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import styles from './Login.css';


import LoginForm from '../components/login/LoginForm';

const Login = ({
  login,
  dispatch,
}) => {
  const onLogin = (values) => {
    dispatch({ type: 'login/login', payload: values });
  };

  const loginSuccess = () => {
    message.success('Login successfully :)');
  };

  const onChange = (values) => {
    dispatch({ type: 'login/triggerCheckBox', checked: values });
  };

  const loginFormProps = {
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
      <LoginForm {...loginFormProps} />
    </div>
  );
};

const mapStateToProps = ({ login }) => ({ login });

export default connect(mapStateToProps)(Login);
