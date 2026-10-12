import { PageHeader } from '@/components/common/StatCard'

export function GuestsPage() {
  return (
    <div>
      <PageHeader title="Guests" subtitle="Manage visitor profiles and booking history" action={<button className="rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">Add guest</button>} />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Guest</th>
                <th className="px-4 py-3 font-medium text-slate-700">Email</th>
                <th className="px-4 py-3 font-medium text-slate-700">Phone</th>
                <th className="px-4 py-3 font-medium text-slate-700">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Emily Parker', 'emily@email.com', '+1 415 000 1234', '3'],
                ['Noah Chen', 'noah@email.com', '+1 415 111 4567', '2'],
                ['Liam Smith', 'liam@email.com', '+1 415 222 7890', '1'],
              ].map(([name, email, phone, bookings]) => (
                <tr key={name} className="border-t border-slate-100">
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{email}</td>
                  <td className="px-4 py-3">{phone}</td>
                  <td className="px-4 py-3">{bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
