import React from 'react';
import { connect } from 'dva';
import styles from './Dashboard.css';

function Dashboard({ dashboard }) {
    const { title } = dashboard;
    return (
      <div className={styles.normal}>
          Route Component: {title}
      </div>
    );
}

function mapStateToProps({ dashboard }) {
    return { dashboard };
}

export default connect(mapStateToProps)(Dashboard);
