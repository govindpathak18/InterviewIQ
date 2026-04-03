import { createContext, useContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import * as authApi from '../../features/auth/api/auth.api'

export interface User { id: string; name: string; email: string }

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  register: (payload: { name: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (payload: { email: string }) => Promise<void>
  resetPassword: (payload: { token: string; newPassword: string }) => Promise<void>
  sendVerificationEmail: () => Promise<void>
  verifyEmail: (payload: { token: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await authApi.me()
        if (data?.user) {
          setUser(data.user)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const data = await authApi.login({ email, password })
    if (data?.user) {
      setUser(data.user)
    }
  }, [])

  const register = useCallback(async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const data = await authApi.register({ name, email, password })
    if (data?.user) {
      setUser(data.user)
    }
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setUser(null)
  }, [])

  const forgotPassword = useCallback(async ({ email }: { email: string }) => {
    await authApi.forgotPassword({ email })
  }, [])

  const resetPassword = useCallback(async ({ token, newPassword }: { token: string; newPassword: string }) => {
    await authApi.resetPassword({ token, newPassword })
  }, [])

  const sendVerificationEmail = useCallback(async () => {
    await authApi.sendVerificationEmail()
  }, [])

  const verifyEmail = useCallback(async ({ token }: { token: string }) => {
    await authApi.verifyEmail({ token })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      sendVerificationEmail,
      verifyEmail,
    }),
    [user, loading, login, register, logout, forgotPassword, resetPassword, sendVerificationEmail, verifyEmail],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

