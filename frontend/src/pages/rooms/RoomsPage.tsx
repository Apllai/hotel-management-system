import { PageHeader } from '@/components/common/StatCard'

export function RoomsPage() {
  return (
    <div>
      <PageHeader title="Rooms" subtitle="Manage room inventory and housekeeping status" action={<button className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">Add room</button>} />

      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Search rooms by number or type" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Room</th>
                <th className="px-4 py-3 font-medium text-slate-700">Type</th>
                <th className="px-4 py-3 font-medium text-slate-700">Floor</th>
                <th className="px-4 py-3 font-medium text-slate-700">Rate</th>
                <th className="px-4 py-3 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { room: '101', type: 'Deluxe', floor: 1, rate: '$180', status: 'Available' },
                { room: '204', type: 'Suite', floor: 2, rate: '$320', status: 'Occupied' },
                { room: '312', type: 'Twin', floor: 3, rate: '$150', status: 'Reserved' },
              ].map((room) => (
                <tr key={room.room} className="border-t border-slate-100">
                  <td className="px-4 py-3">{room.room}</td>
                  <td className="px-4 py-3">{room.type}</td>
                  <td className="px-4 py-3">{room.floor}</td>
                  <td className="px-4 py-3">{room.rate}</td>
                  <td className="px-4 py-3"><span className="badge bg-emerald-50 text-emerald-600">{room.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
