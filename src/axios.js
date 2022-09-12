import axios from 'axios'
import { toast } from './utils/util';
import store from './store'
import { getToken } from "@/utils/auth.js";
const service = axios.create({
    baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 往header头自动添加token


    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    // 对响应错误做点什么
    const msg = error.response.data.msg || "请求失败"

    if (msg == '非法token，请先登录！') {
        store.dispatch('logout').finally(() => {
            location.reload()
        })
    }

    (msg.indexOf('禁止操作') !== -1) ? toast('默认数据，禁止操作', 'error') : toast(msg, 'error')

    return Promise.reject(error);
});


export default service