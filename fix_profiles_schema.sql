-- Run this SQL in your Supabase SQL Editor to fix the registration issue

-- Add organization column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS organization TEXT;

-- Update role constraint to include corporate role
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'admin', 'corporate', 'corporation_head'));

-- Update existing policies to include corporate role in admin checks
DROP POLICY IF EXISTS "Admins can view all waste data" ON public.waste_monitoring;
CREATE POLICY "Admins can view all waste data" 
ON public.waste_monitoring 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role IN ('admin', 'corporate', 'corporation_head')
  )
);

DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;
CREATE POLICY "Admins can view all feedback" 
ON public.feedback 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role IN ('admin', 'corporate', 'corporation_head')
  )
);

DROP POLICY IF EXISTS "Admins can update feedback" ON public.feedback;
CREATE POLICY "Admins can update feedback" 
ON public.feedback 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role IN ('admin', 'corporate', 'corporation_head')
  )
);