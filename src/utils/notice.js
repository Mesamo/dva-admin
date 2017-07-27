import { notification } from 'antd';
import CONSTANTS from './constants';

notification.config({
    placement: CONSTANTS.DEFAULT_NOTICE_PLACEMENT
});

const success = (message, description, duration = CONSTANTS.NORMAL_MSG_DURATION) => {
    notification.success({ message, description, duration });
};

const info = (message, description, duration = CONSTANTS.NORMAL_MSG_DURATION) => {
    notification.info({ message, description, duration });
};

const warning = (message, description, duration = CONSTANTS.NORMAL_MSG_DURATION) => {
    notification.warning({ message, description, duration });
};

const error = (message, description, duration = CONSTANTS.ERROR_MSG_DURATION) => {
    notification.error({ message, description, duration });
};

const notice = {
    success,
    info,
    warning,
    error
};

export default notice;
