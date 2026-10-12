import api from './api'

export const reportService = {
  async getRevenueReport() {
    const { data } = await api.get('/reports/revenue')
    return data
  },

  async getOccupancyReport() {
    const { data } = await api.get('/reports/occupancy')
    return data
  },

  async getBookingReport() {
    const { data } = await api.get('/reports/bookings')
    return data
  },
}
