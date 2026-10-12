import { CalendarDays, DollarSign, Hotel, KeyRound, Users } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/common/StatCard'

export function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Hotel performance overview" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Rooms" value="128" change="+4 this month" icon={Hotel} tone="blue" />
        <StatCard title="Available" value="42" change="+8% vs last week" icon={KeyRound} tone="green" />
        <StatCard title="Occupancy" value="76%" change="Stable" icon={Users} tone="amber" />
        <StatCard title="Monthly Revenue" value="$184.2K" change="+12.4%" icon={DollarSign} tone="slate" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Revenue overview</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">Updated today</span>
          </div>
          <div className="h-64 rounded-2xl bg-slate-100" />
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Today’s activity</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3"><span>Check-ins</span><strong className="text-slate-900">14</strong></div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3"><span>Check-outs</span><strong className="text-slate-900">9</strong></div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3"><span>Pending bookings</span><strong className="text-slate-900">23</strong></div>
            <div className="flex items-center justify-between"><span>Outstanding balance</span><strong className="text-slate-900">$4,630</strong></div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent reservations</h2>
          <div className="mt-4 space-y-3">
            {['A-204', 'B-118', 'C-409'].map((room, index) => (
              <div key={room} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                <div>
                  <p className="font-medium text-slate-900">Guest {index + 1}</p>
                  <p className="text-sm text-slate-500">{room} • Check-in today</p>
                </div>
                <span className="badge bg-emerald-50 text-emerald-600">Confirmed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent payments</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>Card payment</span><strong>$680</strong></div>
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>Bank transfer</span><strong>$1,250</strong></div>
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>Cash receipt</span><strong>$310</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}
