import { PageHeader } from '@/components/common/StatCard'

export function BillingPage() {
  return (
    <div>
      <PageHeader title="Billing & Payments" subtitle="Invoices, balances, and payment history" />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card p-6"><h3 className="text-base font-semibold">Outstanding balance</h3><p className="mt-3 text-3xl font-semibold text-slate-900">$4,640</p></div>
        <div className="card p-6"><h3 className="text-base font-semibold">Paid this month</h3><p className="mt-3 text-3xl font-semibold text-slate-900">$58,240</p></div>
        <div className="card p-6"><h3 className="text-base font-semibold">Open invoices</h3><p className="mt-3 text-3xl font-semibold text-slate-900">18</p></div>
      </div>
    </div>
  )
}
