import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const loginWithEmail = async (email, password) => {
    setLoading(true)
    setUser({ email, name: 'Mock User', role: 'Tenant' })
    setLoading(false)
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    setUser({ email: 'google@mock.com', name: 'Google User', role: 'Tenant' })
    setLoading(false)
  }

  const logout = async () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    loginWithEmail,
    loginWithGoogle,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
