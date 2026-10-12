import api from './api'

export const maintenanceService = {
  async getRequests() {
    const { data } = await api.get('/maintenance/requests')
    return data
  },
}
