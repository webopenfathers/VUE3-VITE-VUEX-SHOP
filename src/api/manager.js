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


// 修改管理员状态
export function updateManagerStatus(id, status) {
    return axios.post(`/admin/manager/${id}/update_status`, { status })
}


// 创建管理员
export function createManager(data) {
    return axios.post(`/admin/manager`, data)
}


// 修改管理员
export function updateManager(id, data) {
    return axios.post(`/admin/manager/${id}`, data)
}


// 删除管理员
export function deleteManager(id) {
    return axios.post(`/admin/manager/${id}/delete`)
}


