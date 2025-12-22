
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
      { id: 'user-1', name: 'John Doe', email: 'john@example.com', password: 'password123', avatarUrl: '' },
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
  updateUser: (data: { name: string; avatarUrl?: string }) => Promise<void>;
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
      const { password, ...userToStore } = foundUser;
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
      avatarUrl: ''
    };
    
    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);
    
    const { password, ...userToStore } = newUser;
    setUser(userToStore);
    localStorage.setItem('bookbuddy-user', JSON.stringify(userToStore));
    setLoading(false);
    return userToStore;
  };
  
  const updateUser = async (data: { name: string; avatarUrl?: string }): Promise<void> => {
    if (!user) throw new Error("You must be logged in to update your profile.");

    return new Promise((resolve) => {
        setTimeout(() => {
            const users = getUsersFromStorage();
            const userIndex = users.findIndex(u => u.id === user.id);

            if (userIndex !== -1) {
                const updatedUser = { ...users[userIndex], ...data };
                users[userIndex] = updatedUser;
                saveUsersToStorage(users);
                
                const { password, ...userToStore } = updatedUser;
                setUser(userToStore);
                localStorage.setItem('bookbuddy-user', JSON.stringify(userToStore));
            }
            resolve();
        }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookbuddy-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
