import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import styles from './data-table.less';

const DataTable = () => {
    const column = [{
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
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phonr'
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    }];

    const data = [];
    for (let i = 0; i < 100; i += 1) {
        data.push({
            name: 'test',
            gender: 'male',
            age: 18,
            phone: '123456',
            address: 'ecudor'
        });
    }
    return (
        <Table columns={column} dataSource={data} className={styles.normal} />
    );
};

DataTable.defaultProps = {
};

DataTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
};

export default DataTable;
