"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch, setAuthToken, getAuthToken } from "@/utils/api";

export interface User {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email: string | null;
  is_admin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we have a stored token and fetch the user profile
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchMe(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMe = async (token?: string | null) => {
    try {
      const res = await apiFetch("auth/me", token ? { token } : {});
      const data: User = await res.json();
      setUser(data);
    } catch {
      // Token is invalid or expired — clear it
      setAuthToken(null);
      setUser(null);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await apiFetch("auth/token", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setAuthToken(data.access_token);
    // Now fetch the user profile with the new token
    await fetchMe(data.access_token);
    console.log("TOKEN SAVED:", data.access_token);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    await fetchMe();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
