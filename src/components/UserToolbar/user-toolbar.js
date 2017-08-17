import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

import UserForm from '../UserForm/user-form';
import translate from '../../i18n/translate';

import styles from './user-toolbar.less';

let formRef = null;

const UserToolbar = ({
  addModalVisible,
  onShowAddModal,
  onHideAddModal,
  onCreate,
  loading,
  messages
}) => {
  const handleShowAddModal = () => {
    onShowAddModal();
  };

  const handleHideAddModal = () => {
    onHideAddModal();
  };

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      onCreate(values);
    });
  };

  const saveFormRef = (form) => {
    formRef = form;
  };

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
        <UserForm ref={saveFormRef} />
      </Modal> : ''}
    </div>
  );
};

UserToolbar.defaultProps = {
  messages: {
    addButton: 'Add User',
    ok: 'OK',
    cancel: 'Cancel'
  }
};

UserToolbar.propTypes = {
  addModalVisible: PropTypes.bool.isRequired,
  onShowAddModal: PropTypes.func,
  onHideAddModal: PropTypes.func,
  messages: PropTypes.object
};

export default translate('User')(UserToolbar);
