import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './login-form.less';

const FormItem = Form.Item;

const LoginForm = ({
    login,
    loading: loginButtonLoading,
    onLogin,
    onChange,
    emailText,
    passwordText,
    rememberMeText,
    forgetPasswdText,
    loginButtonText,
    registerText,
    form: {
        getFieldsError,
        getFieldDecorator,
        validateFieldsAndScroll
    }
}) => {
    const { rememberMe, email } = login;

    const handleChange = (e) => {
        e.stopPropagation();
        onChange(e.target.checked);
    };

    const handleLogin = (e) => {
        e.stopPropagation();
        validateFieldsAndScroll((errors, values) => {
            if (errors) return;
            onLogin(values.email, values.password);
        });
    };

    const hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    return (
        <Form className={styles.normal}>
            <QueueAnim>
                <div className={styles.dva} key="1" />
                <FormItem hasFeedback key="2" >
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'please enter email'
                            },
                            {
                                type: 'email',
                                message: 'please enter correct email address'
                            }
                        ],
                        initialValue: email
                    })(<Input
                        prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={emailText}
                        ref={input => input && input.focus()}
                    />)}
                </FormItem>
                <FormItem hasFeedback key="3" >
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'please enter password'
                            }
                        ]
                    })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={passwordText} />)}
                </FormItem>
                <FormItem key="4">
                    <Checkbox onChange={handleChange} checked={rememberMe}>
                        {rememberMeText}
                    </Checkbox>
                    <Link className={styles.forgot} to="/reset">{forgetPasswdText}</Link>
                    <Button
                        type="primary" size="large" htmlType="submit" className={styles.button}
                        onClick={handleLogin} loading={loginButtonLoading}
                        disabled={hasErrors(getFieldsError())}
                    >
                        {loginButtonText}
                    </Button>
                    <Link to="/register">{registerText}</Link>
                </FormItem>
                <p key="5">
                    <span>{emailText}: dva-admin@test.com</span>
                    <span>{passwordText}: 123456</span>
                </p>
            </QueueAnim>
        </Form>
    );
};

LoginForm.defaultProps = {
    emailText: 'Email',
    passwordText: 'Password',
    rememberMeText: 'Remember me',
    forgetPasswdText: 'Forget Password',
    loginButtonText: 'Login',
    registerText: 'Register Now !'
};

LoginForm.propTypes = {
    emailText: PropTypes.string,
    passwordText: PropTypes.string,
    rememberMeText: PropTypes.string,
    forgetPasswdText: PropTypes.string,
    loginButtonText: PropTypes.string,
    registerText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default Form.create()(LoginForm);
