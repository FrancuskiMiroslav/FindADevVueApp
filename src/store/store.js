import { createStore } from 'vuex';

import modules from './modules/modules.js'
import authModule from './modules/auth/auth.js'

const store = createStore({
    modules: {
        devs: modules,
        auth: authModule
    },
})

export default store