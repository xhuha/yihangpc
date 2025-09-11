import { createRouter, createWebHistory } from 'vue-router'
import { authState, bootstrapAuth } from '../api'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue'),
            meta: { title: '首页', requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue'),
            meta: { title: '个人网银登录', guestOnly: true }
        },
        {
            path: '/farmers',
            name: 'Farmers',
            component: () => import('../views/Farmers.vue')
        }
    ]
})

let bootstrapped = false
router.beforeEach(async (to, from, next) => {
    if (to.meta?.title) document.title = to.meta.title
    if (!bootstrapped) {
        await bootstrapAuth()
        bootstrapped = true
    }
    const accessToken = authState.accessToken
    if (to.meta?.requiresAuth && !accessToken) return next({ name: 'Login' })
    if (to.meta?.guestOnly && accessToken) return next({ name: 'Home' })
    next()
})

export default router