import { PageHeader } from '@/components/common/StatCard'

export function StaffPage() {
  return (
    <div>
      <PageHeader title="Staff" subtitle="User accounts, roles, and permissions" action={<button className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">Add staff</button>} />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Name</th>
                <th className="px-4 py-3 font-medium text-slate-700">Role</th>
                <th className="px-4 py-3 font-medium text-slate-700">Department</th>
                <th className="px-4 py-3 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Olivia Martin', 'Manager', 'Operations', 'Active'],
                ['Daniel James', 'Receptionist', 'Front desk', 'Active'],
                ['Alicia Brown', 'Housekeeping', 'Rooms', 'Inactive'],
              ].map(([name, role, department, status]) => (
                <tr key={name} className="border-t border-slate-100">
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{role}</td>
                  <td className="px-4 py-3">{department}</td>
                  <td className="px-4 py-3"><span className="badge bg-emerald-50 text-emerald-600">{status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
