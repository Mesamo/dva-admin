import dva from 'dva'
import createHistory from 'history/createBrowserHistory'
import createLoading from 'dva-loading'

import { noticeError } from './utils/notice'
import './index.less'

// 1. Initialize
const app = dva({
  ...createLoading({ effects: true }),
  history: createHistory(),
  onError(error) {
    noticeError('App OnError', error, 0)
  }
});

// 2. Router
app.router(require('./router'))

// 3. Start
app.start('#root')
