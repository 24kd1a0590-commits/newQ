import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types/auth';
import { MOCK_PATIENT_USER, MOCK_HOSPITAL_USER } from '../constants/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  loginAsPatient: () => void;
  loginAsHospital: () => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(MOCK_PATIENT_USER);
  const [role, setRoleState] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isSupabaseConfigured) {
      setIsLoading(true);
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'MEDIQ User',
            role: (session.user.user_metadata?.role as UserRole) || 'patient',
            createdAt: session.user.created_at,
          });
          setRoleState((session.user.user_metadata?.role as UserRole) || 'patient');
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const userRole = (session.user.user_metadata?.role as UserRole) || 'patient';
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'MEDIQ User',
            role: userRole,
            createdAt: session.user.created_at,
          });
          setRoleState(userRole);
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const loginAsPatient = () => {
    setUser(MOCK_PATIENT_USER);
    setRoleState('patient');
  };

  const loginAsHospital = () => {
    setUser(MOCK_HOSPITAL_USER);
    setRoleState('hospital');
  };

  const logout = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
    setUser(null);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'hospital') {
      setUser(MOCK_HOSPITAL_USER);
    } else {
      setUser(MOCK_PATIENT_USER);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        isSupabaseConnected: isSupabaseConfigured,
        loginAsPatient,
        loginAsHospital,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
