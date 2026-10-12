import api from './api'

export const invoiceService = {
  async getInvoice(id: string) {
    const { data } = await api.get(`/invoices/${id}`)
    return data
  },
}
