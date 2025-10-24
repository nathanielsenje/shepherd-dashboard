import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI } from '../../api/users';
import {
  LoadingSpinner,
  Card,
  Button,
  Badge,
  Avatar,
  EmptyState,
  Alert,
  Modal,
  ConfirmDialog,
} from '../../components/ui';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  KeyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { UserForm } from './UserForm';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

/**
 * SystemUsers Component
 *
 * Manage system users (Super Admin only)
 */
export const SystemUsers = () => {
  const queryClient = useQueryClient();
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.getAll(),
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => usersAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (id) => usersAPI.resetPassword(id),
    onSuccess: (data) => {
      toast.success('Password reset email sent successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reset password');
    },
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setUserFormOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserFormOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  const handleResetPassword = (userId) => {
    resetPasswordMutation.mutate(userId);
  };

  const roleColors = {
    SUPER_ADMIN: 'danger',
    ADMIN_STAFF: 'primary',
    PASTORAL_STAFF: 'success',
    MINISTRY_LEADER: 'info',
    VOLUNTEER: 'warning',
  };

  const roleLabels = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN_STAFF: 'Admin Staff',
    PASTORAL_STAFF: 'Pastoral Staff',
    MINISTRY_LEADER: 'Ministry Leader',
    VOLUNTEER: 'Volunteer',
  };

  const users = data?.data || [];

  if (error) {
    return (
      <Alert
        variant="error"
        title="Error Loading Users"
        message={`Unable to load system users: ${error.message}`}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">System Users</h3>
          <p className="text-sm text-neutral-600 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddUser}
          leftIcon={<PlusIcon className="h-4 w-4" />}
        >
          Add User
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <div className="py-12">
            <LoadingSpinner size="lg" text="Loading users..." />
          </div>
        </Card>
      ) : users.length === 0 ? (
        <EmptyState
          icon={<UserGroupIcon className="h-12 w-12" />}
          title="No Users Found"
          description="Add your first system user to get started."
          actionLabel="Add User"
          onAction={handleAddUser}
        />
      ) : (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    MFA
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${user.firstName} ${user.lastName}`}
                          size="sm"
                        />
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-neutral-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={roleColors[user.role] || 'default'} size="sm">
                        {roleLabels[user.role] || user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={user.isActive ? 'success' : 'default'}
                        size="sm"
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {user.lastLogin
                        ? format(new Date(user.lastLogin), 'MMM dd, yyyy')
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.mfaEnabled ? (
                        <Badge variant="success" size="sm">
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="default" size="sm">
                          Disabled
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          title="Edit user"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetPassword(user.id)}
                          title="Reset password"
                        >
                          <KeyIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                          title="Delete user"
                          className="text-red-600 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* User Form Modal */}
      <Modal
        open={userFormOpen}
        onClose={() => {
          setUserFormOpen(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Add New User'}
        size="md"
      >
        <UserForm
          user={selectedUser}
          onSuccess={() => {
            setUserFormOpen(false);
            setSelectedUser(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete User?"
        message={`Are you sure you want to delete ${userToDelete?.firstName} ${userToDelete?.lastName}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete User"
      />
    </div>
  );
};
