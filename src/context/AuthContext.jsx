import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_DEMO_USER = {
  id: 'artisan-ivy-maiti',
  name: 'Ivy Maiti',
  email: 'ivy.maiti.crafts@gmail.com',
  artForm: 'Traditional Artist',
  location: 'West Bengal, India',
  joinedDate: 'March 2024',
  avatar: null,
};

const STORAGE_KEY = 'kalasetu_auth_user';
const REMEMBER_KEY = 'kalasetu_remember_me';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const explicitlySignedOut = localStorage.getItem('kalasetu_signed_out') === 'true';
      if (explicitlySignedOut) {
        return null;
      }
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse auth session:', e);
    }
    // Default to the demo artisan so existing direct page links work smoothly,
    // but if the user explicitly signs out, it will be null.
    return DEFAULT_DEMO_USER;
  });

  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  // Sign In handler
  const login = async (email, password, rememberMe = true) => {
    setLoading(true);
    // Simulate network latency for authentic feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo matching: if Ivy's email or any valid email
    const userData = {
      id: email.toLowerCase().includes('ivy') ? DEFAULT_DEMO_USER.id : `artisan-${Date.now()}`,
      name: email.toLowerCase().includes('ivy') ? DEFAULT_DEMO_USER.name : email.split('@')[0],
      email: email.trim(),
      artForm: 'Traditional Artisan',
      location: 'India',
      joinedDate: 'March 2024',
      avatar: null,
    };

    try {
      localStorage.removeItem('kalasetu_signed_out');
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem(REMEMBER_KEY, 'true');
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(REMEMBER_KEY);
      }
    } catch (e) {
      console.warn('Failed to store auth session:', e);
    }

    setUser(userData);
    setLoading(false);
    return { success: true, user: userData };
  };

  // Create Account handler
  const register = async ({ name, email, password, location }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 750));

    const newUser = {
      id: `artisan-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      artForm: 'Traditional Artisan',
      location: location?.trim() || 'India',
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      avatar: null,
    };

    try {
      localStorage.removeItem('kalasetu_signed_out');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      localStorage.setItem(REMEMBER_KEY, 'true');
    } catch (e) {
      console.warn('Failed to store new user:', e);
    }

    setUser(newUser);
    setLoading(false);
    return { success: true, user: newUser };
  };

  // Sign Out handler
  const logout = () => {
    try {
      localStorage.setItem('kalasetu_signed_out', 'true');
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REMEMBER_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear auth session:', e);
    }
    setUser(null);
  };

  // One-click demo login helper
  const demoLogin = async () => {
    return login(DEFAULT_DEMO_USER.email, 'kalasetu2026', true);
  };

  // Simulated forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    return { success: true, email: email.trim() };
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    demoLogin,
    forgotPassword,
    isDemoMode: true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
