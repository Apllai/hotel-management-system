import { Link } from 'react-router-dom'

export function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-500">Enter your email and we’ll send reset instructions.</p>
        <input type="email" className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="name@hotel.com" />
        <button className="mt-5 w-full rounded-xl bg-navy-900 px-4 py-3 font-medium text-white">Send reset link</button>
        <div className="mt-5 text-sm text-slate-600">
          Back to <Link to="/login" className="font-medium text-navy-700">login</Link>
        </div>
      </div>
    </div>
  )
}
