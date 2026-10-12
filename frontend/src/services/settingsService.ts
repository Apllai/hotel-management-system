import api from './api'

export const settingsService = {
  async getSettings() {
    const { data } = await api.get('/settings')
    return data
  },

  async updateSettings(payload: Record<string, unknown>) {
    const { data } = await api.patch('/settings', payload)
    return data
  },
}
