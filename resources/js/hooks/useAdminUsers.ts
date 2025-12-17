import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminUser {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
  role: 'super_admin' | 'admin' | 'member';
  created_at: string;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles for all users
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Create a map of user_id to role
      const roleMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);

      // Combine profiles with roles
      const usersWithRoles = profiles?.map(profile => ({
        id: profile.id,
        user_id: profile.user_id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url: profile.avatar_url,
        email: '', // We'll get this from auth if needed
        role: roleMap.get(profile.user_id) as AdminUser['role'] || 'member',
        created_at: profile.created_at,
      })) || [];

      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'member';
  }) => {
    try {
      // Call edge function to create user
      const { data: result, error } = await supabase.functions.invoke('create-admin-user', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: 'User Created',
        description: 'New user has been created successfully.',
      });

      await fetchUsers();
      return { success: true };
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create user',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };

  const updateUser = async (userId: string, data: {
    firstName: string;
    lastName: string;
    role: 'admin' | 'member';
  }) => {
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
        })
        .eq('user_id', userId);

      if (profileError) throw profileError;

      // Update role
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ role: data.role })
        .eq('user_id', userId);

      if (roleError) throw roleError;

      toast({
        title: 'User Updated',
        description: 'User has been updated successfully.',
      });

      await fetchUsers();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Call edge function to delete user
      const { error } = await supabase.functions.invoke('delete-admin-user', {
        body: { userId },
      });

      if (error) throw error;

      toast({
        title: 'User Deleted',
        description: 'User has been deleted successfully.',
      });

      await fetchUsers();
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
