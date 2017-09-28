import React from 'react'
import PropTypes from 'prop-types'
import { Table, Menu, Icon, Dropdown } from 'antd'

const UserTable = ({
  actionFunc,
  actionMenu,
  data,
  selectedKeys,
  onSelectedChange,
  loading,
  messages
}) => {
  const onClick = ({ item, key }) => actionFunc[key](item.props.recordKey)

  const getMenus = record => (
    <Menu onClick={onClick}>
      {actionMenu.map(menu => (
        <Menu.Item key={menu.key} recordKey={record.key}>
          <span>{messages[menu.name] || menu.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

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
    key: 'age',
    sorter: (a, b) => a.age - b.age
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
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Dropdown overlay={getMenus(record)} >
        <a className="ant-dropdown-link">
          <Icon type="down" style={{ fontSize: 16 }} />
        </a>
      </Dropdown>
    )
  }]

  columns.map((col) => {
    const n = col
    if (messages[col.key]) {
      n.title = messages[col.key]
    }
    return n
  })

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectedChange(selectedRowKeys, selectedRows)
    }
  }

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
    />
  )
}

UserTable.defaultProps = {
  loading: true,
  messages: {
    delete: 'Delete',
    addButton: 'Add User',
    delButton: 'Delete User'
  }
}

UserTable.propTypes = {
  actionFunc: PropTypes.object.isRequired,
  actionMenu: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selectedKeys: PropTypes.array.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  messages: PropTypes.object
}

export default UserTable
