import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import ResetForm from '../../components/ResetForm/reset-form';
import notice from '../../utils/notice';
import styles from './reset.less';

const Reset = ({
    reset,
    message,
    loading,
    dispatch
}) => {
    const onSendEmail = (email) => {
        dispatch({
            type: 'reset/sendEmil',
            payload: {
                email,
                onSuccess: msg => notice.success(msg),
                onError: (code, msg) => notice.error(code, msg)
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
    }

    return (
        <Row type="flex" justify="center" align="middle" className={styles.normal}>
            <Col xs={22} sm={12} md={8} lg={6} xl={4}>
                <ResetForm {...resetFormProps} />
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        reset: state.reset,
        message: state.app.message,
        loading: state.loading.models.reset
    };
};

export default connect(mapStateToProps)(Reset);
