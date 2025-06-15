import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isUserAllowed, signInWithGoogle, signInWithFacebook, signInWithEmail, signUpWithEmail } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAllowed: boolean;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAllowed: false,
  signOut: async () => {},
  signInWithProvider: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  // Check if user has Stripe customer record
  const checkStripeCustomer = async (userId: string) => {
    try {
      const { data: customer } = await supabase
        .from('customers')
        .select('stripe_customer_id')
        .eq('id', userId)
        .single();
      
      // Customer will be created when they first attempt to purchase
      return customer?.stripe_customer_id;
    } catch (error) {
      console.error('Error checking Stripe customer:', error);
      return null;
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is allowed to access the system
      if (session?.user) {
        const allowed = isUserAllowed(session.user.email);
        setIsAllowed(allowed);
        
        // If user is not allowed, sign them out immediately
        if (!allowed) {
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
        } else {
          // Check for Stripe customer if user is allowed
          await checkStripeCustomer(session.user.id);
        }
      } else {
        setIsAllowed(false);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const allowed = isUserAllowed(session.user.email);
        setIsAllowed(allowed);
        
        // If user is not allowed, sign them out immediately
        if (!allowed) {
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
          setIsAllowed(false);
        } else if (_event === 'SIGNED_IN') {
          // Check for Stripe customer on auth state change if user is allowed
          await checkStripeCustomer(session.user.id);
        }
      } else {
        setIsAllowed(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAllowed(false);
  };

  const handleSignInWithProvider = async (provider: 'google' | 'facebook') => {
    if (provider === 'google') {
      await signInWithGoogle();
    } else {
      await signInWithFacebook();
    }
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmail(email, password);
    if (result.error) {
      throw result.error;
    }
  };

  const handleSignUpWithEmail = async (email: string, password: string) => {
    const result = await signUpWithEmail(email, password);
    if (result.error) {
      throw result.error;
    }
  };

  const value = {
    user,
    session,
    loading,
    isAllowed,
    signOut: handleSignOut,
    signInWithProvider: handleSignInWithProvider,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};