import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change?: string
  icon: LucideIcon
  tone?: 'blue' | 'green' | 'amber' | 'slate'
}

export function StatCard({ title, value, change, icon: Icon, tone = 'blue' }: StatCardProps) {
  const tones = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-700',
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">{value}</h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {change && <p className="mt-4 text-sm text-emerald-600">{change}</p>}
    </div>
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ title, description, actionHref }: { title: string; description: string; actionHref?: string }) {
  return (
    <div className="card p-8 text-center">
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      {actionHref && (
        <Link to={actionHref} className="mt-4 inline-flex rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">
          View details
        </Link>
      )}
    </div>
  )
}
