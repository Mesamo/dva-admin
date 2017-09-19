import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import styles from './login-form.less'

const FormItem = Form.Item;

const LoginForm = ({
  login,
  loading: loginButtonLoading,
  onLogin,
  onChange,
  messages,
  form: {
    getFieldsError,
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  const {
    emailText,
    passwordText,
    rememberMeText,
    forgetPasswdText,
    loginButtonText,
    registerText,
    requiredEmail,
    correctEmail,
    requiredPassword
  } = messages;

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
                message: requiredEmail
              },
              {
                type: 'email',
                message: correctEmail
              }
            ],
            initialValue: email
          })(<Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={emailText}
          />)}
        </FormItem>
        <FormItem hasFeedback key="3" >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: requiredPassword
              }
            ]
          })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={passwordText} />)}
        </FormItem>
        <FormItem key="4">
          <Checkbox onChange={handleChange} checked={rememberMe} className={styles.text}>
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
          <Link to="/register" className={styles.text}>{registerText}</Link>
        </FormItem>
      </QueueAnim>
    </Form>
  );
};

LoginForm.defaultProps = {
  messages: {
    emailText: 'Email',
    passwordText: 'Password',
    rememberMeText: 'Remember me',
    forgetPasswdText: 'Forget Password',
    loginButtonText: 'Login',
    registerText: 'Register Now !',
    requiredEmail: 'Please enter email',
    correctEmail: 'Please enter correct email address',
    requiredPassword: 'Please enter password'
  }
};

LoginForm.propTypes = {
  messages: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default Form.create()(LoginForm);
