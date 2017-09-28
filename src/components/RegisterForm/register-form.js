import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import { Form, Input, Button } from 'antd'

import styles from './register-form.less'

const FormItem = Form.Item

const RegisterForm = ({
  loading: loginButtonLoading,
  messages,
  onRegister,
  form: {
    getFieldsError,
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
    getFieldValue,
    isFieldTouched
  }
}) => {
  const {
    emailText,
    passwordText,
    confirmText,
    registerText,
    returnLogin,
    requiredEmail,
    correctEmail,
    requiredPassword,
    passwordNotSame
  } = messages

  // 输入密码时，检查是否与确认密码一致
  const checkConfirm = (rule, value, callback) => {
    if (value && isFieldTouched('confirm')) {
      validateFields(['confirm'], { force: true })
    }
    callback()
  }

  // 输入确认密码时，检查是否与密码一致
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback(passwordNotSame)
    } else {
      callback()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      onRegister(values.email, values.password)
    })
  }

  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  return (
    <Form className={styles.normal} label="用户注册" layout="horizontal">
      <QueueAnim>
        <FormItem hasFeedback label={emailText} key="1">
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
        <FormItem hasFeedback label={passwordText} key="2">
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
        <FormItem hasFeedback label={confirmText} key="3">
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
        <FormItem key="4">
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            size="large"
            loading={loginButtonLoading}
            disabled={hasErrors(getFieldsError())}
            onClick={handleSubmit}
          >
            {registerText}
          </Button>
          <Link to="/login" className={styles.text}>{returnLogin}</Link>
        </FormItem>
      </QueueAnim>
    </Form>
  )
}

RegisterForm.defaultProps = {
  loading: false,
  messages: {
    emailText: 'email',
    passwordText: 'password',
    confirmText: 'confirm',
    registerText: 'register',
    returnLogin: 'to Login',
    requiredEmail: 'Please enter email',
    correctEmail: 'Please enter correct email address',
    requiredPassword: 'Please enter password',
    passwordNotSame: 'Two passwords that you enter is inconsistent!'
  }
}

RegisterForm.propTypes = {
  loading: PropTypes.bool,
  messages: PropTypes.object,
  onRegister: PropTypes.func.isRequired
}

export default Form.create()(RegisterForm)
