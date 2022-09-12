import axios from '@/axios'
import { queryParams } from '@/utils/util'


// 商品列表
export function getGoodsList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}


// 上架/下架状态
export function updateGoodsStatus(ids, status) {
    ids = Array.isArray(ids) ? ids : [ids]
    return axios.post(`/admin/goods/changeStatus`, { ids, status })
}


// 创建商品
export function createGoods(data) {
    return axios.post(`/admin/goods`, data)
}


// 修改商品
export function updateGoods(id, data) {
    return axios.post(`/admin/goods/${id}`, data)
}


// 删除管理员
export function deleteGoods(ids) {
    return axios.post(`/admin/goods/delete_all`, { ids })
}


