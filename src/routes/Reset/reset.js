import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import ResetForm from '../../components/ResetForm/reset-form';
import { noticeSuccess, noticeError } from '../../utils/notice';
import styles from './reset.less';

class Reset extends React.Component {

    getChildContext() {
        const currentLanguage = this.props.currentLanguage;
        return {
            currentLanguage
        };
    }

    render() {
        const {
            reset,
            message,
            loading,
            dispatch
        } = this.props;

        const onSendEmail = (email) => {
            dispatch({
                type: 'reset/sendEmil',
                payload: {
                    email,
                    onSuccess: msg => noticeSuccess(msg),
                    onError: (code, msg) => noticeError(code, msg)
                }
            });
        };

        const resetFormProps = {
            reset,
            loading,
            onSendEmail
        };

        if (message) {
            resetFormProps.emailText = message.email;
            resetFormProps.emailButtonText = message.sendEmail;
            resetFormProps.returnLogin = message.returnLogin;
            resetFormProps.extraText = message.extraText;
            resetFormProps.requiredEmail = message.requiredEmail;
            resetFormProps.correctEmail = message.correctEmail;
        }

        return (
            <Row type="flex" justify="center" align="middle" className={styles.normal}>
                <Col xs={22} sm={12} md={8} lg={6} xl={4}>
                    <ResetForm {...resetFormProps} />
                </Col>
            </Row>
        );
    }
}

Reset.childContextTypes = {
    currentLanguage: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        reset: state.reset,
        currentLanguage: state.app.currentLanguage,
        loading: state.loading.models.reset
    };
};

export default connect(mapStateToProps)(Reset);
