import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import { Form, Input, Button } from 'antd';

import styles from './reset-form.less';

const FormItem = Form.Item;

const ResetForm = ({
    loading: buttonLoading,
    onSendEmail,
    emailText,
    emailButtonText,
    extraText,
    returnLogin,
    form: {
        getFieldsError,
        getFieldDecorator,
        validateFieldsAndScroll,
    },
}) => {
    const handleSendEmail = (e) => {
        e.stopPropagation();
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            onSendEmail(values.email);
        });
    };

    const hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    return (
        <Form className={styles.normal}>
            <QueueAnim>
                <FormItem>
                    <h6>
                        {extraText}
                    </h6>
                </FormItem>
                <FormItem hasFeedback key="a">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input the captcha you got!',
                            },
                            {
                                type: 'email',
                                message: 'please enter correct email address',
                            },
                        ],
                    })(<Input size="large" placeholder={emailText} />)}
                </FormItem>
                <FormItem key="b">
                    <Button
                        className={styles.button}
                        type="primary" htmlType="submit" size="large"
                        onClick={handleSendEmail} loading={buttonLoading}
                        disabled={hasErrors(getFieldsError())}
                    >
                        {emailButtonText}
                    </Button>
                    <Link to="/login">{returnLogin}</Link>
                </FormItem>
            </QueueAnim>
        </Form>
    );
};

ResetForm.defaultProps = {
    emailText: 'email',
    emailButtonText: 'Send Email',
    returnLogin: 'to Login',
    extraText: 'Send you a link to reset you password',
};

ResetForm.propTypes = {
    onSendEmail: PropTypes.func.isRequired,
};

export default Form.create()(ResetForm);
