import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URL, bookingAPI } from './api';

// ============ TYPES ============

export type User = {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signup: (email: string, password: string, fullName: string, phone: string) => Promise<{confirmationEmailSent: boolean}>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  clearError: () => void;
};

// ============ CONTEXT ============

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============ STORAGE KEYS ============

const STORAGE_KEY = 'alba_user';
const TOKEN_KEY = 'alba_token';

// ============ PROVIDER COMPONENT ============

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error('Failed to restore session:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ AUTH FUNCTIONS ============

  const signup = useCallback(
    async (email: string, password: string, fullName: string, phone: string): Promise<{confirmationEmailSent: boolean}> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            fullName: fullName.trim(),
            phone: phone.trim(),
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(data.error || `Signup failed with status ${response.status}`);
        }

        const data = await response.json();
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        return {confirmationEmailSent: Boolean(data.confirmationEmailSent)};
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Signup failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(data.error || `Login failed with status ${response.status}`);
        }

        const data = await response.json();
        const newUser: User = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          phone: data.user.phone || null,
        };

        // Store user and token
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
        }

        setUser(newUser);
        return newUser;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call backend to invalidate session if token exists
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          await bookingAPI.logoutUser().catch(() => {
            // Ignore logout API errors, still clear local state
          });
        } catch (err) {
          console.error('Logout API call failed:', err);
        }
      }

      // Clear local storage
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.clear();

      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear state even if API call fails
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ============ CONTEXT VALUE ============

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    error,
    signup,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============ HOOK ============

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

// ============ PROTECTED ROUTE COMPONENT ============

export function ProtectedRoute({
  children,
  redirectTo = '/login',
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto mb-4"></div>
          <p className="text-white/60">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = redirectTo;
    return null;
  }

  return <>{children}</>;
}
