import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import ResetForm from '../../components/ResetForm/reset-form';
import CONSTANTS from '../../utils/constants';
import styles from './reset.less';

const Reset = ({
    reset,
    loading,
    dispatch,
}) => {
    const onSendEmail = (email) => {
        dispatch({
            type: 'reset/sendEmil',
            payload: {
                email,
                onSuccess: msg => message.success(msg, CONSTANTS.NORMAL_MSG_DURATION),
                onError: msg => message.error(msg, CONSTANTS.ERROR_MSG_DURATION),
            },
        });
    };

    const resetFormProps = {
        reset,
        loading,
        onSendEmail,
        emailText: '邮箱',
        emailButtonText: '发送邮件',
        returnLogin: '返回登录页',
        extraText: '发送一个链接重置你的密码',
    };

    return (
        <div className={styles.normal}>
            <ResetForm {...resetFormProps} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        reset: state.reset,
        loading: state.loading.models.reset,
    };
};

export default connect(mapStateToProps)(Reset);
