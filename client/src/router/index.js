import Vue            from 'vue'
import VueRouter      from 'vue-router'
import {TokenStorage} from '@/modules/TokenStorage'

// importing pages
import HomePage              from '../pages/HomePage'
import Login                 from '../pages/LoginPage'

Vue.use(VueRouter)


const routes = [
    {
        path:      '/',
        name:      'Home',
        component: HomePage,
    },
    {
        path:      '/login',
        name:      'login',
        component: Login,
        meta:      {
            guest: true,
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!TokenStorage.isAuthenticated()) {
            next({
                path:  '/login',
                query: {
                    nextUrl: to.fullPath,
                },
            })
        } else {
            // let user = JSON.parse(localStorage.getItem('user'))
            // if (to.matched.some(record => record.meta.is_admin)) {
            //     if (user.is_admin == 1) {
            //         next()
            //     } else {
            //         next({name: 'userboard'})
            //     }
            // } else {
            next()
            // }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({name: 'userboard'})
        }
    } else {
        next()
    }
})


export default router
