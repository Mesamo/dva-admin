import React from 'react';
import { connect } from 'dva';

import DataTable from '../../../components/DataTable/data-table';

class Users extends React.Component {
    render() {
        return (
            <DataTable />
        );
    }
}

Users.propTypes = {
};

Users.defaultProps = {
};

export default connect()(Users);
