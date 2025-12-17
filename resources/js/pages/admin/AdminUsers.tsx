import { useState } from 'react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useAdminUsers, AdminUser } from '@/hooks/useAdminUsers';
import { CreateUserModal } from '@/components/admin/users/CreateUserModal';
import { EditUserModal } from '@/components/admin/users/EditUserModal';
import { DeleteUserDialog } from '@/components/admin/users/DeleteUserDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';

export default function AdminUsers() {
  const { users, isLoading, createUser, updateUser, deleteUser } = useAdminUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleCreate = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'member';
  }) => {
    setActionLoading(true);
    const result = await createUser(data);
    setActionLoading(false);
    if (result.success) {
      setShowCreateModal(false);
    }
  };

  const handleEdit = async (data: {
    firstName: string;
    lastName: string;
    role: 'admin' | 'member';
  }) => {
    if (!selectedUser) return;
    setActionLoading(true);
    const result = await updateUser(selectedUser.user_id, data);
    setActionLoading(false);
    if (result.success) {
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    const result = await deleteUser(selectedUser.user_id);
    setActionLoading(false);
    if (result.success) {
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <AdminLayout title="Users">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {isLoading ? (
          <Skeleton className="h-[400px] rounded-lg" />
        ) : users.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Users</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by adding a new user.
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar_url || undefined} />
                            <AvatarFallback>
                              {getInitials(user.first_name, user.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role === 'super_admin'
                            ? 'Super Admin'
                            : user.role === 'admin'
                            ? 'Admin'
                            : 'Member'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.created_at), 'PPP')}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.role !== 'super_admin' && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowEditModal(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateUserModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onConfirm={handleCreate}
        isLoading={actionLoading}
      />

      <EditUserModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onConfirm={handleEdit}
        user={
          selectedUser
            ? {
                firstName: selectedUser.first_name,
                lastName: selectedUser.last_name,
                role: selectedUser.role as 'admin' | 'member',
              }
            : null
        }
        isLoading={actionLoading}
      />

      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        userName={selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : ''}
        isLoading={actionLoading}
      />
    </AdminLayout>
  );
}
