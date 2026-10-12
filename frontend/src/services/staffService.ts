import api from './api'

export const staffService = {
  async getStaff() {
    const { data } = await api.get('/staff')
    return data
  },
}
