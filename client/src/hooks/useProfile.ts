import { useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: 'customer' | 'owner' | 'admin';
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Return null profile when not authenticated
  useEffect(() => {
    setProfile(null);
    setIsLoading(false);
  }, []);

  const fetchProfile = async () => {
    // Will be implemented with proper auth system
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!profile) return { error: 'No profile found' };
      
      const response = await fetch(`/api/profiles/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: 'Failed to update profile' };
    }
  };

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