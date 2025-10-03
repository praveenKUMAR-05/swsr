import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useProfile } from './useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  title: string;
  report_type: 'waste_analytics' | 'compliance' | 'performance' | 'financial' | 'environmental';
  data: any;
  period_start?: string;
  period_end?: string;
  generated_by: string;
  area_filter?: string;
  created_at: string;
}

export const useReports = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && (profile?.role === 'admin' || profile?.role === 'corporation_head')) {
      fetchReports();
    } else {
      setReports([]);
      setLoading(false);
    }
  }, [user, profile]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
      } else {
        setReports(data as Report[] || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateWasteAnalyticsReport = async (
    periodStart: string,
    periodEnd: string,
    areaFilter?: string
  ) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      // Fetch waste data for the period
      let wasteQuery = supabase
        .from('waste_monitoring')
        .select('*')
        .gte('date', periodStart)
        .lte('date', periodEnd);

      const { data: wasteData, error: wasteError } = await wasteQuery;
      
      if (wasteError) throw wasteError;

      // Calculate analytics
      const analytics = {
        totalWaste: wasteData?.reduce((sum, entry) => 
          sum + (entry.organic_waste || 0) + (entry.recyclable_waste || 0) + 
          (entry.general_waste || 0) + (entry.hazardous_waste || 0), 0) || 0,
        organicWaste: wasteData?.reduce((sum, entry) => sum + (entry.organic_waste || 0), 0) || 0,
        recyclableWaste: wasteData?.reduce((sum, entry) => sum + (entry.recyclable_waste || 0), 0) || 0,
        generalWaste: wasteData?.reduce((sum, entry) => sum + (entry.general_waste || 0), 0) || 0,
        hazardousWaste: wasteData?.reduce((sum, entry) => sum + (entry.hazardous_waste || 0), 0) || 0,
        totalEcoPoints: wasteData?.reduce((sum, entry) => sum + (entry.eco_points || 0), 0) || 0,
        householdCount: new Set(wasteData?.map(entry => entry.user_id)).size,
        averageWastePerHousehold: 0,
        recyclingRate: 0,
        period: { start: periodStart, end: periodEnd },
        generatedAt: new Date().toISOString()
      };

      analytics.averageWastePerHousehold = analytics.householdCount > 0 
        ? analytics.totalWaste / analytics.householdCount : 0;
      analytics.recyclingRate = analytics.totalWaste > 0 
        ? ((analytics.organicWaste + analytics.recyclableWaste) / analytics.totalWaste) * 100 : 0;

      return createReport({
        title: `Waste Analytics Report (${periodStart} to ${periodEnd})`,
        report_type: 'waste_analytics',
        data: analytics,
        period_start: periodStart,
        period_end: periodEnd,
        area_filter: areaFilter
      });
    } catch (error) {
      console.error('Error generating waste analytics report:', error);
      return { error };
    }
  };

  const generateComplianceReport = async (
    periodStart: string,
    periodEnd: string,
    areaFilter?: string
  ) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      // Fetch complaints and feedback data
      const [complaintsResult, feedbackResult] = await Promise.all([
        supabase.from('complaints').select('*')
          .gte('created_at', periodStart)
          .lte('created_at', periodEnd),
        supabase.from('feedback').select('*')
          .gte('created_at', periodStart)
          .lte('created_at', periodEnd)
      ]);

      const complaints = complaintsResult.data || [];
      const feedback = feedbackResult.data || [];

      const compliance = {
        totalComplaints: complaints.length,
        resolvedComplaints: complaints.filter(c => c.status === 'resolved').length,
        pendingComplaints: complaints.filter(c => c.status === 'pending').length,
        escalatedComplaints: complaints.filter(c => c.status === 'escalated').length,
        averageResolutionTime: 0,
        satisfactionScore: 0,
        totalFeedback: feedback.length,
        resolvedFeedback: feedback.filter(f => f.status === 'resolved').length,
        period: { start: periodStart, end: periodEnd },
        generatedAt: new Date().toISOString()
      };

      compliance.satisfactionScore = feedback.length > 0 
        ? (feedback.filter(f => f.status === 'resolved').length / feedback.length) * 100 : 100;

      return createReport({
        title: `Compliance Report (${periodStart} to ${periodEnd})`,
        report_type: 'compliance',
        data: compliance,
        period_start: periodStart,
        period_end: periodEnd,
        area_filter: areaFilter
      });
    } catch (error) {
      console.error('Error generating compliance report:', error);
      return { error };
    }
  };

  const createReport = async (reportData: {
    title: string;
    report_type: string;
    data: any;
    period_start?: string;
    period_end?: string;
    area_filter?: string;
  }) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('reports')
        .insert({
          ...reportData,
          generated_by: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating report:', error);
        return { error };
      } else {
        setReports(prev => [data as Report, ...prev]);
        toast({
          title: "Report Generated",
          description: "Report has been generated successfully.",
        });
        return { data, error: null };
      }
    } catch (error) {
      console.error('Error creating report:', error);
      return { error };
    }
  };

  const deleteReport = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting report:', error);
        return { error };
      } else {
        setReports(prev => prev.filter(report => report.id !== id));
        toast({
          title: "Report Deleted",
          description: "Report has been deleted successfully.",
        });
        return { error: null };
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      return { error };
    }
  };

  return {
    reports,
    loading,
    createReport,
    generateWasteAnalyticsReport,
    generateComplianceReport,
    deleteReport,
    refetch: fetchReports
  };
};