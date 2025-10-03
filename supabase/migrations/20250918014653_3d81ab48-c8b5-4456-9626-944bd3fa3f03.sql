-- Create complaints table for tracking user complaints
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  house_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  complaint_type TEXT NOT NULL DEFAULT 'general',
  location TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  assigned_to_admin UUID,
  assigned_to_worker TEXT,
  admin_response TEXT,
  resolution_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Users can create their own complaints
CREATE POLICY "Users can create their own complaints" 
ON public.complaints 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can view their own complaints
CREATE POLICY "Users can view their own complaints" 
ON public.complaints 
FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can view all complaints
CREATE POLICY "Admins can view all complaints" 
ON public.complaints 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'corporation_head')
));

-- Admins can update complaints
CREATE POLICY "Admins can update complaints" 
ON public.complaints 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'corporation_head')
));

-- Add trigger for updated_at
CREATE TRIGGER update_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create government_schemes table
CREATE TABLE public.government_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  scheme_type TEXT NOT NULL DEFAULT 'waste_management',
  status TEXT NOT NULL DEFAULT 'active',
  target_area TEXT,
  start_date DATE,
  end_date DATE,
  budget_allocated DECIMAL(12, 2),
  budget_utilized DECIMAL(12, 2) DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;

-- All authenticated users can view schemes
CREATE POLICY "Users can view government schemes" 
ON public.government_schemes 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Only admins and corporation heads can create/update schemes
CREATE POLICY "Admins can manage government schemes" 
ON public.government_schemes 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'corporation_head')
));

-- Add trigger for updated_at
CREATE TRIGGER update_government_schemes_updated_at
BEFORE UPDATE ON public.government_schemes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create reports table for generating various reports
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL,
  data JSONB NOT NULL,
  period_start DATE,
  period_end DATE,
  generated_by UUID NOT NULL,
  area_filter TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Only admins and corporation heads can access reports
CREATE POLICY "Admins can manage reports" 
ON public.reports 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'corporation_head')
));

-- Update profiles table to include corporation_head role
ALTER TABLE public.profiles 
ADD CONSTRAINT check_role 
CHECK (role IN ('user', 'admin', 'corporation_head'));

-- Update feedback table to allow admins to update admin_response
UPDATE public.feedback SET status = 'pending' WHERE status IS NULL;