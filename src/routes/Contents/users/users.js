import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, message } from 'antd';

import UserTable from '../../../components/UserTable/user-table';
import UserToolbar from '../../../components/UserToolbar/user-toolbar';

import styles from './users.less';

class Users extends React.Component {
  getChildContext() {
    const { currentLanguage } = this.props;
    return {
      currentLanguage
    };
  }

  render() {
    const {
      user,
      loading,
      dispatch
    } = this.props;

    const { users, selectedKeys, addModalVisible } = user;

    const onSelectedChange = (keys) => {
      dispatch({ type: 'user/onSelectedChange', selectedKeys: keys });
    };

    const onShowAddModal = () => dispatch({ type: 'user/showAddModal' });
    const onHideAddModal = () => dispatch({ type: 'user/hideAddModal' });

    const onCreate = values => dispatch({
      type: 'user/addUser',
      payload: { user: values },
      onSuccess: msg => message.success(msg),
      onError: msg => message.error(msg)
    });

    const actionFunc = {
      delete: (key) => {
        dispatch({
          type: 'user/delUser',
          payload: { key },
          onSuccess: msg => message.success(msg),
          onError: msg => message.error(msg)
        });
      }
    };

    const actionMenu = [{
      key: 'delete',
      name: 'delete'
    }];

    const userToolbarProps = {
      addModalVisible,
      onShowAddModal,
      onHideAddModal,
      onCreate,
      loading
    };

    const userTableProps = {
      actionMenu,
      actionFunc,
      data: users,
      selectedKeys,
      onSelectedChange,
      loading
    };

    return (
      <div className={styles.normal}>
        <Row>
          <Col span={24}>
            <UserToolbar {...userToolbarProps} />
          </Col>
        </Row>
        <Row className={styles.table} >
          <Col span={24}>
            <UserTable {...userTableProps} />
          </Col>
        </Row>
      </div>
    );
  }
}

Users.childContextTypes = {
  currentLanguage: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.user,
  currentLanguage: state.app.currentLanguage,
  loading: state.loading.models.user
});

export default connect(mapStateToProps)(Users);
