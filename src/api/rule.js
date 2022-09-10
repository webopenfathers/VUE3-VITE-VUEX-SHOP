import axios from '@/axios'

export function getRuleList(page) {
    return axios.get(`/admin/rule/${page}`)
}