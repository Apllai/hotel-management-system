export type Role = 'ADMIN' | 'MANAGER' | 'RECEPTIONIST' | 'HOUSEKEEPING' | 'GUEST'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  active: boolean
}

export interface AuthResponse {
  user: User
  token?: string
}

export interface Room {
  id: string
  roomNumber: string
  roomType: string
  floor: number
  capacity: number
  bedConfiguration: string
  pricePerNight: number
  amenities: string[]
  description?: string
  status: string
  housekeepingStatus: string
  active: boolean
}

export interface Guest {
  id: string
  fullName: string
  email?: string
  phone?: string
  address?: string
  documentType?: string
  documentNumber?: string
}

export interface Reservation {
  id: string
  bookingReference: string
  guestId: string
  roomId?: string
  guest?: Guest
  room?: Room
  status: string
  paymentStatus: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  total: number
}

export interface DashboardSummary {
  totalRooms: number
  availableRooms: number
  occupiedRooms: number
  reservedRooms: number
  maintenanceRooms: number
  todaysCheckIns: number
  todaysCheckOuts: number
  totalBookings: number
  monthlyRevenue: number
  occupancyRate: number
}
