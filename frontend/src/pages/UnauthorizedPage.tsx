import { Link } from 'react-router-dom'

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Access denied</p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">Unauthorized</h1>
        <p className="mt-3 text-slate-600">You do not have permission to view this page.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-navy-900 px-5 py-3 font-medium text-white">Back to dashboard</Link>
      </div>
    </div>
  )
}
