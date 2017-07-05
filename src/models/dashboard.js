
export default {
    namespace: 'dashboard',
    state: {
        title: 'Dashboard',
    },
    reducers: {},
    effects: {
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/dashboard') {
                    dispatch({ type: 'checkLogin' });
                }
            });
        },
    },
};
