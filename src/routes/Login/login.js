import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import LoginForm from '../../components/LoginForm/login-form';
import notice from '../../utils/notice';
import styles from './login.less';

const Login = ({
    login,
    message,
    loading,
    dispatch
}) => {
    const onLogin = (email, password) => dispatch({
        type: 'login/login',
        payload: {
            email,
            password,
            onSuccess: msg => notice.success(msg),
            onError: (code, msg) => notice.error(code, msg)
        }
    });

    const onChange = (values) => {
        dispatch({ type: 'login/triggerCheckBox', payload: { rememberMe: values } });
    };

    const loginFormProps = {
        login,
        loading,
        onLogin,
        onChange
    };

    if (message) {
        loginFormProps.emailText = message.email;
        loginFormProps.passwordText = message.password;
        loginFormProps.rememberMeText = message.rememberEmail;
        loginFormProps.forgetPasswdText = message.forgetPassword;
        loginFormProps.loginButtonText = message.login;
        loginFormProps.registerText = message.registerNow;
    }

    return (
        <Row type="flex" justify="center" align="middle" className={styles.normal}>
            <Col xs={22} sm={12} md={8} lg={6} xl={4}>
                <LoginForm {...loginFormProps} />
            </Col>
        </Row>
    );
};

const mapStateToProps = state => ({
    login: state.login,
    message: state.app.message,
    loading: state.loading.models.login
});

export default connect(mapStateToProps)(Login);
