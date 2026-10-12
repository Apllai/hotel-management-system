import { Outlet, NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Hotel, Users, CalendarRange, CreditCard, BedDouble, Wrench, UserCog, BarChart3, Settings, LogOut, Menu, Bell, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/rooms', label: 'Rooms', icon: Hotel },
  { to: '/guests', label: 'Guests', icon: Users },
  { to: '/reservations', label: 'Reservations', icon: CalendarRange },
  { to: '/front-desk', label: 'Front Desk', icon: BedDouble },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/housekeeping', label: 'Housekeeping', icon: BedDouble },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/staff', label: 'Staff', icon: UserCog },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="page-shell">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-navy-900 p-5 text-slate-100 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Hotel className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Hotel</p>
              <h1 className="text-lg font-semibold">Management</h1>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Signed in</p>
            <p className="mt-2 font-medium text-white">{user?.name ?? 'User'}</p>
            <p className="text-sm text-slate-300">{user?.role ?? 'GUEST'}</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Operations</p>
                  <h2 className="text-xl font-semibold text-slate-900">Hotel Control Center</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </button>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-slate-800">{user?.name ?? 'User'}</p>
                    <p className="text-xs text-slate-500">{user?.role ?? 'GUEST'}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>

                <button
                  onClick={() => void logout()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
