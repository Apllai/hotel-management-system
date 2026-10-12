import api from './api'

export const paymentService = {
  async getPayments() {
    const { data } = await api.get('/payments')
    return data
  },

  async createPayment(payload: Record<string, unknown>) {
    const { data } = await api.post('/payments', payload)
    return data
  },
}
