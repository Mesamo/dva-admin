import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd';

import NumberCard from '../../../components/NumberCard/number-card';
import styles from './dashboard.less'

class Dashboard extends React.Component {

  get cards() {
    const cards = [{
      icon: 'pay-circle-o',
      color: '#64ea91',
      title: {
        'zh-CN': '在线评论',
        'en-US': 'Online Review'
      },
      number: 2500,
      percent: 25
    }, {
      icon: 'team',
      color: '#8fc9fb',
      title: {
        'zh-CN': '新客户',
        'en-US': 'New Customers'
      },
      number: 5000,
      percent: 50
    }, {
      icon: 'message',
      color: '#d897eb',
      title: {
        'zh-CN': '活动项目',
        'en-US': 'Active Projects'
      },
      number: 7500,
      percent: 75
    }, {
      icon: 'shopping-cart',
      color: '#f69899',
      title: {
        'zh-CN': '介绍人',
        'en-US': 'Referrals'
      },
      number: 10000,
      percent: 100
    }]

    return cards.map((card, index) => (
      <Col className={styles.card} key={index} xs={24} sm={12} lg={6}>
        <NumberCard {...card} currentLanguage={this.props.currentLanguage} />
      </Col>
    ))
  }

  render() {
    return (
      <div>
        <Row gutter={10}>
          {this.cards}
        </Row>
      </div>
    )
  }
}

Dashboard.defaultProps = {
  currentLanguage: 'en-US'
}

Dashboard.propTypes = {
  currentLanguage: PropTypes.string
}

const mapStateToProps = state => ({
  currentLanguage: state.app.currentLanguage
})

export default connect(mapStateToProps)(Dashboard)
