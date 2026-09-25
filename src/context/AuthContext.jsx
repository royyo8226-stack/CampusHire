// src/context/AuthContext.jsx
// -----------------------------------------------------------------------------
// Handles mock authentication and exposes auth state to the whole app.
// -----------------------------------------------------------------------------
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, setAuth, clearAuth } from '../utils/storage';

// Hardcoded demo credentials (mock authentication — no backend).
const DEMO_USER = { studentId: 'student123', password: '123456' };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // avoids redirect flicker on load

  // Restore any existing session from localStorage on first render.
  useEffect(() => {
    const saved = getAuth();
    if (saved) setUser(saved);
    setReady(true);
  }, []);

  // Attempt login with mock credentials. Returns { ok, message }.
  const login = ({ studentId, password, remember }) => {
    if (studentId === DEMO_USER.studentId && password === DEMO_USER.password) {
      const session = { studentId, remember: !!remember, loginAt: Date.now() };
      setUser(session);
      setAuth(session);
      return { ok: true };
    }
    return { ok: false, message: 'Invalid Student ID or password.' };
  };

  const logout = () => {
    setUser(null);
    clearAuth();
  };

  const value = { user, isAuthenticated: !!user, ready, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Convenience hook so components don't import useContext + AuthContext everywhere.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
