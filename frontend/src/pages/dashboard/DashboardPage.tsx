import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CalendarDays, DollarSign, Hotel, KeyRound, Users, TrendingUp } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/common/StatCard'
import { dashboardService } from '@/services/dashboardService'
import { reservationService } from '@/services/reservationService'
import { paymentService } from '@/services/paymentService'

export function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => dashboardService.getSummary(),
  })

  const { data: revenue, isLoading: revenueLoading } = useQuery({
    queryKey: ['dashboard', 'revenue'],
    queryFn: () => dashboardService.getRevenue(),
  })

  const { data: reservations } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationService.getReservations(),
  })

  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentService.getPayments(),
  })

  if (summaryLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading dashboard...</div>
  }

  const recentReservations = (reservations || []).slice(0, 3)
  const recentPayments = (payments || []).slice(0, 3)

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Hotel performance overview" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Rooms" value={summary?.totalRooms?.toString() || '0'} icon={Hotel} tone="blue" />
        <StatCard title="Available" value={summary?.availableRooms?.toString() || '0'} icon={KeyRound} tone="green" />
        <StatCard title="Occupancy" value={`${summary?.occupancyRate?.toFixed(1) || 0}%`} icon={Users} tone="amber" />
        <StatCard title="Monthly Revenue" value={`$${summary?.monthlyRevenue?.toLocaleString() || 0}`} icon={DollarSign} tone="slate" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Revenue overview</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">Updated today</span>
          </div>
          {revenueLoading ? (
            <div className="h-64 rounded-2xl bg-slate-100" />
          ) : revenue?.data ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenue.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#1e293b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : null}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Today's activity</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span>Check-ins</span>
              <strong className="text-slate-900">{summary?.todaysCheckIns || 0}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span>Check-outs</span>
              <strong className="text-slate-900">{summary?.todaysCheckOuts || 0}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span>Pending bookings</span>
              <strong className="text-slate-900">{summary?.totalBookings || 0}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Occupied rooms</span>
              <strong className="text-slate-900">{summary?.occupiedRooms || 0}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent reservations</h2>
          <div className="mt-4 space-y-3">
            {recentReservations.length > 0 ? (
              recentReservations.map((reservation: any) => (
                <div key={reservation.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="font-medium text-slate-900">{reservation.guest?.fullName || 'Guest'}</p>
                    <p className="text-sm text-slate-500">{reservation.bookingReference} • {reservation.status}</p>
                  </div>
                  <span className="badge bg-emerald-50 text-emerald-600">${reservation.total}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No reservations yet</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent payments</h2>
          <div className="mt-4 space-y-3">
            {recentPayments.length > 0 ? (
              recentPayments.map((payment: any) => (
                <div key={payment.id} className="flex justify-between rounded-xl border border-slate-100 p-3">
                  <span>{payment.method}</span>
                  <strong>${payment.amount}</strong>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No payments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
