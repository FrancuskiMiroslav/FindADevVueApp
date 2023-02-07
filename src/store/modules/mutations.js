export default {
    addDev(state, payload) {
        state.devs.push(payload)
    },

    addRequest(state, payload) {
        state.requests.push(payload)
    },

    setDataFromServer(state, payload) {
        state.devs = payload
    }
};