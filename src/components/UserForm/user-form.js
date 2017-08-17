import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';

import translate from '../../i18n/translate';

const FormItem = Form.Item;

const UserForm = ({
  layout,
  messages,
  form: {
    getFieldDecorator
  }
}) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 }
    }
  };

  return (
    <Form layout={layout}>
      <FormItem hasFeedback label={messages.name} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem hasFeedback label={messages.gender} {...formItemLayout}>
        {getFieldDecorator('gender', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            }
          ]
        })(
          <Radio.Group>
            <Radio.Button value="male">{messages.male}</Radio.Button>
            <Radio.Button value="female">{messages.female}</Radio.Button>
            <Radio.Button value="unknow">{messages.unknow}</Radio.Button>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem hasFeedback label={messages.age} {...formItemLayout}>
        {getFieldDecorator('age', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            },
            {
              pattern: '^\\d{1,3}$',
              message: messages.correctAge
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem hasFeedback label={messages.email} {...formItemLayout}>
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            },
            {
              type: 'email',
              message: messages.correctEmail
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem hasFeedback label={messages.phone} {...formItemLayout}>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            },
            {
              pattern: '^\\d{6,}$',
              message: messages.correctPhone
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem hasFeedback label={messages.address} {...formItemLayout}>
        {getFieldDecorator('address', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            }
          ]
        })(<Input />)}
      </FormItem>
    </Form>
  );
};

UserForm.defaultProps = {
  layout: 'horizontal',
  messages: {
    name: 'Name',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    unknow: 'Unknow',
    age: 'Age',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    action: 'Action',
    delete: 'Delete',
    correctEmail: 'Please enter correct email address',
    correctAge: 'Please enter correct age',
    correctPhone: 'Please enter correct phone number'
  }
};

UserForm.propTypes = {
  layout: PropTypes.string,
  messages: PropTypes.object
};

export default Form.create()(translate('User')(UserForm));
