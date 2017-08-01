import { routerRedux } from 'dva/router';

import { sendResetPasswordEmail } from '../services/login.service.';

export default {
    namespace: 'reset',
    state: {
    },
    reducers: {
    },
    effects: {
        *sendEmil({ payload }, { call, put }) {
            const { email, onSuccess, onError } = payload;
            try {
                yield call(sendResetPasswordEmail, email);
                yield onSuccess('Send email success!');
                yield put(routerRedux.push('/login'));
            } catch (error) {
                yield onError(error.code, error.message);
            }
        }
    },
    subscriptions: {
    }
};
