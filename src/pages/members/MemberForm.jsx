import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { membersAPI } from '../../api/members';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const STATUS_OPTIONS = [
  'NEWCOMER',
  'VISITOR',
  'REGULAR_ATTENDER',
  'MEMBER',
  'INACTIVE',
];

const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];

export const MemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    status: 'VISITOR',
    isChild: false,
    consentDataStorage: true,
    consentCommunication: true,
  });

  const { data: member, isLoading: loadingMember } = useQuery({
    queryKey: ['member', id],
    queryFn: () => membersAPI.getById(id),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        email: member.email || '',
        phone: member.phone || '',
        dateOfBirth: member.dateOfBirth?.split('T')[0] || '',
        gender: member.gender || '',
        status: member.status || 'VISITOR',
        isChild: member.isChild || false,
        consentDataStorage: member.consentDataStorage ?? true,
        consentCommunication: member.consentCommunication ?? true,
      });
    }
  }, [member]);

  const createMutation = useMutation({
    mutationFn: (data) => membersAPI.create(data),
    onSuccess: () => {
      toast.success('Member created successfully');
      navigate('/members');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create member');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => membersAPI.update(id, data),
    onSuccess: () => {
      toast.success('Member updated successfully');
      navigate(`/members/${id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update member');
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth || undefined,
    };

    if (isEditMode) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  if (loadingMember) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" text="Loading member..." />
      </div>
    );
  }

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Member' : 'Add New Member'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEditMode
              ? 'Update member information'
              : 'Enter the details for the new member'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card">
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Church Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Church Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center pt-7">
                <input
                  type="checkbox"
                  name="isChild"
                  checked={formData.isChild}
                  onChange={handleChange}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Is this a child?
                </label>
              </div>
            </div>
          </div>

          {/* Consent */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Consent</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="consentDataStorage"
                  checked={formData.consentDataStorage}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I consent to my data being stored and processed by the church for
                  membership and communication purposes.
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="consentCommunication"
                  checked={formData.consentCommunication}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I consent to receiving communications from the church (emails,
                  newsletters, event updates).
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isEditMode ? 'Update Member' : 'Create Member'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
