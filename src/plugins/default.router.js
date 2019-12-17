import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'start',
            component: () => import('@/Views/Start.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/Views/About.vue')
        },
    ]
});