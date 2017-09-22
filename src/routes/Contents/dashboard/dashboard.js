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
    return this.props.cards.map((card, index) => (
      <Col className={styles.card} key={index} xs={24} sm={12} lg={6}>
        <NumberCard {...card} title={card.title[this.props.currentLanguage]} />
      </Col>
    ))
  }

  get salesChart() {
    if (this.props.sales && this.props.sales.length > 0) {
      return (
        <Col xs={24}>
          <SalesChart data={this.props.sales} />
        </Col>
      )
    } else {
      return ''
    }
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          {this.cards}
        </Row>
        <Row>
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
  currentLanguage: 'en-US'
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
