import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, LineChart, Legend, XAxis, YAxis, Tooltip, Line, CartesianGrid } from 'recharts'

import styles from './sales-chart.less'

const SalesChart = ({
  data,
  messages
}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.title}>{messages.title}</div>
      <ResponsiveContainer minHeight={360}>
        <LineChart data={data}>
          <XAxis
            dataKey="year"
            axisLine={{ stroke: '#e5e5e5', strokeWidth: 1 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            wrapperStyle={{ border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)' }}
            content={(content) => {
              const list = content.payload.map(item => (
                <li key={item.value} className={styles.tipitem}>
                  <span className={styles.radiusdot} style={{ background: item.color }} />
                  {`${messages[item.name]}: ${item.value}`}
                </li>
              ))
              return (
                <div className={styles.tooltip}>
                  <p className={styles.tiptitle}>{content.label}</p>
                  <ul>{list}</ul>
                </div>
              )
            }}
          />
          <Legend
            verticalAlign="top"
            content={(props) => {
              const { payload } = props
              return (
                <ul className={`${styles.legend} clearfix`}>
                  {payload.map(item => (
                    <li key={item.value}>
                      <span className={styles.radiusdot} style={{ background: item.color }} />
                      {messages[item.value]}
                    </li>
                  ))}
                </ul>
              )
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="food" stroke="#d897eb" strokeWidth={3} />
          <Line type="monotone" dataKey="clothes" stroke="#f69899" strokeWidth={3} />
          <Line type="monotone" dataKey="electronics" stroke="#64ea91" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

SalesChart.defaultProps = {
  data: [],
  messages: {
    title: 'Yearly Sales',
    food: 'Food',
    clothes: 'Clothes',
    electronics: 'Electronics'
  }
}

SalesChart.propTypes = {
  data: PropTypes.array,
  messages: PropTypes.object
}

export default SalesChart
