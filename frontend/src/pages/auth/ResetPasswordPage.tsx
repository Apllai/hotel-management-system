import { Link } from 'react-router-dom'

export function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Reset password</h1>
        <p className="mt-2 text-sm text-slate-500">Create a strong new password for your account.</p>
        <input type="password" className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="New password" />
        <input type="password" className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Confirm password" />
        <button className="mt-5 w-full rounded-xl bg-navy-900 px-4 py-3 font-medium text-white">Update password</button>
        <div className="mt-5 text-sm text-slate-600">
          Back to <Link to="/login" className="font-medium text-navy-700">login</Link>
        </div>
      </div>
    </div>
  )
}
