export default {
    data(state){
        return state.mockData;
    },

    hasData(state) {
        return state.mockData && state.mockData.length > 0;
    }
};