import { createRouter, createWebHistory } from 'vue-router';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/myRoute'}, // baseRoute
        { path: '/myRoute', component: null },
        { path: '/myRoute/:id', component: null, children: [
            { path: 'myRoute2', component: null }, // /myRoute/id/myRoute2
        ]},
        { path: '/:notFound(.*)', component:NotFound } // not found route
    ],
});

export default router