import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '@/layout/admin.vue'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
import NotFound from '@/pages/404.vue'
import GoodsList from '@/pages/goods/list.vue'

const routes = [
    {
        path: '/',
        component: Admin,
        // 子路由
        children: [
            {
                path: '/',
                component: Index,
                meta: {
                    title: '后台首页'
                }
            },
            {
                path: '/goods/list',
                component: GoodsList,
                meta: {
                    title: '商品管理'
                }
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录页'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router