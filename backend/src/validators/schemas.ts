import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'RECEPTIONIST', 'MANAGER', 'HOUSEKEEPING', 'GUEST']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const roomSchema = z.object({
  roomNumber: z.string().min(1),
  roomType: z.enum(['SINGLE', 'DOUBLE', 'TWIN', 'DELUXE', 'SUITE', 'FAMILY']),
  floor: z.number().int().min(1),
  capacity: z.number().int().min(1),
  bedConfiguration: z.string().min(1),
  pricePerNight: z.number().min(0),
  amenities: z.array(z.string()).default([]),
  description: z.string().optional(),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE', 'CLEAN', 'DIRTY', 'OUT_OF_SERVICE']).optional(),
  housekeepingStatus: z.enum(['CLEAN', 'DIRTY', 'INSPECTED', 'OUT_OF_SERVICE']).optional(),
  active: z.boolean().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export const guestSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  documentType: z.enum(['PASSPORT', 'NATIONAL_ID', 'DRIVERS_LICENSE', 'OTHER']).optional(),
  documentNumber: z.string().optional(),
  nationality: z.string().optional(),
  specialRequests: z.string().optional(),
});

export const reservationSchema = z.object({
  guestId: z.string().min(1),
  roomId: z.string().min(1).optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().int().min(1),
  children: z.number().int().min(0),
  specialRequests: z.string().optional(),
  roomRate: z.number().min(0).optional(),
  taxes: z.number().min(0).optional(),
  discount: z.number().min(0).optional(),
  additionalCharges: z.number().min(0).optional(),
});

export const paymentSchema = z.object({
  reservationId: z.string().min(1),
  guestId: z.string().min(1),
  amount: z.number().min(0),
  method: z.enum(['CASH', 'CARD', 'UPI', 'BANK_TRANSFER']),
  notes: z.string().optional(),
});

export const housekeepingTaskSchema = z.object({
  roomId: z.string().min(1),
  title: z.string().min(2),
  status: z.enum(['CLEAN', 'DIRTY', 'INSPECTED', 'OUT_OF_SERVICE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
});
