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
    // Start with no user logged in
    setUser(null);
    setSession(null);
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: string = 'customer') => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const userExists = existingUsers.find((u: any) => u.email === email);
    
    if (userExists) {
      return { error: { message: 'User already exists with this email. Please sign in instead.' } };
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      fullName,
      role,
    };
    
    // Store in localStorage
    existingUsers.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(existingUsers));

    const mockUser: User = {
      id: newUser.id,
      email,
      user_metadata: {
        full_name: fullName,
        role: role,
      }
    };
    
    const mockSession: Session = {
      user: mockUser,
      access_token: 'mock-token'
    };

    setUser(mockUser);
    setSession(mockSession);
    console.log('Mock signup successful:', { email, fullName, role });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Check if user exists in localStorage (simple mock storage)
    const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const user = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      return { error: { message: 'Invalid email or password. Please sign up first.' } };
    }

    const mockUser: User = {
      id: user.id,
      email: user.email,
      user_metadata: {
        full_name: user.fullName,
        role: user.role,
      }
    };
    
    const mockSession: Session = {
      user: mockUser,
      access_token: 'mock-token'
    };

    setUser(mockUser);
    setSession(mockSession);
    console.log('Mock signin successful:', { email });
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    console.log('Mock signout successful');
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