import { PageHeader } from '@/components/common/StatCard'

export function MaintenancePage() {
  return (
    <div>
      <PageHeader title="Maintenance" subtitle="Work orders and service requests" />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Request</th>
                <th className="px-4 py-3 font-medium text-slate-700">Room</th>
                <th className="px-4 py-3 font-medium text-slate-700">Priority</th>
                <th className="px-4 py-3 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['AC not cooling', '204', 'High', 'Open'],
                ['Light replacement', '318', 'Medium', 'In progress'],
                ['Plumbing issue', '176', 'Urgent', 'Pending'],
              ].map(([title, room, priority, status]) => (
                <tr key={title} className="border-t border-slate-100">
                  <td className="px-4 py-3">{title}</td>
                  <td className="px-4 py-3">{room}</td>
                  <td className="px-4 py-3">{priority}</td>
                  <td className="px-4 py-3"><span className="badge bg-amber-50 text-amber-600">{status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
