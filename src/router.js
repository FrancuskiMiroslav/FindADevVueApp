import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import DevDetail from './pages/devs/DevDetail.vue';
import DevList from './pages/devs/DevList.vue';
// import DevRegistration from './pages/devs/DevRegistration.vue';
// import DevContact from './pages/requests/DevContact.vue';
// import DevRequests from './pages/requests/DevRequests.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/store.js';

import NotFound from './pages/NotFound.vue';

const DevDetail = defineAsyncComponent(() => import('./pages/devs/DevDetail.vue'));
const DevRegistration = defineAsyncComponent(() => import('./pages/devs/DevRegistration.vue'));
const DevContact = defineAsyncComponent(() => import('./pages/requests/DevContact.vue'));
const DevRequests = defineAsyncComponent(() => import('./pages/requests/DevRequests.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/devs'}, // baseRoute
        { path: '/devs', component: DevList },
        { path: '/devs/:id', 
            component: DevDetail,
            props: true, 
            children: [
            { path: 'contact', component: DevContact }, // /devs/id/contact
        ]},
        { path: '/register', component: DevRegistration, meta: { requiersAuth: true } },
        { path: '/requests', component: DevRequests, meta: { requiersAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiersUnauth: true } },
        
        { path: '/:notFound(.*)', component:NotFound } // not found route
    ],
});

router.beforeEach(function(to, from, next) { //global navigation guard to improve UX and prevent user from visiting pages when they are not possible
    if(to.meta.requiersAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiersUnauth && store.getters.isAuthenticated) {
        next('/devs');
    } else {
        next();
    }
})

export default router