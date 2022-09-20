import axios from '@/axios'
import { queryParams } from '@/utils/util'


// 用户管理列表
export function getUserList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/user/${page}${r}`)
}


// 修改用户管理状态
export function updateUserStatus(id, status) {
    return axios.post(`/admin/user/${id}/update_status`, { status })
}


// 创建用户管理
export function createUser(data) {
    return axios.post(`/admin/user`, data)
}


// 修改用户管理
export function updateUser(id, data) {
    return axios.post(`/admin/user/${id}`, data)
}


// 删除用户管理
export function deleteUser(id) {
    return axios.post(`/admin/user/${id}/delete`)
}


