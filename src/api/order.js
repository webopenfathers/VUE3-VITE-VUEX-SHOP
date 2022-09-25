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


// 导出EXcel
export function exportOrder(query = {}) {
    let r = queryParams(query)
    return axios.post(`/admin/order/excelexport${r}`, {}, {
        responseType: 'blob'
    })
}


// 查看物流信息
export function getShipInfo(id) {
    return axios.get(`/admin/order/${id}/get_ship_info`)
}

