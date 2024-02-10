// authContext.ts
import { createContext, useContext, useState, ReactNode } from 'react';
import * as React from 'react';
import { useCustomCookie } from './lib/cookie';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => sessionStorage.getItem('isAuthenticated') === 'true');
  const { get,clear } = useCustomCookie();

  const login = () => {
    // Implement your authentication logic and set isAuthenticated to true
    setAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    // Implement your logout logic and set isAuthenticated to false
    sessionStorage.clear();
    clear();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
