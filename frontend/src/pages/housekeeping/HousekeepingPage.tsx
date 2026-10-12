import { PageHeader } from '@/components/common/StatCard'

export function HousekeepingPage() {
  return (
    <div>
      <PageHeader title="Housekeeping" subtitle="Room readiness, tasks, and assignments" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="card p-6"><h3 className="text-sm text-slate-500">Clean rooms</h3><p className="mt-3 text-3xl font-semibold">64</p></div>
        <div className="card p-6"><h3 className="text-sm text-slate-500">Dirty rooms</h3><p className="mt-3 text-3xl font-semibold">11</p></div>
        <div className="card p-6"><h3 className="text-sm text-slate-500">Occupied</h3><p className="mt-3 text-3xl font-semibold">27</p></div>
        <div className="card p-6"><h3 className="text-sm text-slate-500">Under maintenance</h3><p className="mt-3 text-3xl font-semibold">4</p></div>
      </div>
    </div>
  )
}
