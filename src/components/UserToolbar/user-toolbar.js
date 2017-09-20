import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Modal } from 'antd'

import UserForm from '../UserForm'

import styles from './user-toolbar.less'

const UserToolbar = ({
  addModalVisible,
  onShowAddModal,
  onHideAddModal,
  onCreate,
  form,
  loading,
  messages
}) => {
  const handleShowAddModal = () => {
    onShowAddModal()
  }

  const handleHideAddModal = () => {
    onHideAddModal()
  }

  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        onCreate(values)
      }
    })
  }

  return (
    <div>
      <Button
        className={styles.button}
        type="primary" icon="plus-circle-o" size="large" onClick={handleShowAddModal}
      >
        {messages.addButton}
      </Button>
      {addModalVisible ? <Modal
        title={messages.addButton}
        visible
        onOk={handleCreate}
        confirmLoading={loading}
        onCancel={handleHideAddModal}
        okText={messages.ok}
        cancelText={messages.cancel}
      >
        <UserForm form={form} />
      </Modal> : ''}
    </div>
  )
}

UserToolbar.defaultProps = {
  messages: {
    addButton: 'Add User',
    ok: 'OK',
    cancel: 'Cancel'
  }
}

UserToolbar.propTypes = {
  addModalVisible: PropTypes.bool.isRequired,
  onShowAddModal: PropTypes.func,
  onHideAddModal: PropTypes.func,
  messages: PropTypes.object
}

export default Form.create()(UserToolbar)
