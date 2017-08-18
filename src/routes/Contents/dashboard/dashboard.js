import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

class Dashboard extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div>{title}</div>
    )
  }
}

Dashboard.defaultProps = {
  title: 'Dash board'
}

Dashboard.propTypes = {
  title: PropTypes.string
}

export default connect()(Dashboard)
