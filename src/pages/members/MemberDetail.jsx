import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  ArrowLeftIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  UserIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: member, isLoading, error } = useQuery({
    queryKey: ['member', id],
    queryFn: () => membersAPI.getById(id),
  });

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" text="Loading member details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading member: {error.message}</p>
        <button onClick={() => navigate('/members')} className="btn-primary mt-4">
          Back to Members
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/members')}
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-sm text-gray-600 mt-1">Member Details</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link
            to={`/members/${id}/engagement`}
            className="btn-secondary flex items-center"
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            View Engagement
          </Link>
          <Link to={`/members/${id}/edit`} className="btn-primary flex items-center">
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <UserIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-base text-gray-900">
                    {member.firstName} {member.lastName}
                  </p>
                </div>
              </div>

              {member.email && (
                <div className="flex items-start">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-base text-accent hover:text-accent-hover"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              )}

              {member.phone && (
                <div className="flex items-start">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <a
                      href={`tel:${member.phone}`}
                      className="text-base text-accent hover:text-accent-hover"
                    >
                      {member.phone}
                    </a>
                  </div>
                </div>
              )}

              {member.dateOfBirth && (
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-base text-gray-900">
                      {format(new Date(member.dateOfBirth), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              )}

              {member.gender && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-base text-gray-900">{member.gender}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-500">Type</p>
                <p className="text-base text-gray-900">
                  {member.isChild ? 'Child' : 'Adult'}
                </p>
              </div>
            </div>
          </div>

          {/* Household Info */}
          {member.household && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Household Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Household Name</p>
                  <p className="text-base text-gray-900">{member.household.name}</p>
                </div>
                {member.household.primaryAddress && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-base text-gray-900">
                      {member.household.primaryAddress}
                      {member.household.city && `, ${member.household.city}`}
                      {member.household.state && `, ${member.household.state}`}
                      {member.household.zipCode && ` ${member.household.zipCode}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Consent Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Consent & Privacy
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    member.consentDataStorage
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {member.consentDataStorage ? 'Granted' : 'Not Granted'}
                </span>
                <span className="ml-3 text-sm text-gray-700">
                  Data Storage Consent
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    member.consentCommunication
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {member.consentCommunication ? 'Granted' : 'Not Granted'}
                </span>
                <span className="ml-3 text-sm text-gray-700">
                  Communication Consent
                </span>
              </div>
              {member.consentDate && (
                <p className="text-sm text-gray-500">
                  Consent given on {format(new Date(member.consentDate), 'MMM dd, yyyy')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
            <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
              {member.status}
            </span>
          </div>

          {/* Dates Card */}
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Important Dates</h3>
            <div className="space-y-3">
              {member.firstVisitDate && (
                <div>
                  <p className="text-xs text-gray-500">First Visit</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(member.firstVisitDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-medium text-gray-900">
                  {format(new Date(member.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {format(new Date(member.updatedAt), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="btn-outline w-full text-center"
                >
                  Send Email
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="btn-outline w-full text-center"
                >
                  Call Member
                </a>
              )}
              <Link
                to={`/members/${id}/engagement`}
                className="btn-secondary w-full text-center"
              >
                View Engagement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
