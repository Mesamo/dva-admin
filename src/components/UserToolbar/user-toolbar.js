import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'

import UserModal from '../UserModal'

import styles from './user-toolbar.less'

const UserToolbar = ({
  mode,
  initUser,
  modalVisible,
  onShowAddModal,
  onHideModal,
  onCreate,
  onEdit,
  form,
  loading,
  messages
}) => {
  const handleShowAddModal = () => {
    onShowAddModal()
  }

  const modelProps = {
    mode,
    initUser,
    modalVisible,
    onCreate,
    onEdit,
    onHideModal,
    form,
    loading
  }

  return (
    <div>
      <Button
        className={styles.button}
        type="primary"
        icon="plus-circle-o"
        size="large"
        onClick={handleShowAddModal}
      >
        {messages.addButton}
      </Button>
      <UserModal {...modelProps} />
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
  mode: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onShowAddModal: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  messages: PropTypes.object
}

export default Form.create()(UserToolbar)
