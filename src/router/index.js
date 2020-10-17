import Vue from 'vue'
import VueRouter from 'vue-router'
import JobsList from "@/views/JobsList";
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'JobsList',
        component: JobsList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})

export default router