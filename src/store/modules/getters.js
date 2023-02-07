export default {
    devs(state){
        return state.devs;
    },

    hasData(state) {
        return state.devs && state.devs.length > 0;
    },

    isDev(state, getters, rootState, rootGetters) {
        const devs = getters.devs;
        const userId = rootGetters.userId;
        return devs.some(dev => dev.id === userId);
    },

    requests(state) {
        return state.requests
    },

    hasRequests(state) {
        return state.requests && state.requests.length > 0
    }
};