import { createRouter, createWebHistory } from 'vue-router';

import DevDetail from './pages/devs/DevDetail.vue';
import DevList from './pages/devs/DevList.vue';
import DevRegistration from './pages/devs/DevRegistration.vue';
import DevContact from './pages/requests/DevContact.vue';
import DevRequests from './pages/requests/DevRequests.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/devs'}, // baseRoute
        { path: '/devs', component: DevList },
        { path: '/devs/:id', component: DevDetail, children: [
            { path: 'contact', component: DevContact }, // /devs/id/contact
        ]},
        { path: '/register', component: DevRegistration },
        { path: '/requests', component: DevRequests },

        { path: '/:notFound(.*)', component:NotFound } // not found route
    ],
});

export default router