import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/StatCard'
import { guestService } from '@/services/guestService'

export function GuestsPage() {
  const { data: guests, isLoading } = useQuery({
    queryKey: ['guests'],
    queryFn: () => guestService.getGuests(),
  })

  return (
    <div>
      <PageHeader
        title="Guests"
        subtitle="Manage visitor profiles and booking history"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Add guest
          </button>
        }
      />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Guest</th>
                <th className="px-4 py-3 font-medium text-slate-700">Email</th>
                <th className="px-4 py-3 font-medium text-slate-700">Phone</th>
                <th className="px-4 py-3 font-medium text-slate-700">Nationality</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    Loading guests...
                  </td>
                </tr>
              ) : (guests || []).length > 0 ? (
                (guests || []).map((guest: any) => (
                  <tr key={guest.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">{guest.fullName}</td>
                    <td className="px-4 py-3">{guest.email || '-'}</td>
                    <td className="px-4 py-3">{guest.phone || '-'}</td>
                    <td className="px-4 py-3">{guest.nationality || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No guests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
