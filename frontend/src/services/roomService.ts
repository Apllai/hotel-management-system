import api from './api'
import type { Room } from '@/types'

export const roomService = {
  async getRooms() {
    const { data } = await api.get<Room[]>('/rooms')
    return data
  },

  async getAvailableRooms(params?: Record<string, string>) {
    const { data } = await api.get('/rooms/availability', { params })
    return data
  },

  async createRoom(payload: Partial<Room>) {
    const { data } = await api.post('/rooms', payload)
    return data
  },

  async updateRoom(id: string, payload: Partial<Room>) {
    const { data } = await api.patch(`/rooms/${id}`, payload)
    return data
  },

  async deleteRoom(id: string) {
    await api.delete(`/rooms/${id}`)
  },
}
