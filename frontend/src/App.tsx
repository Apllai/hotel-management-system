import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { RoomsPage } from './pages/rooms/RoomsPage'
import { GuestsPage } from './pages/guests/GuestsPage'
import { ReservationsPage } from './pages/reservations/ReservationsPage'
import { FrontDeskPage } from './pages/front-desk/FrontDeskPage'
import { BillingPage } from './pages/billing/BillingPage'
import { HousekeepingPage } from './pages/housekeeping/HousekeepingPage'
import { MaintenancePage } from './pages/maintenance/MaintenancePage'
import { StaffPage } from './pages/staff/StaffPage'
import { ReportsPage } from './pages/reports/ReportsPage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { UnauthorizedPage } from './pages/UnauthorizedPage'

function AppRoutes() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading application...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute />}> 
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/front-desk" element={<FrontDeskPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/housekeeping" element={<HousekeepingPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
