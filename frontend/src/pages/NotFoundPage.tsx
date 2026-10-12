import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">This page doesn’t exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-navy-900 px-5 py-3 font-medium text-white">Go home</Link>
      </div>
    </div>
  )
}
