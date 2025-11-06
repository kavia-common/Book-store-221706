import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getUserStorage, setUserStorage, clearUserStorage } from '../utils/storage.js'
import { mockAuthService } from '../services/mockAuthService.js'

const UserContext = createContext(null)

// PUBLIC_INTERFACE
export function UserProvider({ children }) {
  /** Provides mock user authentication state with simple validation (no network calls). */
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getUserStorage()
    if (u) setUser(u)
  }, [])

  useEffect(() => {
    if (user) setUserStorage(user)
    else clearUserStorage()
  }, [user])

  const api = useMemo(() => {
    return {
      user,
      login: async (email, password) => {
        const u = await mockAuthService.login(email, password)
        setUser(u)
        return u
      },
      register: async (payload) => {
        const u = await mockAuthService.register(payload)
        setUser(u)
        return u
      },
      logout: () => setUser(null),
      updateProfileLocal: (updates) => setUser(prev => ({ ...(prev || {}), ...updates }))
    }
  }, [user])

  return <UserContext.Provider value={api}>{children}</UserContext.Provider>
}

// PUBLIC_INTERFACE
export function useUser() {
  /** Hook to access mock user state and operations. */
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within a UserProvider')
  return ctx
}
