import React from 'react'
import { Icon } from 'antd'
import styles from './error.less'

class Error extends React.Component {
  render() {
    return (
      <div className="content-inner">
        <div className={styles.error}>
          <Icon type="frown-o" style={{ fontSize: 40 }} />
          <h1>404 Not Found</h1>
        </div>
      </div>
    )
  }
}

export default Error
