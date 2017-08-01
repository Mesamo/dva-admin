import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';

const Users = () => {
    return (
        <div>Users Manager</div>
    );
};

Users.propTypes = {
};

export default connect()(Users);
