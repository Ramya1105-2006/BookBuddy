"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { users } from '@/lib/data';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  signup: (name: string, email: string, pass: string) => Promise<User | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a mock auth state persistence.
    // In a real app, you'd check localStorage, a cookie, or an auth service.
    const storedUser = localStorage.getItem('bookbuddy-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    // This is a mock login.
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      // In a real app, you would verify the password here.
      // For this mock, we'll just accept any password for a known email.
      setUser(foundUser);
      localStorage.setItem('bookbuddy-user', JSON.stringify(foundUser));
      setLoading(false);
      return foundUser;
    }
    setLoading(false);
    throw new Error("Invalid email or password.");
  };

  const signup = async (name: string, email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    // This is a mock signup.
     if (users.some(u => u.email === email)) {
        setLoading(false);
        throw new Error("An account with this email already exists.");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
    };
    users.push(newUser); // In a real app, you would save this to your database.
    setUser(newUser);
    localStorage.setItem('bookbuddy-user', JSON.stringify(newUser));
    setLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookbuddy-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
