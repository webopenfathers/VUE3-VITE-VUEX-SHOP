import axios from '@/axios'
import { queryParams } from '@/utils/util'


// 订单列表
export function getOrderList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/order/${page}${r}`)
}




// 删除订单
export function deleteOrder(ids) {
    ids = Array.isArray(ids) ? ids : [ids]
    return axios.post(`/admin/order/delete_all`, { ids })
}

