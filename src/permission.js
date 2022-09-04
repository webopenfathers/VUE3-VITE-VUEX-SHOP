import { router, addRoutes } from '@/router';

import { getToken } from '@/utils/auth.js'
import { toast, showFullLoading, hideFullLoading } from '@/utils/util.js'
import store from './store';

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    // 显示顶部加载进度条
    showFullLoading()

    const token = getToken()
    // 没有登录强制跳转登录页
    if (!token && to.path !== '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }

    // 防止重复登录判断
    if (token && to.path === '/login') {
        toast('请勿重复登录', 'error')
        return next({
            path: from.path ? from.path : '/'
        })
    }

    // 如果用户登录了，自动获取用户信息，并存储在vuex中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let { menus } = await store.dispatch('getInfo')
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : '') + '-vue3+vite后台'
    document.title = title

    hasNewRoutes ? next(to.fullPath) : next()
})


// 全局后置守卫
router.afterEach((to, from) => {
    // 关闭顶部加载进度条
    hideFullLoading()
})