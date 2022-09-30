import axios from "@/axios";

export function getAgentStatistics() {
    return axios.get('/admin/agent/statistics')
}