import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

const LoginForm = ({
    login,
    loading: loginButtonLoading,
    onLogin,
    onChange,
    usernameText,
    passwordText,
    rememberMeText,
    forgetPasswdText,
    loginButtonText,
    registerText,
    form: {
        getFieldsError,
        getFieldDecorator,
        validateFieldsAndScroll,
    },
}) => {
    const { rememberMe, username, password } = login;

    const handleChange = (e) => {
        e.stopPropagation();
        onChange(e.target.checked);
    };

    const handleLogin = (e) => {
        e.stopPropagation();
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            onLogin(values);
        });
    };

    const hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    return (
        <Form className={styles.normal}>
            <div className={styles.dva} />
            <FormItem hasFeedback >
                {getFieldDecorator('username', {
                    rules: [
                        {
                            required: true,
                            message: 'please enter username',
                        },
                        {
                            whitespace: true,
                            message: 'please enter username without whitespace',
                        },
                    ],
                    initialValue: username,
                })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={usernameText} />)}
            </FormItem>
            <FormItem hasFeedback >
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: 'please enter password',
                        },
                    ],
                    initialValue: password,
                })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={passwordText} />)}
            </FormItem>
            <FormItem>
                <Checkbox onChange={handleChange} checked={rememberMe}>{rememberMeText}</Checkbox>
                <Link className={styles.forgot} to="/error">{forgetPasswdText}</Link>
                <Button
                    type="primary" size="large" htmlType="submit" className={styles.button}
                    onClick={handleLogin} loading={loginButtonLoading}
                    disabled={hasErrors(getFieldsError())}
                >
                    {loginButtonText}
                </Button>
                <Link to="/error">{registerText}</Link>
            </FormItem>
            <p>
                <span>{usernameText}: test</span>
                <span>{passwordText}: test</span>
            </p>
        </Form>
    );
};

LoginForm.defaultProps = {
    usernameText: 'Username',
    passwordText: 'Password',
    rememberMeText: 'Remember me',
    forgetPasswdText: 'Forget Password',
    loginButtonText: 'Login',
    registerText: 'Register Now !',
};

LoginForm.propTypes = {
    usernameText: PropTypes.string,
    passwordText: PropTypes.string,
    rememberMeText: PropTypes.string,
    forgetPasswdText: PropTypes.string,
    loginButtonText: PropTypes.string,
    registerText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
};

export default Form.create()(LoginForm);
