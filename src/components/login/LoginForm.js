import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './LoginForm.css';

const FormItem = Form.Item;

const LoginForm = ({
  login,
  usernameText,
  passwordText,
  rememberMeText,
  forgetPasswdText,
  loginButtonText,
  registerText,
  onLogin,
  onChange,
  form: {
    getFieldsError,
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginButtonLoading, rememberMe } = login;

  const handleChange = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const handleLogin = (e) => {
    e.stopPropagation();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      if (onLogin) {
        onLogin(values);
      }
    });
  };

  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  return (
    <Form className={styles.normal}>
      <div className={styles.dva} />
      <FormItem hasFeedback>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'please enter username',
            },
          ],
        })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={usernameText} />)}
      </FormItem>
      <FormItem hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'please enter password',
            },
          ],
        })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={passwordText} />)}
      </FormItem>
      <FormItem>
        <Checkbox onChange={handleChange} checked={rememberMe}>{rememberMeText}</Checkbox>
        <a className={styles.forgot}>{forgetPasswdText}</a>
        <Button
          type="primary" size="large" htmlType="submit" className={styles.button}
          onClick={handleLogin} loading={loginButtonLoading}
          disabled={hasErrors(getFieldsError())}
        >
          {loginButtonText}
        </Button>
        <a>{registerText}</a>
      </FormItem>
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
