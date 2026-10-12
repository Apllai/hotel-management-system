import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/StatCard'
import { roomService } from '@/services/roomService'

export function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomService.getRooms(),
  })

  const filtered = (rooms || []).filter(
    (room: any) =>
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const statusColors: Record<string, string> = {
    AVAILABLE: 'bg-emerald-50 text-emerald-600',
    OCCUPIED: 'bg-blue-50 text-blue-600',
    RESERVED: 'bg-amber-50 text-amber-600',
    MAINTENANCE: 'bg-red-50 text-red-600',
  }

  return (
    <div>
      <PageHeader
        title="Rooms"
        subtitle="Manage room inventory and housekeeping status"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" /> Add room
          </button>
        }
      />

      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
            placeholder="Search rooms by number or type"
          />
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Loading rooms...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((room: any) => (
                  <tr key={room.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">{room.roomNumber}</td>
                    <td className="px-4 py-3">{room.roomType}</td>
                    <td className="px-4 py-3">{room.floor}</td>
                    <td className="px-4 py-3">${room.pricePerNight}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusColors[room.status] || 'bg-slate-50 text-slate-600'}`}>{room.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No rooms found
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
