
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    // This will be replaced with Supabase Auth session check
    const checkUser = () => {
      const savedUser = localStorage.getItem('flirtSync_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    
    checkUser();
  }, []);

  // Auth functions (to be replaced with Supabase Auth)
  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Sign up:', { email, password, name });
      // Mock user creation
      const newUser = { 
        id: Math.random().toString(36).substr(2, 9), 
        email, 
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` 
      };
      localStorage.setItem('flirtSync_user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Account created!",
        description: "Welcome to FlirtSync!",
      });
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Sign in:', { email, password });
      // Mock authentication
      const mockUser = { 
        id: Math.random().toString(36).substr(2, 9), 
        email, 
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` 
      };
      localStorage.setItem('flirtSync_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Signed in!",
        description: "Welcome back to FlirtSync!",
      });
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('flirtSync_user');
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Reset password for:', email);
      // This will be implemented with Supabase Auth
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions",
      });
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error("Not authenticated");
      
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('flirtSync_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      console.error('Update profile error:', error);
      toast({
        title: "Profile update failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
