import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue')
        },
        // 添加MapSelect路由配置
        {
            path: '/map-select',
            name: 'MapSelect',
            component: () => import('../components/mapSelect.vue')
        },
        // 添加关于农行路由配置
        {
            path: '/about',
            name: 'AboutABC',
            component: () => import('../views/AboutABC.vue')
        }
    ]
})

export default router