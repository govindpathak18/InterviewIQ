import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const demoUser = {
  id: 'usr-001',
  fullName: 'Alex Morgan',
  email: 'alex@interviewiq.ai',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setUser({ ...demoUser, email });
  };

  const register = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser({ ...demoUser, fullName: payload.fullName, email: payload.email });
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
