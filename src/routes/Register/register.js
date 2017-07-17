import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import { RegisterForm } from '../../components';
import CONSTANTS from '../../utils/constants';
import styles from './register.less';

const Register = ({
    register,
    dispatch,
}) => {
    const {
        NORMAL_MSG_DURATION,
        ERROR_MSG_DURATION,
    } = CONSTANTS;

    const onSuccess = (msg) => {
        message.success(msg, NORMAL_MSG_DURATION);
    };

    const onError = (msg) => {
        message.error(msg, ERROR_MSG_DURATION);
    };

    const onRegister = (email, password) => {
        dispatch({ type: 'register/register', payload: { email, password, onSuccess, onError } });
    };

    const registerFormProps = {
        register,
        emailText: '邮箱',
        passwordText: '密码',
        confirmText: '确认密码',
        registerText: '注册',
        returnLogin: '返回登录页',
        onRegister,
    };
    return (
        <div className={styles.normal}>
            <RegisterForm {...registerFormProps} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        register: state.register,
        loading: state.loading.models.login,
    };
};

export default connect(mapStateToProps)(Register);
