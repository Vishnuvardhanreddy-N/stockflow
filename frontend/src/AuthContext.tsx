import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from './api';

interface User { id: string; email: string; orgId: string; orgName: string; }
interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, orgName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const u = localStorage.getItem('sf_user');
    return u ? JSON.parse(u) : null;
  });

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('sf_token', data.data.access_token);
    localStorage.setItem('sf_user', JSON.stringify(data.data.user));
    setUser(data.data.user);
  };

  const signup = async (email: string, password: string, orgName: string) => {
    const { data } = await api.post('/auth/signup', { email, password, orgName });
    localStorage.setItem('sf_token', data.data.access_token);
    localStorage.setItem('sf_user', JSON.stringify(data.data.user));
    setUser(data.data.user);
  };

  const logout = () => {
    localStorage.removeItem('sf_token');
    localStorage.removeItem('sf_user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
