import { PageHeader } from '@/components/common/StatCard'

export function FrontDeskPage() {
  return (
    <div>
      <PageHeader title="Front Desk" subtitle="Check-in, check-out, and arrivals overview" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Today's arrivals</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>BK-1030</span><span>Room 215</span><button className="rounded-lg bg-emerald-500 px-2.5 py-1 text-xs text-white">Check-in</button></div>
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>BK-1034</span><span>Room 314</span><button className="rounded-lg bg-emerald-500 px-2.5 py-1 text-xs text-white">Check-in</button></div>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Today's departures</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>BK-1022</span><span>Room 101</span><button className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white">Check-out</button></div>
            <div className="flex justify-between rounded-xl border border-slate-100 p-3"><span>BK-1028</span><span>Room 408</span><button className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white">Check-out</button></div>
          </div>
        </div>
      </div>
    </div>
  )
}
