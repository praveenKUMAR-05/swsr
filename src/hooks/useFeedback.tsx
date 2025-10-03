import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Feedback {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  admin_response: string | null;
  created_at: string;
  updated_at: string;
}

export const useFeedback = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFeedback();
    } else {
      setFeedback([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
      } else {
        setFeedback(data as Feedback[] || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (subject: string, description: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          subject,
          description
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting feedback:', error);
        return { error };
      } else {
        setFeedback(prev => [data as Feedback, ...prev]);
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback! We'll review it shortly.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return { error };
    }
  };

  return {
    feedback,
    loading,
    submitFeedback,
    refetch: fetchFeedback
  };
};