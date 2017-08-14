import React from 'react';
import PropTypes from 'prop-types';
import { Table, Menu, Icon, Dropdown } from 'antd';

import translate from '../../i18n/translate';
import styles from './data-table.less';

const DataTable = ({
    columns,
    actionFunc,
    actionMenu,
    data,
    selectedKeys,
    onSelectedChange,
    loading,
    messages
 }) => {
    const onClick = ({ item, key }) => actionFunc[key](item.props.recordKey);

    const getMenus = record => (
        <Menu onClick={onClick}>
            {actionMenu.map(menu => (
                <Menu.Item key={menu.key} recordKey={record.key}>
                    <span>{messages[menu.name] || menu.name}</span>
                </Menu.Item>
            ))}
        </Menu>
    );

    columns.push({
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Dropdown overlay={getMenus(record)} >
                <a className="ant-dropdown-link">
                    <Icon type="down" />
                </a>
            </Dropdown>
        )
    });

    columns.map((col) => {
        const n = col;
        if (messages[col.key]) {
            n.title = messages[col.key];
        }
        return n;
    });

    const rowSelection = {
        selectedRowKeys: selectedKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            onSelectedChange(selectedRowKeys, selectedRows);
        }
    };

    return (
        <Table
            className={styles.normal}
            loading={loading}
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
        />
    );
};

DataTable.defaultProps = {
    messages: {
        delete: 'Delete'
    }
};

DataTable.propTypes = {
    columns: PropTypes.array,
    actionFunc: PropTypes.object,
    actionMenu: PropTypes.array,
    data: PropTypes.array,
    selectedKeys: PropTypes.array,
    onSelectedChange: PropTypes.func,
    loading: PropTypes.bool,
    messages: PropTypes.object
};

export default translate('DataTable')(DataTable);
