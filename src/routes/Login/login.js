import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import LoginForm from '../../components/LoginForm/login-form';
import ChangeLanguage from '../../components/ChangeLanguage/change-language';
import notice from '../../utils/notice';
import styles from './login.less';

class Login extends React.Component {
    getChildContext() {
        const currentLanguage = this.props.currentLanguage;
        return {
            currentLanguage
        };
    }

    render() {
        const {
            login,
            currentLanguage,
            supportLanguages,
            loading,
            dispatch
        } = this.props;

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

        const onMenuClick = (language) => {
            dispatch({ type: 'app/changeLanguage', currentLanguage: language });
        };

        const changeLanguageProps = {
            currentLanguage,
            supportLanguages,
            onMenuClick
        };

        return (
            <Row type="flex" justify="center" align="middle" className={styles.normal}>
                <ChangeLanguage {...changeLanguageProps} />
                <Col xs={22} sm={12} md={8} lg={6} xl={4}>
                    <LoginForm {...loginFormProps} />
                </Col>
            </Row>
        );
    }
}

Login.childContextTypes = {
    currentLanguage: PropTypes.string
};

const mapStateToProps = state => ({
    login: state.login,
    currentLanguage: state.app.currentLanguage,
    supportLanguages: state.app.supportLanguages,
    loading: state.loading.models.login
});

export default connect(mapStateToProps)(Login);
