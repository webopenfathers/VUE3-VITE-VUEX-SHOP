import router from '@/router';

import { getToken } from '@/utils/auth.js'
import { toast } from '@/utils/util.js'
import store from './store';

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
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
    if (token) {
        await store.dispatch('getInfo')
    }

    next()
})