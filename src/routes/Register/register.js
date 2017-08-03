import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import RegisterForm from '../../components/RegisterForm/register-form';
import notice from '../../utils/notice';
import styles from './register.less';

class Register extends React.Component {
    getChildContext() {
        const currentLanguage = this.props.currentLanguage;
        return {
            currentLanguage
        };
    }

    render() {
        const {
            register,
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

        return (
            <Row type="flex" justify="center" align="middle" className={styles.normal}>
                <Col xs={22} sm={18} md={12} lg={10} xl={7}>
                    <RegisterForm {...registerFormProps} />
                </Col>
            </Row>
        );
    }
}

Register.childContextTypes = {
    currentLanguage: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        register: state.register,
        currentLanguage: state.app.currentLanguage,
        loading: state.loading.models.register
    };
};

export default connect(mapStateToProps)(Register);
