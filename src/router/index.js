import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/farmers',
            name: 'Farmers',
            component: () => import('../views/Farmers.vue')
        }
    ]
})
export default router