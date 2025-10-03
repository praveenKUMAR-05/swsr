-- Update profiles table to support corporate role and organization field
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS check_role;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS organization TEXT;

ALTER TABLE public.profiles 
ADD CONSTRAINT check_role 
CHECK (role IN ('user', 'admin', 'corporate', 'corporation_head'));

-- Update existing policies to include corporate role
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