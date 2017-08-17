import { notification } from 'antd'
import CONSTANTS from './constants'

notification.config({
  placement: CONSTANTS.DEFAULT_NOTICE_PLACEMENT
})

export const noticeSuccess = (message, description, duration = CONSTANTS.NORMAL_MSG_DURATION) => {
  notification.success({ message, description, duration })
}

export const noticeInfo = (message, description, duration = CONSTANTS.NORMAL_MSG_DURATION) => {
  notification.info({ message, description, duration })
}

export const noticeWarning = (message, description, duration = CONSTANTS.NORMAL_MSG_DURATION) => {
  notification.warning({ message, description, duration })
}

export const noticeError = (message, description, duration = CONSTANTS.ERROR_MSG_DURATION) => {
  notification.error({ message, description, duration })
}
