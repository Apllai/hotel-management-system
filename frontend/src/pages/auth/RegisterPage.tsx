import { Link } from 'react-router-dom'
export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">New account</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create staff profile</h1>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Jane Smith" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="jane@hotel.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-navy-900 px-4 py-3 font-medium text-white">
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-navy-700 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
