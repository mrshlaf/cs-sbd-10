"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { loginUser, registerUser, type User, type LoginInput, type RegisterInput } from "./api";

/* ── Types ─────────────────────────────────── */

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

/* ── Storage Keys ──────────────────────────── */
const TOKEN_KEY = "marshal_token";
const USER_KEY = "marshal_user";

/* ── Provider ──────────────────────────────── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Corrupted storage — clear it
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    // Normalize email for consistency
    const normalizedInput = { ...input, email: input.email.toLowerCase().trim() };
    const res = await loginUser(normalizedInput);
    const { token: jwt, user: userData } = res.payload;

    localStorage.setItem(TOKEN_KEY, jwt);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    // Normalize email for consistency
    const normalizedInput = { ...input, email: input.email.toLowerCase().trim() };
    await registerUser(normalizedInput);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user?.email) return;
    try {
      const { fetchUserByEmail } = await import("./api");
      const res = await fetchUserByEmail(user.email);
      const userData = res.payload;
      
      // Safety guard: only update if we got valid data back
      if (userData && userData.email) {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to refresh user", error);
      // Don't logout on refresh error, just keep current state
    }
  }, [user?.email]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────── */

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
