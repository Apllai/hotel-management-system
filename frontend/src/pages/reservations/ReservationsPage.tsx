import { useQuery } from '@tanstack/react-query'
import { Plus, Calendar } from 'lucide-react'
import { PageHeader } from '@/components/common/StatCard'
import { reservationService } from '@/services/reservationService'

export function ReservationsPage() {
  const { data: reservations, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationService.getReservations(),
  })

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-50 text-amber-600',
    CONFIRMED: 'bg-blue-50 text-blue-600',
    CHECKED_IN: 'bg-emerald-50 text-emerald-600',
    CHECKED_OUT: 'bg-slate-50 text-slate-600',
    CANCELLED: 'bg-red-50 text-red-600',
  }

  return (
    <div>
      <PageHeader
        title="Reservations"
        subtitle="Track bookings, statuses, and room assignments"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> New reservation
          </button>
        }
      />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Ref</th>
                <th className="px-4 py-3 font-medium text-slate-700">Guest</th>
                <th className="px-4 py-3 font-medium text-slate-700">Check-in</th>
                <th className="px-4 py-3 font-medium text-slate-700">Check-out</th>
                <th className="px-4 py-3 font-medium text-slate-700">Status</th>
                <th className="px-4 py-3 font-medium text-slate-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    Loading reservations...
                  </td>
                </tr>
              ) : (reservations || []).length > 0 ? (
                (reservations || []).map((reservation: any) => (
                  <tr key={reservation.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-900">{reservation.bookingReference}</td>
                    <td className="px-4 py-3">{reservation.guest?.fullName || 'Guest'}</td>
                    <td className="px-4 py-3">{new Date(reservation.checkIn).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(reservation.checkOut).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusColors[reservation.status] || 'bg-slate-50 text-slate-600'}`}>{reservation.status}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">${reservation.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No reservations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
