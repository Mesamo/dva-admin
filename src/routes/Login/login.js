import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import LoginForm from '../../components/LoginForm/login-form';
import CONSTANTS from '../../utils/constants';
import styles from './login.less';

const Login = ({
    login,
    loading,
    dispatch,
}) => {
    const onLogin = (email, password) => dispatch({
        type: 'login/login',
        payload: {
            email,
            password,
            onSuccess: msg => message.success(msg, CONSTANTS.NORMAL_MSG_DURATION),
            onError: msg => message.error(msg, CONSTANTS.ERROR_MSG_DURATION),
        },
    });

    const onChange = (values) => {
        dispatch({ type: 'login/triggerCheckBox', payload: { rememberMe: values } });
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
