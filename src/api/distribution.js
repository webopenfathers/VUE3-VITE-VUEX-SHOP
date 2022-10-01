import axios from "@/axios";
import { queryParams } from '@/utils/util'


// 订单列表
export function getAgentList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/agent/${page}${r}`)
}

export function getAgentStatistics() {
    return axios.get('/admin/agent/statistics')
}