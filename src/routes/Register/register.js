import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import RegisterForm from '../../components/RegisterForm/registerForm';
import CONSTANTS from '../../utils/constants';
import styles from './register.less';

const Register = ({
    register,
    dispatch,
}) => {
    const onRegister = (email, password) => dispatch({
        type: 'register/register',
        payload: {
            email,
            password,
            onSuccess: msg => message.success(msg, CONSTANTS.NORMAL_MSG_DURATION),
            onError: msg => message.error(msg, CONSTANTS.ERROR_MSG_DURATION),
        },
    });

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
        loading: state.loading.models.register,
    };
};

export default connect(mapStateToProps)(Register);
