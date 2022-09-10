import axios from '@/axios'

export function getRuleList(page) {
    return axios.get(`/admin/rule/${page}`)
}


export function createRule(data) {
    return axios.post(`/admin/rule`, data)
}


export function updateRule(id, data) {
    return axios.post(`/admin/rule/${id}`, data)
}


// 修改状态
export function updateRuleStatus(id, status) {
    return axios.post(`/admin/rule/${id}/update_status`, { status })
}


// 删除
export function deleteRule(id) {
    return axios.post(`/admin/rule/${id}/delete`)
}