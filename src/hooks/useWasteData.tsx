import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface WasteData {
  id: string;
  user_id: string;
  date: string;
  organic_waste: number;
  recyclable_waste: number;
  hazardous_waste: number;
  general_waste: number;
  eco_points: number;
  created_at: string;
}

export const useWasteData = () => {
  const { user } = useAuth();
  const [wasteData, setWasteData] = useState<WasteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWasteData();
    } else {
      setWasteData([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWasteData = async () => {
    try {
      const { data, error } = await supabase
        .from('waste_monitoring')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching waste data:', error);
        // Create some initial data if none exists
        await createSampleData();
      } else {
        setWasteData(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleData = async () => {
    if (!user) return;

    const sampleData = [
      {
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        organic_waste: 2.5,
        recyclable_waste: 1.8,
        hazardous_waste: 0.3,
        general_waste: 1.2,
        eco_points: 50
      },
      {
        user_id: user.id,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        organic_waste: 3.1,
        recyclable_waste: 2.2,
        hazardous_waste: 0.1,
        general_waste: 0.8,
        eco_points: 60
      }
    ];

    try {
      const { data, error } = await supabase
        .from('waste_monitoring')
        .insert(sampleData)
        .select();

      if (!error && data) {
        setWasteData(data);
      }
    } catch (error) {
      console.error('Error creating sample data:', error);
    }
  };

  const addWasteEntry = async (wasteEntry: Omit<WasteData, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('waste_monitoring')
        .insert({
          ...wasteEntry,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding waste entry:', error);
        return { error };
      } else {
        setWasteData(prev => [data, ...prev]);
        return { error: null };
      }
    } catch (error) {
      console.error('Error adding waste entry:', error);
      return { error };
    }
  };

  // Calculate total stats
  const totalStats = wasteData.reduce(
    (acc, entry) => ({
      totalWaste: acc.totalWaste + entry.organic_waste + entry.recyclable_waste + entry.hazardous_waste + entry.general_waste,
      recycled: acc.recycled + entry.organic_waste + entry.recyclable_waste,
      totalPoints: acc.totalPoints + entry.eco_points,
    }),
    { totalWaste: 0, recycled: 0, totalPoints: 0 }
  );

  return {
    wasteData,
    loading,
    addWasteEntry,
    refetch: fetchWasteData,
    totalStats
  };
};