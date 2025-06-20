/*
  # Add user roles system

  1. New Tables
    - Update `profiles` table to include role field
    - Add role-based access control

  2. Security
    - Add RLS policies for role-based access
    - Ensure users can only access appropriate interfaces

  3. Changes
    - Add role column to profiles table
    - Set default role as 'customer'
    - Add admin/owner role capabilities
*/

-- Add role column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'customer' CHECK (role IN ('customer', 'owner', 'admin'));
  END IF;
END $$;

-- Update existing profiles to have customer role by default
UPDATE public.profiles SET role = 'customer' WHERE role IS NULL;

-- Create function to automatically create profile with role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'customer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add RLS policy for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);