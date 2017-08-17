import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, message } from 'antd'

import UserTable from '../../../components/UserTable/user-table'
import UserToolbar from '../../../components/UserToolbar/user-toolbar'

import styles from './users.less'

class Users extends React.Component {
  getChildContext() {
    const { currentLanguage } = this.props
    return {
      currentLanguage
    }
  }

  render() {
    const {
      user,
      loading,
      onSelectedChange,
      onShowAddModal,
      onHideAddModal,
      onCreate,
      onDelete
    } = this.props

    const { users, selectedKeys, addModalVisible } = user

    const actionFunc = {
      delete: onDelete
    }

    const actionMenu = [{
      key: 'delete',
      name: 'delete'
    }]

    const userToolbarProps = {
      addModalVisible,
      onShowAddModal,
      onHideAddModal,
      onCreate,
      loading
    }

    const userTableProps = {
      actionMenu,
      actionFunc,
      data: users,
      selectedKeys,
      onSelectedChange,
      loading
    }

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
    )
  }
}

Users.childContextTypes = {
  currentLanguage: PropTypes.string
}

Users.propTypes = {
  user: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onShowAddModal: PropTypes.func.isRequired,
  onHideAddModal: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  currentLanguage: state.app.currentLanguage,
  loading: state.loading.models.user
})

const mapDispatchToProps = (dispatch) => {
  const onSuccess = msg => message.success(msg)
  const onError = msg => message.error(msg)
  return {
    onSelectedChange: (keys) => {
      dispatch({ type: 'user/onSelectedChange', selectedKeys: keys })
    },
    onShowAddModal: () => {
      dispatch({ type: 'user/showAddModal' })
    },
    onHideAddModal: () => {
      dispatch({ type: 'user/hideAddModal' })
    },
    onCreate: (values) => {
      dispatch({ type: 'user/addUser', payload: { user: values }, onSuccess, onError })
    },
    onDelete: (key) => {
      dispatch({ type: 'user/delUser', payload: { key }, onSuccess, onError })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
