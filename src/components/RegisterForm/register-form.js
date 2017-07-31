import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import { Form, Input, Button } from 'antd';

import styles from './register-form.less';

const FormItem = Form.Item;

const RegisterForm = ({
    loading: loginButtonLoading,
    emailText,
    passwordText,
    confirmText,
    registerText,
    returnLogin,
    onRegister,
    requiredEmail,
    correctEmail,
    requiredPassword,
    passwordNotSame,
    form: {
        getFieldsError,
        getFieldDecorator,
        validateFieldsAndScroll,
        validateFields,
        getFieldValue,
        isFieldTouched
    }
}) => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 }
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 8,
                offset: 4
            }
        }
    };

    // 输入密码时，检查是否与确认密码一致
    const checkConfirm = (rule, value, callback) => {
        if (value && isFieldTouched('confirm')) {
            validateFields(['confirm'], { force: true });
        }
        callback();
    };

    // 输入确认密码时，检查是否与密码一致
    const checkPassword = (rule, value, callback) => {
        if (value && value !== getFieldValue('password')) {
            callback(passwordNotSame);
        } else {
            callback();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateFieldsAndScroll((errors, values) => {
            if (errors) return;
            onRegister(values.email, values.password);
        });
    };

    const hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    return (
        <Form className={styles.normal} label="用户注册">
            <QueueAnim>
                <FormItem {...formItemLayout} hasFeedback label={emailText} key="1">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: requiredEmail
                            },
                            {
                                type: 'email',
                                message: correctEmail
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label={passwordText} key="2">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: requiredPassword
                            },
                            {
                                validator: checkConfirm
                            }
                        ]
                    })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label={confirmText} key="3">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: requiredPassword
                            },
                            {
                                validator: checkPassword
                            }
                        ]
                    })(<Input type="password" />)}
                </FormItem>
                <FormItem {...tailFormItemLayout} key="4">
                    <Button
                        className={styles.button}
                        type="primary" htmlType="submit" size="large"
                        onClick={handleSubmit} loading={loginButtonLoading}
                        disabled={hasErrors(getFieldsError())}
                    >
                        {registerText}
                    </Button>
                    <Link to="/login" className={styles.text}>{returnLogin}</Link>
                </FormItem>
            </QueueAnim>
        </Form>
    );
};

RegisterForm.defaultProps = {
    emailText: 'email',
    passwordText: 'password',
    confirmText: 'confirm',
    registerText: 'register',
    returnLogin: 'to Login',
    requiredEmail: 'Please enter email',
    correctEmail: 'Please enter correct email address',
    requiredPassword: 'Please enter password',
    passwordNotSame: 'Two passwords that you enter is inconsistent!'
};

RegisterForm.propTypes = {
    emailText: PropTypes.string,
    passwordText: PropTypes.string,
    confirmText: PropTypes.string,
    registerText: PropTypes.string,
    onRegister: PropTypes.func.isRequired
};

export default Form.create()(RegisterForm);
