import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

class Dashboard extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div>{title}</div>
        );
    }
}

Dashboard.propTypes = {
    title: PropTypes.string
};

Dashboard.defaultProps = {
    title: 'Dash board'
};

export default connect()(Dashboard);
