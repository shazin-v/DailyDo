"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContextType, User } from "@/types/task";

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: true,
});

// Mock user database (in real app, this would be a server-side database)
const mockUsers: Record<
  string,
  { id: string; name: string; email: string; password: string }
> = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check if user is logged in via cookies
  useEffect(() => {
    const storedUser = Cookies.get("dailydo-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from cookie:", error);
        Cookies.remove("dailydo-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user in our mock database
    const foundUser = Object.values(mockUsers).find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);

      // Store in cookies (expires in 7 days)
      Cookies.set("dailydo-user", JSON.stringify(userWithoutPassword), {
        expires: 7,
      });
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    if (Object.values(mockUsers).some((u) => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    // Add to mock database
    mockUsers[newUser.id] = newUser;

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);

    // Store in cookies
    Cookies.set("dailydo-user", JSON.stringify(userWithoutPassword), {
      expires: 7,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("dailydo-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
