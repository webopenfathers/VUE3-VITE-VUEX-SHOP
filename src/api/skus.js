import axios from '@/axios'

export function getSkusList(page) {
    return axios.get(`/admin/skus/${page}`)
}

export function createSkus(data) {
    return axios.post(`/admin/skus`, data)
}

export function updateSkus(id, data) {
    return axios.post(`/admin/skus/${id}`, data)
}

export function deleteSkus(ids) {
    //  转换此接口要求传入是一个数组,不是数组要转成数组
    ids = !Array.isArray(ids) ? [ids] : ids
    return axios.post(`/admin/skus/delete_all`, { ids })
}



// 修改状态
export function updateSkusStatus(id, status) {
    return axios.post(`/admin/skus/${id}/update_status`, { status })
}
