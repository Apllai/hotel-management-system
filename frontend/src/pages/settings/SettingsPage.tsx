import { PageHeader } from '@/components/common/StatCard'

export function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Hotel preferences and account management" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Hotel profile</h2>
          <div className="mt-4 space-y-4">
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Hotel name" />
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Currency" />
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Check-in time" />
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">User profile</h2>
          <div className="mt-4 space-y-4">
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Full name" />
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Email" />
            <button className="w-full rounded-xl bg-navy-900 px-4 py-3 font-medium text-white">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
