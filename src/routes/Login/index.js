import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import { LoginForm } from '../../components';
import styles from './index.less';

const Login = ({
    login,
    loading,
    dispatch,
}) => {
    const messageDuration = 5;

    const onSuccess = (msg) => {
        message.success(msg, messageDuration);
    };

    const onError = (msg) => {
        message.error(msg, messageDuration);
    };

    const onLogin = (email, password) => {
        dispatch({ type: 'login/login', payload: { email, password, onSuccess, onError } });
    };

    const onChange = (values) => {
        dispatch({ type: 'login/triggerCheckBox', checked: values });
    };

    const loginFormProps = {
        login,
        loading,
        onLogin,
        onChange,
        emailText: '邮箱',
        passwordText: '密码',
        rememberMeText: '记住邮箱',
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
