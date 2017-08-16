import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';

import DataTable from '../../../components/DataTable/data-table';

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

    const { users, selectedKeys } = user;

    const onSelectedChange = (keys) => {
      dispatch({ type: 'user/onSelectedChange', selectedKeys: keys });
    };

    const actionFunc = {
      delete: (key) => {
        dispatch({
          type: 'user/delUser',
          payload: {
            key,
            onSuccess: msg => message.success(msg),
            onError: msg => message.error(msg)
          }
        });
      }
    };

    const actionMenu = [{
      key: 'delete',
      name: 'delete'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }];

    const props = {
      columns,
      actionMenu,
      actionFunc,
      data: users,
      selectedKeys,
      onSelectedChange,
      loading
    };
    return (
      <DataTable {...props} />
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
