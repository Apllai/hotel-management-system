import api from './api'

export const guestService = {
  async getGuests() {
    const { data } = await api.get('/guests')
    return data
  },

  async createGuest(payload: Record<string, unknown>) {
    const { data } = await api.post('/guests', payload)
    return data
  },

  async updateGuest(id: string, payload: Record<string, unknown>) {
    const { data } = await api.patch(`/guests/${id}`, payload)
    return data
  },
}
