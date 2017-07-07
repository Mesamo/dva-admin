
export default {
    namespace: 'app',
    state: {
        title: 'App',
        collapsed: false,
        mode: 'inline',
        theme: 'dark',
    },
    reducers: {
        toggleCollapse(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
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
