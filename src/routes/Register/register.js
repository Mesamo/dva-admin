import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import RegisterForm from '../../components/RegisterForm/register-form';
import notice from '../../utils/notice';
import styles from './register.less';

class Register extends React.Component {
    render() {
        const {
            register,
            message,
            dispatch
        } = this.props;

        const onRegister = (email, password) => dispatch({
            type: 'register/register',
            payload: {
                email,
                password,
                onSuccess: msg => notice.success(msg),
                onError: (code, msg) => notice.error(code, msg)
            }
        });

        const registerFormProps = {
            register,
            onRegister
        };

        if (message) {
            registerFormProps.emailText = message.email;
            registerFormProps.passwordText = message.password;
            registerFormProps.confirmText = message.confirm;
            registerFormProps.registerText = message.register;
            registerFormProps.returnLogin = message.returnLogin;
            registerFormProps.requiredEmail = message.requiredEmail;
            registerFormProps.correctEmail = message.correctEmail;
            registerFormProps.requiredPassword = message.requiredPassword;
            registerFormProps.passwordNotSame = message.passwordNotSame;
        }

        return (
            <Row type="flex" justify="center" align="middle" className={styles.normal}>
                <Col xs={22} sm={18} md={12} lg={10} xl={7}>
                    <RegisterForm {...registerFormProps} />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        register: state.register,
        message: state.app.message,
        loading: state.loading.models.register
    };
};

export default connect(mapStateToProps)(Register);
