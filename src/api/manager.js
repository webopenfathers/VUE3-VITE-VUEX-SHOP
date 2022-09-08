import axios from '@/axios'
import Qs from 'qs'

// 登录接口
export function login(username, password) {
    return axios.post('/admin/login', {
        username,
        password
    })
}


// 获取用户信息
export function getInfo() {
    return axios.post('/admin/getinfo')
}

// 退出登录
export function logout() {
    return axios.post('/admin/logout')
}


// 修改密码
export function updatePassword(data) {
    return axios.post('/admin/updatepassword', data)
}


// 管理员列表
export function getManagerList(page, data) {
    for (const key in data) {
        if (data[key] === '') delete data[key]
    }
    return axios.get(`/admin/manager/${page}?${Qs.stringify(data)
        }`)
}


