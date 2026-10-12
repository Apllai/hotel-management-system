import { PageHeader } from '@/components/common/StatCard'

export function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Revenue, occupancy, and booking insights" />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6"><h3 className="text-sm text-slate-500">Revenue</h3><p className="mt-3 text-3xl font-semibold">$184.2K</p></div>
        <div className="card p-6"><h3 className="text-sm text-slate-500">Occupancy</h3><p className="mt-3 text-3xl font-semibold">76%</p></div>
        <div className="card p-6"><h3 className="text-sm text-slate-500">Bookings</h3><p className="mt-3 text-3xl font-semibold">480</p></div>
      </div>
    </div>
  )
}
