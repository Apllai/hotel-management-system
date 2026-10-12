import api from './api'
import type { DashboardSummary } from '@/types'

export const dashboardService = {
  async getSummary() {
    const { data } = await api.get<DashboardSummary>('/dashboard/summary')
    return data
  },

  async getRevenue() {
    const { data } = await api.get('/dashboard/revenue')
    return data
  },

  async getOccupancy() {
    const { data } = await api.get('/dashboard/occupancy')
    return data
  },
}
