import api from './api'

export const reservationService = {
  async getReservations() {
    const { data } = await api.get('/reservations')
    return data
  },

  async createReservation(payload: Record<string, unknown>) {
    const { data } = await api.post('/reservations', payload)
    return data
  },

  async updateReservation(id: string, payload: Record<string, unknown>) {
    const { data } = await api.patch(`/reservations/${id}`, payload)
    return data
  },

  async cancelReservation(id: string) {
    const { data } = await api.post(`/reservations/${id}/cancel`)
    return data
  },

  async checkInReservation(id: string) {
    const { data } = await api.post(`/reservations/${id}/check-in`)
    return data
  },

  async checkOutReservation(id: string) {
    const { data } = await api.post(`/reservations/${id}/check-out`)
    return data
  },
}
