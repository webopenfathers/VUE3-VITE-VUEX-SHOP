import axios from '@/axios'
import { queryParams } from '@/utils/util'


// 管理员列表
export function getGoodsCommentList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/goods_comment/${page}${r}`)
}


// 修改管理员状态
export function updateGoodsCommentStatus(id, status) {
    return axios.post(`/admin/goods_comment/${id}/update_status`, { status })
}





