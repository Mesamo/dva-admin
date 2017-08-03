import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

class Users extends React.Component {
    render() {
        const { title } = this.props;

        return (
            <div>{title}</div>
        );
    }
}

Users.propTypes = {
    title: PropTypes.string
};

Users.defaultProps = {
    title: 'Users Manager'
};

export default connect()(Users);
