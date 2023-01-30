import { createStore } from 'vuex';

import modules from './modules/index.js'

const store = createStore({
    modules: {
        data: modules
    }
})

export default store