import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Complaint {
  id: string;
  user_id: string;
  house_id: string;
  subject: string;
  description: string;
  complaint_type: string;
  location?: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to_admin?: string;
  assigned_to_worker?: string;
  admin_response?: string;
  resolution_details?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export const useComplaints = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchComplaints();
    } else {
      setComplaints([]);
      setLoading(false);
    }
  }, [user, profile]);

  const fetchComplaints = async () => {
    try {
      let query = supabase.from('complaints').select('*');
      
      // If user is regular user, only show their complaints
      if (profile?.role === 'user') {
        query = query.eq('user_id', user?.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching complaints:', error);
      } else {
        setComplaints(data as Complaint[] || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitComplaint = async (complaintData: {
    subject: string;
    description: string;
    complaint_type: string;
    location?: string;
    priority?: string;
  }) => {
    if (!user || !profile) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('complaints')
        .insert({
          ...complaintData,
          user_id: user.id,
          house_id: profile.house_id || '',
          priority: complaintData.priority || 'medium'
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting complaint:', error);
        return { error };
      } else {
        setComplaints(prev => [data as Complaint, ...prev]);
        toast({
          title: "Complaint Submitted",
          description: "Your complaint has been submitted successfully. We'll review it shortly.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      return { error };
    }
  };

  const updateComplaint = async (id: string, updates: Partial<Complaint>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('complaints')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating complaint:', error);
        return { error };
      } else {
        setComplaints(prev => 
          prev.map(complaint => 
            complaint.id === id ? data as Complaint : complaint
          )
        );
        toast({
          title: "Complaint Updated",
          description: "The complaint has been updated successfully.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
      return { error };
    }
  };

  const escalateComplaint = async (id: string) => {
    return updateComplaint(id, { 
      status: 'escalated',
      priority: 'high'
    });
  };

  return {
    complaints,
    loading,
    submitComplaint,
    updateComplaint,
    escalateComplaint,
    refetch: fetchComplaints
  };
};