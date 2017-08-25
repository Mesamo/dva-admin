import dva from 'dva'
import { browserHistory } from 'dva/router'
import createLoading from 'dva-loading'

import './index.less'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    console.error('app onError --', error)
  }
});

// 2. Plugins
app.use(createLoading({ effect: true }))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

