import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateAvatar: (avatarUrl: string) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
  isLogoutModalOpen: boolean;
  setLogoutModalOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    // Check for saved token and user on mount
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAvatar, isAuthModalOpen, setAuthModalOpen, isLogoutModalOpen, setLogoutModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
