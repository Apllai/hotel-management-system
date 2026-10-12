import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { guestSchema, housekeepingTaskSchema, paymentSchema, reservationSchema, roomSchema } from '../validators/schemas.js';

const computeNights = (checkIn: Date, checkOut: Date) => {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export const getDashboardSummary = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalRooms, availableRooms, occupiedRooms, reservedRooms, maintenanceRooms, totalReservations, monthlyRevenue] = await Promise.all([
      prisma.room.count({ where: { active: true } }),
      prisma.room.count({ where: { active: true, status: 'AVAILABLE' } }),
      prisma.room.count({ where: { active: true, status: 'OCCUPIED' } }),
      prisma.room.count({ where: { active: true, status: 'RESERVED' } }),
      prisma.room.count({ where: { active: true, status: 'MAINTENANCE' } }),
      prisma.reservation.count(),
      prisma.reservation.aggregate({ _sum: { total: true }, where: { createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    ]);

    const occupancyRate = totalRooms ? ((occupiedRooms + reservedRooms) / totalRooms) * 100 : 0;

    const recentBookings = await prisma.reservation.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { guest: true, room: true },
    });

    const recentPayments = await prisma.payment.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { guest: true, reservation: true },
    });

    return res.json({
      success: true,
      summary: {
        totalRooms,
        availableRooms,
        occupiedRooms,
        reservedRooms,
        maintenanceRooms,
        totalReservations,
        monthlyRevenue: Number(monthlyRevenue._sum.total || 0),
        occupancyRate: Number(occupancyRate.toFixed(2)),
      },
      recentBookings,
      recentPayments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardRevenue = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const data = await prisma.reservation.groupBy({
      by: ['createdAt'],
      _sum: { total: true },
      where: { createdAt: { gte: start } },
    });

    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getDashboardOccupancy = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await prisma.room.findMany({
      select: { roomNumber: true, status: true },
      orderBy: { roomNumber: 'asc' },
    });
    return res.json({ success: true, data: rooms });
  } catch (error) {
    next(error);
  }
};

export const listRooms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await prisma.room.findMany({ orderBy: { roomNumber: 'asc' } });
    return res.json({ success: true, data: rooms });
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = roomSchema.parse(req.body);
    const room = await prisma.room.create({
      data: {
        ...parsed,
        pricePerNight: parsed.pricePerNight,
        active: parsed.active ?? true,
        imageUrl: parsed.imageUrl || null,
      },
    });
    return res.status(201).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = roomSchema.partial().parse(req.body);
    const room = await prisma.room.update({
      where: { id: req.params.id },
      data: parsed,
    });
    return res.json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.room.delete({ where: { id: req.params.id } });
    return res.json({ success: true, message: 'Room deleted.' });
  } catch (error) {
    next(error);
  }
};

export const getAvailableRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkIn = new Date(String(req.query.checkIn || new Date()));
    const checkOut = new Date(String(req.query.checkOut || new Date()));
    const capacity = Number(req.query.capacity || 1);

    const rooms = await prisma.room.findMany({
      where: {
        active: true,
        capacity: { gte: capacity },
        status: { not: 'MAINTENANCE' },
      },
    });

    const available = [] as any[];
    for (const room of rooms) {
      const overlaps = await prisma.reservation.findFirst({
        where: {
          roomId: room.id,
          status: { not: 'CANCELLED' },
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      });
      if (!overlaps) available.push(room);
    }

    return res.json({ success: true, data: available });
  } catch (error) {
    next(error);
  }
};

export const listGuests = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const guests = await prisma.guest.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json({ success: true, data: guests });
  } catch (error) {
    next(error);
  }
};

export const createGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = guestSchema.parse(req.body);
    const guest = await prisma.guest.create({ data: parsed });
    return res.status(201).json({ success: true, data: guest });
  } catch (error) {
    next(error);
  }
};

export const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = guestSchema.partial().parse(req.body);
    const guest = await prisma.guest.update({
      where: { id: req.params.id },
      data: parsed,
    });
    return res.json({ success: true, data: guest });
  } catch (error) {
    next(error);
  }
};

export const listReservations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { guest: true, room: true },
    });
    return res.json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = reservationSchema.parse(req.body);
    const checkIn = new Date(parsed.checkIn);
    const checkOut = new Date(parsed.checkOut);

    if (checkOut <= checkIn) {
      return res.status(400).json({ success: false, message: 'Check-out must be after check-in.' });
    }

    const roomId = parsed.roomId || null;
    if (roomId) {
      const overlap = await prisma.reservation.findFirst({
        where: {
          roomId,
          status: { not: 'CANCELLED' },
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      });
      if (overlap) {
        return res.status(409).json({ success: false, message: 'This room is already booked for the selected dates.' });
      }
    }

    const room = roomId ? await prisma.room.findUnique({ where: { id: roomId } }) : null;
    const roomRate = Number(parsed.roomRate ?? room?.pricePerNight ?? 0);
    const taxes = Number(parsed.taxes ?? 0);
    const additionalCharges = Number(parsed.additionalCharges ?? 0);
    const discount = Number(parsed.discount ?? 0);
    const nights = computeNights(checkIn, checkOut);
    const total = roomRate * nights + taxes + additionalCharges - discount;

    const reservation = await prisma.reservation.create({
      data: {
        bookingReference: `BK-${Date.now()}`,
        guestId: parsed.guestId,
        roomId,
        checkIn,
        checkOut,
        adults: parsed.adults,
        children: parsed.children,
        nights,
        roomRate,
        taxes,
        additionalCharges,
        discount,
        total,
        status: 'PENDING',
        specialRequests: parsed.specialRequests || null,
      },
      include: { guest: true, room: true },
    });

    return res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: {
        status: req.body.status,
        paymentStatus: req.body.paymentStatus,
        specialRequests: req.body.specialRequests,
      },
      include: { guest: true, room: true },
    });
    return res.json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: { status: 'CANCELLED' },
    });
    return res.json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const checkInReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: {
        status: 'CHECKED_IN',
        checkedInAt: new Date(),
      },
    });
    return res.json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const checkOutReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await prisma.reservation.update({
      where: { id: req.params.id },
      data: {
        status: 'CHECKED_OUT',
        checkedOutAt: new Date(),
      },
    });

    if (reservation.roomId) {
      await prisma.room.update({
        where: { id: reservation.roomId },
        data: { status: 'AVAILABLE', housekeepingStatus: 'DIRTY' },
      });
    }

    return res.json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const listPayments = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { guest: true, reservation: true },
    });
    return res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = paymentSchema.parse(req.body);
    const payment = await prisma.payment.create({
      data: {
        reservationId: parsed.reservationId,
        guestId: parsed.guestId,
        amount: parsed.amount,
        method: parsed.method,
        status: 'PAID',
        notes: parsed.notes || null,
      },
      include: { guest: true, reservation: true },
    });
    return res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: { items: true, reservation: { include: { guest: true } } },
    });
    return res.json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

export const listHousekeepingTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.housekeepingTask.findMany({
      orderBy: { createdAt: 'desc' },
      include: { room: true },
    });
    return res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const createHousekeepingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = housekeepingTaskSchema.parse(req.body);
    const task = await prisma.housekeepingTask.create({
      data: {
        roomId: parsed.roomId,
        title: parsed.title,
        status: parsed.status || 'DIRTY',
        priority: parsed.priority || 'MEDIUM',
        dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
        notes: parsed.notes || null,
        assignedTo: parsed.assignedTo || null,
      },
      include: { room: true },
    });
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateHousekeepingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await prisma.housekeepingTask.update({
      where: { id: req.params.id },
      data: {
        status: req.body.status,
        notes: req.body.notes,
        assignedTo: req.body.assignedTo,
      },
      include: { room: true },
    });
    return res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getRevenueReports = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await prisma.reservation.groupBy({
      by: ['status'],
      _sum: { total: true },
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    });
    return res.json({ success: true, data: reports });
  } catch (error) {
    next(error);
  }
};

export const getOccupancyReports = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await prisma.room.findMany({
      select: { roomNumber: true, status: true, roomType: true },
    });
    return res.json({ success: true, data: rooms });
  } catch (error) {
    next(error);
  }
};

export const getBookingReports = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { guest: true, room: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};
