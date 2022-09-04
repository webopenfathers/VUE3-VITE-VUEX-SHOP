import axios from '@/axios'

// 获取用户信息
export function getStatistics1() {
    return axios.get('/admin/statistics1')
}