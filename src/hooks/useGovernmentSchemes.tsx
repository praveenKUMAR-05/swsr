import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  scheme_type: string;
  status: 'active' | 'planned' | 'completed' | 'cancelled';
  target_area?: string;
  start_date?: string;
  end_date?: string;
  budget_allocated?: number;
  budget_utilized?: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useGovernmentSchemes = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSchemes();
    } else {
      setSchemes([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSchemes = async () => {
    try {
      const { data, error } = await supabase
        .from('government_schemes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching government schemes:', error);
      } else {
        setSchemes(data as GovernmentScheme[] || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createScheme = async (schemeData: {
    title: string;
    description: string;
    scheme_type?: string;
    status?: string;
    target_area?: string;
    start_date?: string;
    end_date?: string;
    budget_allocated?: number;
  }) => {
    if (!user) return { error: 'User not authenticated' };
    if (profile?.role !== 'admin' && profile?.role !== 'corporation_head') {
      return { error: 'Insufficient permissions' };
    }

    try {
      const { data, error } = await supabase
        .from('government_schemes')
        .insert({
          ...schemeData,
          created_by: user.id,
          scheme_type: schemeData.scheme_type || 'waste_management',
          status: schemeData.status || 'active'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating scheme:', error);
        return { error };
      } else {
        setSchemes(prev => [data as GovernmentScheme, ...prev]);
        toast({
          title: "Scheme Created",
          description: "Government scheme has been created successfully.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error creating scheme:', error);
      return { error };
    }
  };

  const updateScheme = async (id: string, updates: Partial<GovernmentScheme>) => {
    if (!user) return { error: 'User not authenticated' };
    if (profile?.role !== 'admin' && profile?.role !== 'corporation_head') {
      return { error: 'Insufficient permissions' };
    }

    try {
      const { data, error } = await supabase
        .from('government_schemes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating scheme:', error);
        return { error };
      } else {
        setSchemes(prev => 
          prev.map(scheme => 
            scheme.id === id ? data as GovernmentScheme : scheme
          )
        );
        toast({
          title: "Scheme Updated",
          description: "Government scheme has been updated successfully.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error updating scheme:', error);
      return { error };
    }
  };

  const deleteScheme = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };
    if (profile?.role !== 'admin' && profile?.role !== 'corporation_head') {
      return { error: 'Insufficient permissions' };
    }

    try {
      const { error } = await supabase
        .from('government_schemes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting scheme:', error);
        return { error };
      } else {
        setSchemes(prev => prev.filter(scheme => scheme.id !== id));
        toast({
          title: "Scheme Deleted",
          description: "Government scheme has been deleted successfully.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error deleting scheme:', error);
      return { error };
    }
  };

  return {
    schemes,
    loading,
    createScheme,
    updateScheme,
    deleteScheme,
    refetch: fetchSchemes
  };
};