import axios from '@/axios'

// 获取用户信息
export function getStatistics1() {
    return axios.get('/admin/statistics1')
}


// 店铺交易
export function getStatistics2() {
    return axios.get('/admin/statistics2')
}


// 获取echarts数据
export function getStatistics3(type) {
    return axios.get(`/admin/statistics3?type=${type}`)
}