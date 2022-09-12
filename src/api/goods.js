import axios from '@/axios'
import Qs from 'qs'


// 商品列表
export function getGoodsList(page, data) {
    for (const key in data) {
        if (data[key] === '') delete data[key]
    }
    return axios.get(`/admin/goods/${page}?${Qs.stringify(data)
        }`)
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


