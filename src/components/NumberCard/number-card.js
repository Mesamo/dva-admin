import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Progress } from 'antd'

import styles from './number-card.less'

const NumberCard = ({
  color,
  icon,
  title,
  number,
  percent,
  currentLanguage
}) => {
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.flexBox}>
        <Icon className={styles.iconWarp} style={{ backgroundColor: color }} type={icon} />
        <div className={styles.content}>
          <p className={styles.title}>{title[currentLanguage] || 'No Title'}</p>
          <Progress percent={percent} strokeWidth={3} />
          <p className={styles.number}>
            {number}
          </p>
        </div>
      </div>
    </Card>
  );
};

NumberCard.defaultProps = {
  color: '#64ea91',
  icon: 'android',
  title: '',
  number: 50,
  percent: 50,
  currentLanguage: 'en-US'
}

NumberCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  number: PropTypes.number,
  percent: PropTypes.number,
  currentLanguage: PropTypes.string.isRequired
};

export default NumberCard;
