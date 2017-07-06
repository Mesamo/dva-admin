import React from 'react';
import { connect } from 'dva';
import styles from './Dashboard.css';

const Dashboard = ({ dashboard }) => {
    const { title } = dashboard;
    return (
      <div className={styles.normal}>
          Route Component: {title}
      </div>
    );
};

const mapStateToProps = state => ({
    dashboard: state.dashboard,
});

export default connect(mapStateToProps)(Dashboard);
