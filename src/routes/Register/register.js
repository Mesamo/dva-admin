import React from 'react';
import { connect } from 'dva';
import { message, Row, Col } from 'antd';

import RegisterForm from '../../components/RegisterForm/register-form';
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
        <Row type="flex" justify="center" align="middle" className={styles.normal}>
            <Col xs={22} sm={18} md={12} lg={10} xl={7}>
                <RegisterForm {...registerFormProps} />
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        register: state.register,
        loading: state.loading.models.register,
    };
};

export default connect(mapStateToProps)(Register);
