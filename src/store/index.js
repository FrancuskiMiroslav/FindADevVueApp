import { createStore } from 'vuex';

import modules from './modules/index.js'

const store = createStore({
    modules: {
        devs: modules
    },
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    }
})

export default store