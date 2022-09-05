import axios from '@/axios'

// 获取用户信息
export function getStatistics1() {
    return axios.get('/admin/statistics1')
}


// 获取用户信息
export function getStatistics3(type) {
    return axios.get(`/admin/statistics3?type=${type}`)
}