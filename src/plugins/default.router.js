import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'

import Login from '@/components/Login'
import Start from '@/Views/Start'
import RegisterUserForm from '../components/RegisterUserForm'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        //{
        //    path: '/',
        //    name: 'start',
        //    component: () => import('@/Views/Start.vue')
        //},

        {
            path: '/',
            name: 'start',
            component: Start,
            async beforeEnter(to, from, next) {
                var hasPermission = await store.dispatch('login/USER_IS_LOGGED_IN');
                        if (hasPermission) {
                            next()
                        }

                if (!hasPermission) {
                    //TODO: Might send user to the configurator instead of login
                    next({
                        name: "login", // back to safety route //
                        query: { redirectFrom: to.fullPath }
                    })
                }
                
            }
        },

        {
            path: '/register',
            name: 'register',
            component: RegisterUserForm
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
});

export default router;