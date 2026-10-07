import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Appointment {
  id: string;
  contact_submission_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  service_type: string;
  message: string | null;
  submitted_at: string;
  status: 'pending' | 'accepted' | 'declined' | 'ongoing' | 'completed';
  scheduled_at: string | null;
  decline_reason: string | null;
  notes: string | null;
  completed_at: string | null;
  created_by_user_id: string | null;
  acted_by_user_id: string | null;
  created_at: string;
  updated_at: string;
  form_type: string;
  acted_by_profile?: {
    first_name: string;
    last_name: string;
  } | null;
}

export function useAppointments(statusFilter?: string[]) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .eq('form_type', 'consultation');
      
      if (statusFilter && statusFilter.length > 0) {
        query = query.in('status', statusFilter);
      }

      const { data, error } = await query.order('submitted_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles for acted_by_user_ids
      const userIds = [...new Set(data.map(a => a.acted_by_user_id).filter((id): id is string => !!id))];
      let profilesMap: Record<string, { first_name: string; last_name: string }> = {};
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, first_name, last_name')
          .in('user_id', userIds);
        
        if (profiles) {
          profilesMap = profiles.reduce((acc, p) => {
            acc[p.user_id] = { first_name: p.first_name, last_name: p.last_name };
            return acc;
          }, {} as Record<string, { first_name: string; last_name: string }>);
        }
      }

      const appointmentsWithProfiles = data.map(a => ({
        ...a,
        acted_by_profile: a.acted_by_user_id ? profilesMap[a.acted_by_user_id] || null : null,
      }));

      setAppointments(appointmentsWithProfiles as Appointment[]);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load appointments',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchAppointments();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to update appointment',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };

  const acceptAppointment = async (id: string, userId: string) => {
    const result = await updateAppointment(id, {
      status: 'accepted',
      acted_by_user_id: userId,
    } as any);
    if (result.success) {
      toast({
        title: 'Appointment Accepted',
        description: 'The appointment has been accepted.',
      });
    }
    return result;
  };

  const declineAppointment = async (id: string, reason: string, userId: string) => {
    const result = await updateAppointment(id, {
      status: 'declined',
      decline_reason: reason,
      acted_by_user_id: userId,
    } as any);
    if (result.success) {
      toast({
        title: 'Appointment Declined',
        description: 'The appointment has been declined.',
      });
    }
    return result;
  };

  const completeAppointment = async (id: string, notes: string, userId: string) => {
    const result = await updateAppointment(id, {
      status: 'completed',
      notes,
      completed_at: new Date().toISOString(),
      acted_by_user_id: userId,
    } as any);
    if (result.success) {
      toast({
        title: 'Appointment Completed',
        description: 'The appointment has been marked as complete.',
      });
    }
    return result;
  };

  const rescheduleAppointment = async (id: string, scheduledAt: Date, userId: string) => {
    const result = await updateAppointment(id, {
      scheduled_at: scheduledAt.toISOString(),
      acted_by_user_id: userId,
    } as any);
    if (result.success) {
      toast({
        title: 'Appointment Rescheduled',
        description: 'The appointment has been rescheduled.',
      });
    }
    return result;
  };

  useEffect(() => {
    fetchAppointments();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [statusFilter?.join(',')]);

  return {
    appointments,
    isLoading,
    fetchAppointments,
    acceptAppointment,
    declineAppointment,
    completeAppointment,
    rescheduleAppointment,
  };
}

export function useAppointmentStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    scheduled: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('status, scheduled_at')
          .eq('form_type', 'consultation');

        if (error) throw error;

        const now = new Date();
        const total = data.length;
        const pending = data.filter(a => a.status === 'pending').length;
        const scheduled = data.filter(
          a => (a.status === 'accepted' || a.status === 'ongoing') && 
               a.scheduled_at && 
               new Date(a.scheduled_at) >= now
        ).length;
        const completed = data.filter(a => a.status === 'completed').length;

        setStats({ total, pending, scheduled, completed });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    const channel = supabase
      .channel('appointments-stats')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, isLoading };
}
