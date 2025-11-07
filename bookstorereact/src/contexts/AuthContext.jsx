import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Provides authentication state and actions to children.
 */
export function AuthProvider({ children }) {
  /** Auth provider handles login, logout, register, and fetching current user. */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current session user on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await api.me();
        if (!cancelled) setUser(me?.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = async (username, password) => {
    const data = await api.login({ username, password });
    setUser(data?.user ?? null);
    return data;
  };

  const register = async (payload) => {
    const data = await api.register(payload);
    setUser(data?.user ?? null);
    return data;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout, setUser }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth context. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
