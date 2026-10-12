import { PageHeader } from '@/components/common/StatCard'

export function ReservationsPage() {
  return (
    <div>
      <PageHeader title="Reservations" subtitle="Track bookings, statuses, and room assignments" action={<button className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">New reservation</button>} />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Ref</th>
                <th className="px-4 py-3 font-medium text-slate-700">Guest</th>
                <th className="px-4 py-3 font-medium text-slate-700">Dates</th>
                <th className="px-4 py-3 font-medium text-slate-700">Status</th>
                <th className="px-4 py-3 font-medium text-slate-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['BK-1001', 'Emily Parker', '12 Dec - 15 Dec', 'Confirmed', '$930'],
                ['BK-1006', 'Liam Smith', '18 Dec - 21 Dec', 'Checked-in', '$1,180'],
                ['BK-1012', 'Noah Chen', '23 Dec - 26 Dec', 'Pending', '$640'],
              ].map(([ref, guest, dates, status, total]) => (
                <tr key={ref} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{ref}</td>
                  <td className="px-4 py-3">{guest}</td>
                  <td className="px-4 py-3">{dates}</td>
                  <td className="px-4 py-3"><span className="badge bg-emerald-50 text-emerald-600">{status}</span></td>
                  <td className="px-4 py-3">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
