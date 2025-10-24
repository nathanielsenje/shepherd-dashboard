import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import {
  LoadingSpinner,
  Avatar,
  StatusBadge,
  Badge,
  Button,
  Card,
  Alert
} from '../../components/ui';
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
    <div className="max-w-6xl mx-auto space-y-3 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/members')}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-neutral-900">
              {member.firstName} {member.lastName}
            </h1>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/members/${id}/engagement`}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
          >
            <ChartBarIcon className="h-3.5 w-3.5" />
            Engagement
          </Link>
          <Link to={`/members/${id}/edit`} className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-br from-primary to-accent rounded-lg hover:shadow-md transition-all flex items-center gap-1.5">
            <PencilIcon className="h-3.5 w-3.5" />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Info Card */}
        <div className="lg:col-span-2 space-y-3">
          {/* Profile Card with Avatar */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Avatar
                name={`${member.firstName} ${member.lastName}`}
                size="lg"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <h2 className="text-base font-bold text-neutral-900 mb-1">
                  {member.firstName} {member.lastName}
                </h2>
                <div className="flex items-center gap-1.5 mb-3">
                  <StatusBadge status={member.status} size="sm" />
                  {member.isChild && (
                    <Badge variant="info" size="sm">Child</Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-primary transition-colors"
                    >
                      <EnvelopeIcon className="h-3.5 w-3.5" />
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-primary transition-colors"
                    >
                      <PhoneIcon className="h-3.5 w-3.5" />
                      {member.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4">
            <h2 className="text-sm font-bold text-neutral-900 mb-3 flex items-center">
              <UserIcon className="h-4 w-4 mr-1.5 text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Full Name</p>
                <p className="text-xs font-medium text-neutral-900">
                  {member.firstName} {member.lastName}
                </p>
              </div>

              {member.dateOfBirth && (
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Date of Birth</p>
                  <p className="text-xs font-medium text-neutral-900 flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1 text-neutral-400" />
                    {format(new Date(member.dateOfBirth), 'MMM dd, yyyy')}
                  </p>
                </div>
              )}

              {member.gender && (
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Gender</p>
                  <p className="text-xs font-medium text-neutral-900">{member.gender}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Member Type</p>
                <p className="text-xs font-medium text-neutral-900">
                  {member.isChild ? 'Child' : 'Adult'}
                </p>
              </div>
            </div>
          </div>

          {/* Household Info */}
          {member.household && (
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <h2 className="text-sm font-bold text-neutral-900 mb-3">
                Household Information
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Household Name</p>
                  <p className="text-xs font-medium text-neutral-900">{member.household.name}</p>
                </div>
                {member.household.primaryAddress && (
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">Address</p>
                    <p className="text-xs font-medium text-neutral-900">
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
          <div className="bg-white border border-neutral-200 rounded-xl p-4">
            <h2 className="text-sm font-bold text-neutral-900 mb-3">
              Consent & Privacy
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg">
                <span className="text-xs font-medium text-neutral-700">
                  Data Storage
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${member.consentDataStorage ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                  {member.consentDataStorage ? 'Granted' : 'Not Granted'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg">
                <span className="text-xs font-medium text-neutral-700">
                  Communication
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${member.consentCommunication ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                  {member.consentCommunication ? 'Granted' : 'Not Granted'}
                </span>
              </div>
              {member.consentDate && (
                <p className="text-xs text-neutral-500 mt-2 flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1 text-neutral-400" />
                  Consent: {format(new Date(member.consentDate), 'MMM dd, yyyy')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Status Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-3">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Member Status</h3>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded inline-block">
              {member.status?.replace('_', ' ')}
            </span>
          </div>

          {/* Dates Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-3">
            <h3 className="text-xs font-bold text-neutral-900 mb-2">Important Dates</h3>
            <div className="space-y-2">
              {member.firstVisitDate && (
                <div className="flex items-start gap-2 p-2 bg-neutral-50 rounded-lg">
                  <CalendarIcon className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">First Visit</p>
                    <p className="text-xs font-semibold text-neutral-900">
                      {format(new Date(member.firstVisitDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2 p-2 bg-neutral-50 rounded-lg">
                <CalendarIcon className="h-3.5 w-3.5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500">Member Since</p>
                  <p className="text-xs font-semibold text-neutral-900">
                    {format(new Date(member.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-neutral-50 rounded-lg">
                <CalendarIcon className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500">Last Updated</p>
                  <p className="text-xs font-semibold text-neutral-900">
                    {format(new Date(member.updatedAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-neutral-200 rounded-xl p-3">
            <h3 className="text-xs font-bold text-neutral-900 mb-2">Quick Actions</h3>
            <div className="space-y-1.5">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg font-medium text-xs transition-colors"
                >
                  <EnvelopeIcon className="h-3.5 w-3.5" />
                  Send Email
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg font-medium text-xs transition-colors"
                >
                  <PhoneIcon className="h-3.5 w-3.5" />
                  Call Member
                </a>
              )}
              <Link
                to={`/members/${id}/engagement`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium text-xs transition-colors"
              >
                <ChartBarIcon className="h-3.5 w-3.5" />
                View Engagement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
