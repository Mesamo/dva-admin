import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'

import NumberCard from '../../../components/NumberCard'
import SalesChart from '../../../components/SalesChart'
import styles from './dashboard.less'

class Dashboard extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get cards() {
    return this.props.cards.map(card => (
      <Col className={styles.card} key={card.icon} xs={24} sm={12} lg={6}>
        <NumberCard {...card} title={card.title[this.props.currentLanguage]} />
      </Col>
    ))
  }

  get salesChart() {
    return this.props.sales && this.props.sales.length > 0 ? (
      <Col xs={24}>
        <SalesChart data={this.props.sales} />
      </Col>
    ) : ''
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          {this.cards}
        </Row>
        <Row gutter={10}>
          {this.salesChart}
        </Row>
      </div>
    )
  }
}

Dashboard.childContextTypes = {
  currentLanguage: PropTypes.string
}

Dashboard.defaultProps = {
  currentLanguage: 'en-US',
  cards: [],
  sales: []
}

Dashboard.propTypes = {
  currentLanguage: PropTypes.string,
  cards: PropTypes.array,
  sales: PropTypes.array
}

const mapStateToProps = state => ({
  currentLanguage: state.app.currentLanguage,
  cards: state.dashboard.cards,
  sales: state.dashboard.sales
})

export default connect(mapStateToProps)(Dashboard)
