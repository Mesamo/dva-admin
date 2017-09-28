import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import { Form, Input, Button, Alert } from 'antd'

import styles from './reset-form.less'

const FormItem = Form.Item

const ResetForm = ({
  loading: buttonLoading,
  messages,
  onSendEmail,
  form: {
    getFieldsError,
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  const {
    emailText,
    emailButtonText,
    extraText,
    returnLogin,
    requiredEmail,
    correctEmail
  } = messages

  const handleSendEmail = (e) => {
    e.stopPropagation()
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      onSendEmail(values.email)
    })
  }

  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  return (
    <Form className={styles.normal}>
      <QueueAnim>
        <FormItem key="1">
          <Alert description={extraText} type="info" className={styles.text} />
        </FormItem>
        <FormItem hasFeedback key="2">
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
          })(<Input size="large" placeholder={emailText} />)}
        </FormItem>
        <FormItem key="3">
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            size="large"
            loading={buttonLoading}
            disabled={hasErrors(getFieldsError())}
            onClick={handleSendEmail}
          >
            {emailButtonText}
          </Button>
          <Link to="/login" className={styles.text}>{returnLogin}</Link>
        </FormItem>
      </QueueAnim>
    </Form>
  )
}

ResetForm.defaultProps = {
  loading: false,
  messages: {
    emailText: 'email',
    emailButtonText: 'Send Email',
    returnLogin: 'to Login',
    extraText: 'Send you a link to reset you password',
    requiredEmail: 'Please enter email',
    correctEmail: 'Please enter correct email address'
  }
}

ResetForm.propTypes = {
  loading: PropTypes.bool,
  messages: PropTypes.object,
  onSendEmail: PropTypes.func.isRequired
}

export default Form.create()(ResetForm)
