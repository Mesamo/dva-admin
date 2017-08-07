import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import styles from './data-table.less';

const DataTable = ({
    columns,
    data,
    loading
 }) => {
    return (
        <Table columns={columns} dataSource={data} loading={loading} className={styles.normal} />
    );
};

DataTable.defaultProps = {
};

DataTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    loading: PropTypes.bool
};

export default DataTable;
