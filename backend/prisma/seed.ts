import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.housekeepingTask.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.staffProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.hotelSettings.deleteMany();

  const passwordHash = await bcrypt.hash('Secret123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@hotel.local',
      name: 'System Administrator',
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.staffProfile.create({
    data: {
      userId: admin.id,
      employeeId: 'ADM-1001',
      department: 'Operations',
      phone: '+1-555-0101',
    },
  });

  await prisma.hotelSettings.create({
    data: {
      hotelName: 'Azure Horizon Hotel',
      currency: 'USD',
      taxRate: 10,
      serviceFee: 5,
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
      checkInTime: '14:00',
      checkOutTime: '12:00',
    },
  });

  const guestA = await prisma.guest.create({
    data: {
      fullName: 'Amelia Johnson',
      email: 'amelia@example.com',
      phone: '+1-555-2001',
      address: '123 Harbor Lane',
      nationality: 'US',
      specialRequests: 'Quiet room with late checkout.',
    },
  });

  const guestB = await prisma.guest.create({
    data: {
      fullName: 'Daniel Lee',
      email: 'daniel@example.com',
      phone: '+1-555-2002',
      address: '44 Park Avenue',
      nationality: 'Singapore',
    },
  });

  const rooms = await prisma.room.createMany({
    data: [
      { roomNumber: '101', roomType: 'SINGLE', floor: 1, capacity: 2, bedConfiguration: '1 Queen', pricePerNight: 120, amenities: ['WiFi', 'Air Conditioner', 'TV'], description: 'Compact room with city view', status: 'AVAILABLE', housekeepingStatus: 'CLEAN', active: true },
      { roomNumber: '102', roomType: 'DOUBLE', floor: 1, capacity: 2, bedConfiguration: '1 King', pricePerNight: 150, amenities: ['WiFi', 'Mini Bar', 'TV'], description: 'Comfortable double room', status: 'AVAILABLE', housekeepingStatus: 'CLEAN', active: true },
      { roomNumber: '201', roomType: 'DELUXE', floor: 2, capacity: 3, bedConfiguration: '1 King + Sofa Bed', pricePerNight: 220, amenities: ['WiFi', 'Balcony', 'Coffee Machine'], description: 'Deluxe room with balcony', status: 'OCCUPIED', housekeepingStatus: 'INSPECTED', active: true },
      { roomNumber: '202', roomType: 'SUITE', floor: 2, capacity: 4, bedConfiguration: '2 Queen', pricePerNight: 340, amenities: ['WiFi', 'Jacuzzi', 'Workspace'], description: 'Family suite', status: 'RESERVED', housekeepingStatus: 'DIRTY', active: true },
      { roomNumber: '301', roomType: 'TWIN', floor: 3, capacity: 2, bedConfiguration: '2 Single', pricePerNight: 180, amenities: ['WiFi', 'Desk', 'TV'], description: 'Twin room for business stays', status: 'AVAILABLE', housekeepingStatus: 'CLEAN', active: true },
      { roomNumber: '302', roomType: 'FAMILY', floor: 3, capacity: 5, bedConfiguration: '2 Queen + 1 Single', pricePerNight: 280, amenities: ['WiFi', 'Dining Area', 'Air Conditioner'], description: 'Large family room', status: 'MAINTENANCE', housekeepingStatus: 'OUT_OF_SERVICE', active: true },
    ],
  });

  const roomList = await prisma.room.findMany();
  const room101 = roomList.find((room) => room.roomNumber === '101');
  const room201 = roomList.find((room) => room.roomNumber === '201');

  if (room101) {
    await prisma.reservation.create({
      data: {
        bookingReference: 'BK-1001',
        guestId: guestA.id,
        roomId: room101.id,
        checkIn: new Date(Date.now() - 86400000),
        checkOut: new Date(Date.now() + 172800000),
        adults: 2,
        children: 0,
        nights: 2,
        roomRate: 120,
        taxes: 12,
        additionalCharges: 0,
        discount: 0,
        total: 132,
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        specialRequests: 'Late arrival',
      },
    });
  }

  if (room201) {
    await prisma.reservation.create({
      data: {
        bookingReference: 'BK-1002',
        guestId: guestB.id,
        roomId: room201.id,
        checkIn: new Date(Date.now() - 86400000),
        checkOut: new Date(Date.now() + 345600000),
        adults: 2,
        children: 1,
        nights: 4,
        roomRate: 220,
        taxes: 22,
        additionalCharges: 25,
        discount: 10,
        total: 257,
        paymentStatus: 'PARTIAL',
        status: 'CHECKED_IN',
        specialRequests: 'Breakfast included',
      },
    });
  }

  const taskRoom = roomList[3];
  if (taskRoom) {
    await prisma.housekeepingTask.createMany({
      data: [
        { roomId: taskRoom.id, title: 'Deep clean suite', status: 'DIRTY', priority: 'HIGH', dueDate: new Date(Date.now() + 3600000) },
        { roomId: roomList[5]?.id ?? taskRoom.id, title: 'Inspect family room fixtures', status: 'OUT_OF_SERVICE', priority: 'URGENT', dueDate: new Date(Date.now() + 7200000) },
      ],
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
