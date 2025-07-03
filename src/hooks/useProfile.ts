
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role?: 'customer' | 'owner' | 'admin';
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      setError('Failed to fetch profile');
      console.error('Error fetching profile:', fetchError);
    } else {
      // Add default role if not present
      const profileWithRole = {
        ...data,
        role: data.role || 'customer'
      };
      setProfile(profileWithRole);
    }
    
    setIsLoading(false);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return { error: error.message };
    }

    await fetchProfile();
    return { error: null };
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { 
    profile, 
    isLoading, 
    error, 
    refetch: fetchProfile, 
    updateProfile,
    isOwner: profile?.role === 'owner' || profile?.role === 'admin',
    isAdmin: profile?.role === 'admin'
  };
};
