import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Demo credentials - In production, use proper backend authentication
const DEMO_CREDENTIALS = [
  { email: 'admin@greencab.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { email: 'staff@greencab.com', password: 'staff123', name: 'Staff User', role: 'staff' as const },
];

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const validUser = DEMO_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (validUser) {
      const adminUser: AdminUser = {
        email: validUser.email,
        name: validUser.name,
        role: validUser.role,
      };
      setUser(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
