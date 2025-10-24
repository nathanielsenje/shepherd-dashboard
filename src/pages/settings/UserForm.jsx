import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI } from '../../api/users';
import { Button, Input, Select, Alert } from '../../components/ui';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * UserForm Component
 *
 * Form for creating/editing system users
 */
export const UserForm = ({ user, onSuccess }) => {
  const queryClient = useQueryClient();
  const isEditMode = !!user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'VOLUNTEER',
    isActive: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '', // Never populate password
        role: user.role || 'VOLUNTEER',
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: (data) => usersAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User created successfully');
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      setError(error.message || 'Failed to create user');
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => usersAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated successfully');
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      setError(error.message || 'Failed to update user');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isEditMode) {
      // Password is required for new users
      if (!formData.password) {
        setError('Password is required');
        return;
      }

      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    } else {
      // For editing, only validate password if provided
      if (formData.password) {
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
          setError(passwordError);
          return;
        }
      }
    }

    setLoading(true);

    const submitData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      role: formData.role,
      isActive: formData.isActive,
    };

    // Only include password if it's provided
    if (formData.password) {
      submitData.password = formData.password;
    }

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: user.id, data: submitData });
      } else {
        await createMutation.mutateAsync(submitData);
      }
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'ADMIN_STAFF', label: 'Admin Staff' },
    { value: 'PASTORAL_STAFF', label: 'Pastoral Staff' },
    { value: 'MINISTRY_LEADER', label: 'Ministry Leader' },
    { value: 'VOLUNTEER', label: 'Volunteer' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="error" message={error} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        helpText={isEditMode ? 'Email address cannot be changed' : undefined}
        disabled={isEditMode || loading}
      />

      <Input
        label={isEditMode ? 'New Password (leave blank to keep current)' : 'Password'}
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        required={!isEditMode}
        disabled={loading}
        helpText="At least 8 characters with uppercase, lowercase, and number"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        }
      />

      <Select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={roleOptions}
        required
        disabled={loading}
        helpText="Determines what permissions this user has in the system"
      />

      <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          disabled={loading}
          className="w-4 h-4 text-indigo-600 bg-white border-neutral-300 rounded focus:ring-indigo-500 focus:ring-2"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-neutral-900">
          Active User
        </label>
        <p className="text-xs text-neutral-600 ml-auto">
          {formData.isActive ? 'User can log in' : 'User cannot log in'}
        </p>
      </div>

      <div className="flex gap-3 pt-4 border-t border-neutral-200">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading
            ? isEditMode
              ? 'Updating User...'
              : 'Creating User...'
            : isEditMode
            ? 'Update User'
            : 'Create User'}
        </Button>
      </div>
    </form>
  );
};
