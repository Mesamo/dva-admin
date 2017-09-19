import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import { Layout } from 'antd'

import HeaderContainer from './header'
import SiderContainer from './sider'
import styles from './index.less'

const { Content, Footer } = Layout

class App extends React.Component {

  get isPublicPages() {
    const { publicPaths, pathname } = this.props
    return publicPaths.includes(pathname)
  }

  get publicPagesLayout() {
    return (
      <div className={styles.normal}>
        {this.props.children}
      </div>
    )
  }

  get withoutSiderLayout() {
    return (
      <Layout className={styles.layout}>
        <HeaderContainer />
        <Content className={styles.content}>
          {this.props.children}
        </Content>
        <Footer />
      </Layout>
    )
  }

  get wrappedSiderLayout() {
    return (
      <Layout className={styles.normal}>
        <SiderContainer />
        {this.withoutSiderLayout}
      </Layout>
    )
  }

  render() {
    if (this.isPublicPages) {
      return this.publicPagesLayout
    }
    return this.props.isNavbar ? this.withoutSiderLayout : this.wrappedSiderLayout
  }
}

App.propTypes = {
  isNavbar: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isNavbar: state.app.isNavbar,
  pathname: state.routing.location.pathname
})

export default withRouter(connect(mapStateToProps)(App))
