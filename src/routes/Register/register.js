import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import RegisterForm from '../../components/RegisterForm/register-form';
import notice from '../../utils/notice';
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
            onSuccess: msg => notice.success(msg),
            onError: (code, msg) => notice.error(code, msg),
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
