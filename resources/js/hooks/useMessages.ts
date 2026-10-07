import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  contact_submission_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  service_type: string;
  message: string | null;
  submitted_at: string;
  status: 'pending' | 'completed' | 'ignored';
  decline_reason: string | null;
  notes: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  form_type: string;
  acted_by_user_id: string | null;
  acted_by_profile?: {
    first_name: string;
    last_name: string;
  } | null;
}

export function useMessages(statusFilter?: string[]) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .eq('form_type', 'contact');
      
      if (statusFilter && statusFilter.length > 0) {
        query = query.in('status', statusFilter);
      }

      const { data, error } = await query.order('submitted_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles for acted_by_user_ids
      const userIds = [...new Set(data.map(m => m.acted_by_user_id).filter((id): id is string => !!id))];
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

      const messagesWithProfiles = data.map(m => ({
        ...m,
        acted_by_profile: m.acted_by_user_id ? profilesMap[m.acted_by_user_id] || null : null,
      }));

      setMessages(messagesWithProfiles as Message[]);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsDone = async (id: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          acted_by_user_id: userId,
        })
        .eq('id', id);

      if (error) throw error;
      await fetchMessages();
      toast({
        title: 'Message Marked as Done',
        description: 'The message has been moved to history.',
      });
      return { success: true };
    } catch (error: any) {
      console.error('Error marking message as done:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };

  const ignoreMessage = async (id: string, reason: string, userId: string) => {
    try {
      console.log('Ignoring message:', { id, reason, userId });
      const { data, error } = await supabase
        .from('appointments')
        .update({
          status: 'ignored',
          decline_reason: reason,
          completed_at: new Date().toISOString(),
          acted_by_user_id: userId,
        })
        .eq('id', id)
        .select();

      console.log('Ignore result:', { data, error });
      if (error) throw error;
      await fetchMessages();
      toast({
        title: 'Message Ignored',
        description: 'The message has been moved to history.',
      });
      return { success: true };
    } catch (error: any) {
      console.error('Error ignoring message:', error);
      toast({
        title: 'Error',
        description: 'Failed to ignore message',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [statusFilter?.join(',')]);

  return {
    messages,
    isLoading,
    fetchMessages,
    markAsDone,
    ignoreMessage,
  };
}

export function useMessageStats() {
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('status')
          .eq('form_type', 'contact');

        if (error) throw error;

        const pending = data.filter(m => m.status === 'pending').length;
        const completed = data.filter(m => m.status === 'completed').length;

        setStats({ pending, completed });
      } catch (error) {
        console.error('Error fetching message stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    const channel = supabase
      .channel('messages-stats')
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
