import axios from '@/axios'



export function getSysconfig() {
    return axios.get(`/admin/sysconfig`)

}


export function setSysconfig(data) {
    return axios.post(`/admin/sysconfig`, data)

}

// 上传文件api接口
export const uploadAction = import.meta.env.VITE_APP_BASE_API + '/admin/sysconfig/upload'