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

    requests(state, getters, rootState, rootGetters) {
        const devId = rootGetters.userId;
        return state.requests.filter(req => req.devId === devId);
    },

    hasRequests(state, getters) {
        return getters.requests && getters.requests.length > 0;
    },

    checkUpdateDataFromServer(state) {
        const lastFetch = state.lastFetch;
        if(!lastFetch) {
            return true;
        }

        const currentTimestamp = new Date().getTime();
        return (currentTimestamp - lastFetch) / 1000 > 120;
    }
};