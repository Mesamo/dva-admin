import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import styles from './index.css';
import { LoginForm } from '../../components';

const Login = ({
    login,
    loading,
    dispatch,
}) => {
    const onSuccess = (msg) => {
        message.success(msg);
    };

    const onError = (msg) => {
        message.error(msg);
    };

    const onLogin = (values) => {
        dispatch({ type: 'login/login', payload: { values, onSuccess, onError } });
    };

    const onChange = (values) => {
        dispatch({ type: 'login/triggerCheckBox', checked: values });
    };

    const loginFormProps = {
        login,
        loading,
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

const mapStateToProps = state => ({
    login: state.login,
    loading: state.loading.models.login,
});

export default connect(mapStateToProps)(Login);
