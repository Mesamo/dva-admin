import React from 'react';
import { connect } from 'dva';

import DataTable from '../../../components/DataTable/data-table';

class Users extends React.Component {
    render() {
        const { users } = this.props.user;
        const loading = this.props.loading;
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
            key: 'phonr'
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        }];

        const props = {
            columns,
            data: users,
            loading
        };
        return (
            <DataTable {...props} />
        );
    }
}

Users.propTypes = {
};

Users.defaultProps = {
};

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading.models.user
});

export default connect(mapStateToProps)(Users);
