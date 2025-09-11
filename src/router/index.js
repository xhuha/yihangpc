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
        }
    ]
})

export default router