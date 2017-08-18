import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, message } from 'antd'

import UserTable from '../../../components/UserTable/user-table'
import UserToolbar from '../../../components/UserToolbar/user-toolbar'
import styles from './users.less'

class Users extends React.Component {

  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get userToolbarProps() {
    return {
      addModalVisible: this.props.user.addModalVisible,
      loading: this.props.loading,
      onShowAddModal: this.props.onShowAddModal,
      onHideAddModal: this.props.onHideAddModal,
      onCreate: this.props.onCreate
    }
  }

  get userTableProps() {
    const actionFunc = {
      delete: this.props.onDelete
    }

    const actionMenu = [{
      key: 'delete',
      name: 'delete'
    }]

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
    onSelectedChange: keys => dispatch({ type: 'user/onSelectedChange', selectedKeys: keys }),
    onShowAddModal: () => dispatch({ type: 'user/showAddModal' }),
    onHideAddModal: () => dispatch({ type: 'user/hideAddModal' }),
    onCreate: values => dispatch({ type: 'user/addUser', payload: { user: values }, onSuccess, onError }),
    onDelete: key => dispatch({ type: 'user/delUser', payload: { key }, onSuccess, onError })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
