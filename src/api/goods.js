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


// 查看商品资料---获取轮播图
export function readGoods(id) {
    return axios.get(`/admin/goods/read/${id}`)
}


// 设置商品轮播图
export function setGoodsBanner(id, data) {
    return axios.post(`/admin/goods/banners/${id}`, data)
}


// 设置商品规格
export function updateGoodsSkus(id, data) {
    return axios.post(`/admin/goods/updateskus/${id}`, data)
}


// 添加商品规格
export function createGoodsSkusCard(data) {
    return axios.post(`/admin/goods_skus_card`, data)
}


// 修改商品规格选项
export function updateGoodsSkusCard(id, data) {
    return axios.post(`/admin/goods_skus_card/${id}`, data)
}


// 删除商品规格选项
export function deleteGoodsSkusCard(id) {
    return axios.post(`/admin/goods_skus_card/${id}/delete`)
}


// 商品规格选项排序
export function sortGoodsSkusCard(data) {
    return axios.post(`/admin/goods_skus_card/sort`, data)
}


// 添加规格选项的值
export function createGoodsSkusCardValue(data) {
    return axios.post(`/admin/goods_skus_card_value`, data)
}


// 修改商品规格值
export function updateGoodsSkusCardValue(id, data) {
    return axios.post(`/admin/goods_skus_card_value/${id}`, data)
}




// 删除商品规格值
export function deleteGoodsSkusCardValue(id) {
    return axios.post(`/admin/goods_skus_card_value/${id}/delete`)
}


// 选择商品规格选项和值
export function chooseAndSetGoodsSkusCard(id, data) {
    return axios.post(`/admin/goods_skus_card/${id}/set`, data)
}