import { useState } from 'react'
import { Link } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in</h1>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-navy-500 focus:bg-white"
              placeholder="name@hotel.com"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-sm text-navy-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-navy-500 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full rounded-xl bg-navy-900 px-4 py-3 font-medium text-white transition hover:bg-navy-800">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account?{' '}
          <Link to="/register" className="font-medium text-navy-700 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
