-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  house_id TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  government_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create waste monitoring table
CREATE TABLE public.waste_monitoring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  organic_waste DECIMAL(10,2) DEFAULT 0,
  recyclable_waste DECIMAL(10,2) DEFAULT 0,
  hazardous_waste DECIMAL(10,2) DEFAULT 0,
  general_waste DECIMAL(10,2) DEFAULT 0,
  eco_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  admin_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for waste monitoring
CREATE POLICY "Users can view their own waste data" 
ON public.waste_monitoring 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own waste data" 
ON public.waste_monitoring 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all waste data" 
ON public.waste_monitoring 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create policies for feedback
CREATE POLICY "Users can view their own feedback" 
ON public.feedback 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback" 
ON public.feedback 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update feedback" 
ON public.feedback 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create policies for rewards
CREATE POLICY "Users can view their own rewards" 
ON public.rewards 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rewards" 
ON public.rewards 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at
BEFORE UPDATE ON public.feedback
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();