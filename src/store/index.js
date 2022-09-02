import { createStore } from "vuex";

import { login, getInfo } from "@/api/manager.js";
import { setToken, removeToken } from "@/utils/auth.js";
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {}
        }
    },
    mutations: {
        SET_USERINFO(state, user) {
            // 记录用户信息
            state.user = user
        }
    },
    actions: {
        // 登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 获取当前登陆用户信息
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    commit('SET_USERINFO', res)
                    resolve(res)
                }).catch(err => reject(err))
            })

        },

        // 退出登录
        logout({ commit }) {
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit('SET_USERINFO', {})
        }
    }
})


export default store