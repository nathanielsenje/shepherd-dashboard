import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Card,
  Button,
  Input,
  Avatar,
  Badge,
  Alert,
  Modal,
} from '../../components/ui';
import {
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  KeyIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ChangePassword } from './ChangePassword';
import { MFASetup } from './MFASetup';
import toast from 'react-hot-toast';

/**
 * UserProfile Component
 *
 * Displays user account information and settings
 */
export const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [mfaModalOpen, setMfaModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    // Reset form data to user data
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
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

    setLoading(true);

    try {
      await updateProfile({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
      });

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Alert
        variant="error"
        title="Not Authenticated"
        message="Please log in to view your profile."
      />
    );
  }

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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Manage your account information and security settings
        </p>
      </div>

      {/* Profile Overview */}
      <Card>
        <div className="flex items-start gap-6">
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            size="xl"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {user.firstName} {user.lastName}
              </h2>
              <Badge variant={roleColors[user.role] || 'default'}>
                {roleLabels[user.role] || user.role}
              </Badge>
              {user.mfaEnabled && (
                <Badge variant="success" size="sm">
                  <ShieldCheckIcon className="h-3 w-3 mr-1 inline" />
                  MFA Enabled
                </Badge>
              )}
            </div>
            <p className="text-neutral-600 mt-1">{user.email}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-neutral-500">
              <ClockIcon className="h-4 w-4" />
              <span>
                Joined {user.createdAt ? format(new Date(user.createdAt), 'MMMM dd, yyyy') : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>
                <UserIcon className="h-5 w-5 inline mr-2" />
                Account Information
              </Card.Title>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  leftIcon={<PencilIcon className="h-4 w-4" />}
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={loading}
                    leftIcon={<XMarkIcon className="h-4 w-4" />}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    loading={loading}
                    disabled={loading}
                    leftIcon={<CheckCircleIcon className="h-4 w-4" />}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            {error && (
              <Alert variant="error" message={error} className="mb-4" />
            )}
            <div className="space-y-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing || loading}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing || loading}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing || loading}
                leftIcon={<EnvelopeIcon className="h-5 w-5" />}
                required
              />
              <Input
                label="Role"
                value={roleLabels[user.role] || user.role}
                disabled
                helpText="Contact an administrator to change your role"
              />
            </div>
          </Card.Body>
        </Card>

        {/* Security Settings */}
        <Card>
          <Card.Header>
            <Card.Title>
              <ShieldCheckIcon className="h-5 w-5 inline mr-2" />
              Security Settings
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {/* Password Section */}
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <KeyIcon className="h-5 w-5 text-neutral-600" />
                    <h3 className="font-semibold text-neutral-900">Password</h3>
                  </div>
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Keep your account secure with a strong password
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setPasswordModalOpen(true)}
                >
                  Change Password
                </Button>
              </div>

              {/* MFA Section */}
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-neutral-600" />
                    <h3 className="font-semibold text-neutral-900">
                      Two-Factor Authentication
                    </h3>
                  </div>
                  {user.mfaEnabled ? (
                    <Badge variant="success" size="sm">Enabled</Badge>
                  ) : (
                    <Badge variant="warning" size="sm">Disabled</Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  {user.mfaEnabled
                    ? 'Extra security with authenticator app'
                    : 'Add an extra layer of security to your account'}
                </p>
                <Button
                  variant={user.mfaEnabled ? 'outline' : 'primary'}
                  size="sm"
                  fullWidth
                  onClick={() => setMfaModalOpen(true)}
                >
                  {user.mfaEnabled ? 'Manage MFA' : 'Enable MFA'}
                </Button>
              </div>

              {/* Last Login */}
              {user.lastLogin && (
                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <ClockIcon className="h-4 w-4" />
                    <span>
                      Last login: {format(new Date(user.lastLogin), 'MMM dd, yyyy h:mm a')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Account Stats */}
      <Card>
        <Card.Header>
          <Card.Title>Account Activity</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <p className="text-3xl font-bold text-neutral-900">
                {user.loginCount || 0}
              </p>
              <p className="text-sm text-neutral-600 mt-1">Total Logins</p>
            </div>
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <p className="text-3xl font-bold text-neutral-900">
                {user.sessionCount || 0}
              </p>
              <p className="text-sm text-neutral-600 mt-1">Active Sessions</p>
            </div>
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <p className="text-3xl font-bold text-neutral-900">
                {user.createdAt
                  ? Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))
                  : 0}
              </p>
              <p className="text-sm text-neutral-600 mt-1">Days Active</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Permissions */}
      <Card>
        <Card.Header>
          <Card.Title>Permissions & Access</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="space-y-3">
            {user.permissions && user.permissions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.permissions.map((permission, index) => (
                  <Badge key={index} variant="default">
                    {permission}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-600">
                Your role ({roleLabels[user.role] || user.role}) has default permissions assigned.
              </p>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Modals */}
      <Modal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Change Password"
        size="sm"
      >
        <ChangePassword onSuccess={() => setPasswordModalOpen(false)} />
      </Modal>

      <Modal
        open={mfaModalOpen}
        onClose={() => setMfaModalOpen(false)}
        title="Two-Factor Authentication"
        size="md"
      >
        <MFASetup
          isEnabled={user.mfaEnabled}
          onSuccess={() => setMfaModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
