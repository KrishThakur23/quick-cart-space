import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
  };
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user for demo purposes
    const mockUser: User = {
      id: 'mock-user-id',
      email: 'demo@example.com',
      user_metadata: {
        full_name: 'Demo User',
        role: 'owner',
      }
    };
    
    const mockSession: Session = {
      user: mockUser,
      access_token: 'mock-token'
    };

    setUser(mockUser);
    setSession(mockSession);
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: string = 'customer') => {
    // Mock signup - in a real app, this would create an account
    console.log('Mock signup:', { email, fullName, role });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Mock signin - in a real app, this would authenticate
    console.log('Mock signin:', { email });
    return { error: null };
  };

  const signOut = async () => {
    // Mock signout - in a real app, this would clear session
    setUser(null);
    setSession(null);
    console.log('Mock signout');
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};