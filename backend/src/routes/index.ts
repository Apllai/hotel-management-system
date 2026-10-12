import { Router } from 'express';
import { register, login, me, logout } from '../controllers/authController.js';
import {
  createGuest,
  createHousekeepingTask,
  createPayment,
  createReservation,
  createRoom,
  deleteRoom,
  getAvailableRooms,
  getBookingReports,
  getDashboardOccupancy,
  getDashboardRevenue,
  getDashboardSummary,
  getInvoice,
  getOccupancyReports,
  getRevenueReports,
  listGuests,
  listHousekeepingTasks,
  listPayments,
  listReservations,
  listRooms,
  updateGuest,
  updateHousekeepingTask,
  updateReservation,
  updateRoom,
  cancelReservation,
  checkInReservation,
  checkOutReservation,
} from '../controllers/dashboardController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', authenticate, logout);
router.get('/auth/me', authenticate, me);

router.get('/dashboard/summary', authenticate, requireRole('ADMIN', 'MANAGER', 'RECEPTIONIST'), getDashboardSummary);
router.get('/dashboard/revenue', authenticate, requireRole('ADMIN', 'MANAGER'), getDashboardRevenue);
router.get('/dashboard/occupancy', authenticate, requireRole('ADMIN', 'MANAGER'), getDashboardOccupancy);

router.get('/rooms', authenticate, listRooms);
router.post('/rooms', authenticate, requireRole('ADMIN', 'MANAGER', 'RECEPTIONIST'), createRoom);
router.patch('/rooms/:id', authenticate, requireRole('ADMIN', 'MANAGER', 'RECEPTIONIST'), updateRoom);
router.delete('/rooms/:id', authenticate, requireRole('ADMIN'), deleteRoom);
router.get('/rooms/availability', authenticate, getAvailableRooms);

router.get('/guests', authenticate, listGuests);
router.post('/guests', authenticate, requireRole('ADMIN', 'RECEPTIONIST', 'MANAGER'), createGuest);
router.patch('/guests/:id', authenticate, requireRole('ADMIN', 'RECEPTIONIST', 'MANAGER'), updateGuest);

router.get('/reservations', authenticate, listReservations);
router.post('/reservations', authenticate, createReservation);
router.patch('/reservations/:id', authenticate, requireRole('ADMIN', 'RECEPTIONIST', 'MANAGER'), updateReservation);
router.post('/reservations/:id/cancel', authenticate, requireRole('ADMIN', 'RECEPTIONIST', 'MANAGER'), cancelReservation);
router.post('/reservations/:id/check-in', authenticate, requireRole('ADMIN', 'RECEPTIONIST'), checkInReservation);
router.post('/reservations/:id/check-out', authenticate, requireRole('ADMIN', 'RECEPTIONIST'), checkOutReservation);

router.get('/payments', authenticate, listPayments);
router.post('/payments', authenticate, requireRole('ADMIN', 'RECEPTIONIST'), createPayment);
router.get('/invoices/:id', authenticate, getInvoice);

router.get('/housekeeping/tasks', authenticate, listHousekeepingTasks);
router.post('/housekeeping/tasks', authenticate, requireRole('ADMIN', 'MANAGER', 'HOUSEKEEPING'), createHousekeepingTask);
router.patch('/housekeeping/tasks/:id', authenticate, requireRole('ADMIN', 'MANAGER', 'HOUSEKEEPING'), updateHousekeepingTask);

router.get('/reports/revenue', authenticate, requireRole('ADMIN', 'MANAGER'), getRevenueReports);
router.get('/reports/occupancy', authenticate, requireRole('ADMIN', 'MANAGER'), getOccupancyReports);
router.get('/reports/bookings', authenticate, requireRole('ADMIN', 'MANAGER'), getBookingReports);

export default router;
