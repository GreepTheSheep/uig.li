import { createRouter, createWebHashHistory } from 'vue-router'
import maps from '../maps.json'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/map/' + Object.values(maps)[Object.values(maps).length - 1]
        },
        {
            path: '/map/:uid',
            name: 'map',
            component: () => import('../views/MapView.vue')
        }
    ]
})

export default router
