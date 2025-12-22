
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';

// Helper functions to manage users in localStorage
const getUsersFromStorage = (): User[] => {
  if (typeof window === 'undefined') return [];
  try {
    const storedUsers = localStorage.getItem('bookbuddy-users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // Seed with initial user if none exist
    const initialUsers: User[] = [
      { id: 'user-1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
    ];
    localStorage.setItem('bookbuddy-users', JSON.stringify(initialUsers));
    return initialUsers;
  } catch (error) {
    console.error("Failed to read users from localStorage", error);
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('bookbuddy-users', JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save users to localStorage", error);
  }
};

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
    // Initialize users in storage if not already there
    getUsersFromStorage(); 
    
    const storedUser = localStorage.getItem('bookbuddy-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    const users = getUsersFromStorage();
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
    const users = getUsersFromStorage();
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
    
    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);
    
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
