import { createStore } from "vuex";


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
    }
})


export default store