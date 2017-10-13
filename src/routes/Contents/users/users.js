import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, message } from 'antd'

import UserTable from '../../../components/UserTable'
import UserToolbar from '../../../components/UserToolbar'
import styles from './users.less'

class Users extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get userToolbarProps() {
    return {
      mode: this.props.user.mode,
      initUser: this.props.user.selectedUser,
      modalVisible: this.props.user.modalVisible,
      loading: this.props.loading,
      onShowAddModal: this.props.onShowAddModal,
      onHideModal: this.props.onHideModal,
      onCreate: this.props.onCreate,
      onEdit: this.props.onEdit
    }
  }

  get userTableProps() {
    const actionFunc = {
      delete: this.props.onDelete,
      edit: this.props.onShowEditModal
    }

    const actionMenu = [
      {
        key: 'delete',
        name: 'delete'
      },
      {
        key: 'edit',
        name: 'edit'
      }
    ]

    return {
      actionFunc,
      actionMenu,
      data: this.props.user.users,
      selectedKeys: this.props.user.selectedKeys,
      loading: this.props.loading,
      onSelectedChange: this.props.onSelectedChange
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <Row>
          <Col span={24}>
            <UserToolbar {...this.userToolbarProps} />
          </Col>
        </Row>
        <Row className={styles.table} >
          <Col span={24}>
            <UserTable {...this.userTableProps} />
          </Col>
        </Row>
      </div>
    )
  }
}

Users.childContextTypes = {
  currentLanguage: PropTypes.string
}

Users.propTypes = {
  user: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
  onShowAddModal: PropTypes.func.isRequired,
  onShowEditModal: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  currentLanguage: state.app.currentLanguage,
  loading: state.loading.models.user
})

const mapDispatchToProps = dispatch => ({
  onSelectedChange: keys => dispatch({ type: 'user/onSelectedChange', selectedKeys: keys }),
  onShowAddModal: () => dispatch({ type: 'user/showAddModal' }),
  onShowEditModal: (key) => {
    dispatch({ type: 'user/getSelectedUser', payload: { key } })
    dispatch({ type: 'user/showEditModal' })
  },
  onHideModal: () => dispatch({ type: 'user/hideModal' }),
  onCreate: value => dispatch({
    type: 'user/addUser',
    payload: { user: value },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  }),
  onDelete: key => dispatch({
    type: 'user/delUser',
    payload: { key },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  }),
  onEdit: value => dispatch({
    type: 'user/editUser',
    payload: { user: value },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
