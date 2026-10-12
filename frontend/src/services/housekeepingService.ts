import api from './api'

export const housekeepingService = {
  async getTasks() {
    const { data } = await api.get('/housekeeping/tasks')
    return data
  },

  async createTask(payload: Record<string, unknown>) {
    const { data } = await api.post('/housekeeping/tasks', payload)
    return data
  },

  async updateTask(id: string, payload: Record<string, unknown>) {
    const { data } = await api.patch(`/housekeeping/tasks/${id}`, payload)
    return data
  },
}
