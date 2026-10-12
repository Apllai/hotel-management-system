import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { authService } from '@/services/authService'
import type { User } from '@/types'
import { toast } from 'sonner'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    void loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const currentUser = await authService.me()
      setUser(currentUser)
    } catch (err) {
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      setUser(response.user)
      toast.success('Logged in successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
      throw err
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string, role?: string) => {
    try {
      const response = await authService.register({ name, email, password, role })
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      setUser(response.user)
      toast.success('Account created successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed')
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      localStorage.removeItem('token')
      setUser(null)
      window.location.href = '/login'
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
