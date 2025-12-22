
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { users, addUser } from '@/lib/data';

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
    const storedUser = localStorage.getItem('bookbuddy-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    // In a real app, you would verify the password against a hashed version in the database.
    // For this mock, we'll compare plaintext passwords.
    const foundUser = users.find(u => u.email === email && u.password === pass);
    if (foundUser) {
      const userToStore = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userToStore);
      localStorage.setItem('bookbuddy-user', JSON.stringify(userToStore));
      setLoading(false);
      return userToStore;
    }
    setLoading(false);
    throw new Error("Invalid email or password.");
  };

  const signup = async (name: string, email: string, pass: string): Promise<User | null> => {
    setLoading(true);
     if (users.some(u => u.email === email)) {
        setLoading(false);
        throw new Error("An account with this email already exists.");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: pass,
    };
    addUser(newUser); 
    const userToStore = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userToStore);
    localStorage.setItem('bookbuddy-user', JSON.stringify(userToStore));
    setLoading(false);
    return userToStore;
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
