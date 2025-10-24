import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import {
  LoadingSpinner,
  StatusBadge,
  Avatar,
  Badge,
  Button,
  Card,
  Alert
} from '../../components/ui';
import {
  UsersIcon,
  UserGroupIcon,
  UserPlusIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { canCreateMember } from '../../utils/permissions';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { user } = useAuth();

  // Fetch all members with a larger limit to get statistics
  const { data: allMembersData, isLoading: loadingMembers } = useQuery({
    queryKey: ['all-members'],
    queryFn: () => membersAPI.getAll({ page: 1, limit: 100 }),
  });

  // Fetch recent members
  const { data: recentMembersData, isLoading: loadingRecent } = useQuery({
    queryKey: ['recent-members'],
    queryFn: () => membersAPI.getAll({ page: 1, limit: 5 }),
  });

  // Fetch unconnected members
  const { data: unconnectedData, isLoading: loadingUnconnected } = useQuery({
    queryKey: ['unconnected-members'],
    queryFn: () => membersAPI.getUnconnected(),
  });

  const isLoading = loadingMembers || loadingRecent || loadingUnconnected;

  // Calculate statistics
  const allMembers = allMembersData?.data || [];
  const totalMembers = allMembersData?.pagination?.total || 0;
  const recentMembers = recentMembersData?.data || [];
  const unconnectedCount = unconnectedData?.count || 0;

  // Status breakdown
  const visitors = allMembers.filter(m => m.status === 'VISITOR').length;
  const newcomers = allMembers.filter(m => m.status === 'NEWCOMER').length;
  const members = allMembers.filter(m => m.status === 'MEMBER' || m.status === 'COVENANT_PARTNER').length;
  const children = allMembers.filter(m => m.isChild).length;

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Welcome back, {user?.firstName}! Here's your church overview.
          </p>
        </div>
        {canCreateMember(user?.role) && (
          <Link
            to="/members/new"
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Member
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Members */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-neutral-500">Total Members</p>
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mb-1">{totalMembers}</p>
          <p className="text-xs text-neutral-500">Active in database</p>
        </div>

        {/* Visitors & Newcomers */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-neutral-500">New Visitors</p>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserPlusIcon className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mb-1">{visitors + newcomers}</p>
          <div className="flex items-center gap-2">
            <Badge variant="info" size="sm">{visitors} Visitors</Badge>
            <Badge variant="success" size="sm">{newcomers} New</Badge>
          </div>
        </div>

        {/* Members */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-neutral-500">Active Members</p>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900 mb-1">{members}</p>
          <p className="text-xs text-neutral-500">{children} children included</p>
        </div>

        {/* Unconnected */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-amber-900">Unconnected</p>
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-900 mb-1">{unconnectedCount}</p>
          <Link
            to="/members/unconnected"
            className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
          >
            View all →
          </Link>
        </div>
      </div>

      {/* Recent Members & Member Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Recent Members */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-neutral-900">Recent Members</h2>
            <Link to="/members" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {recentMembers.length === 0 ? (
              <div className="text-center py-8">
                <UserGroupIcon className="h-12 w-12 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">No members yet</p>
                {canCreateMember(user?.role) && (
                  <Link
                    to="/members/new"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold mt-2 inline-block"
                  >
                    Add your first member
                  </Link>
                )}
              </div>
            ) : (
              recentMembers.map((member) => (
                <Link
                  key={member.id}
                  to={`/members/${member.id}`}
                  className="flex items-center p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200"
                >
                  <Avatar
                    name={`${member.firstName} ${member.lastName}`}
                    size="md"
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 truncate">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-neutral-500 truncate">{member.email || 'No email'}</p>
                  </div>
                  <StatusBadge status={member.status} size="sm" className="ml-2 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Member Status Breakdown */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <h2 className="text-base font-bold text-neutral-900 mb-4">Status Overview</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <span className="text-sm font-medium text-neutral-900">Visitors</span>
              </div>
              <span className="text-sm font-bold text-blue-600">{visitors}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <span className="text-sm font-medium text-neutral-900">Newcomers</span>
              </div>
              <span className="text-sm font-bold text-green-600">{newcomers}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <span className="text-sm font-medium text-neutral-900">Members</span>
              </div>
              <span className="text-sm font-bold text-indigo-600">{members}</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                <span className="text-sm font-medium text-neutral-900">Unconnected</span>
              </div>
              <span className="text-sm font-bold text-amber-600">{unconnectedCount}</span>
            </div>

            <div className="pt-3 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-900">Total</span>
                <span className="text-sm font-bold text-neutral-900">{totalMembers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {canCreateMember(user?.role) && (
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <h2 className="text-base font-bold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link
              to="/members/new"
              className="flex items-center p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <PlusIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-neutral-900">Add Member</p>
                <p className="text-xs text-neutral-500">Create new record</p>
              </div>
            </Link>

            <Link
              to="/members/unconnected"
              className="flex items-center p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-neutral-900">Unconnected</p>
                <p className="text-xs text-neutral-500">{unconnectedCount} need follow-up</p>
              </div>
            </Link>

            <Link
              to="/members"
              className="flex items-center p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <UsersIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-neutral-900">All Members</p>
                <p className="text-xs text-neutral-500">Browse directory</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Unconnected Members Alert */}
      {unconnectedCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <ClockIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900 mb-1">
                {unconnectedCount} {unconnectedCount === 1 ? 'Member Needs' : 'Members Need'} Connection
              </h3>
              <p className="text-sm text-amber-700 mb-3">
                These members are not part of any connect group. Consider reaching out to help them get connected to the community.
              </p>
              <Link
                to="/members/unconnected"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
              >
                View Unconnected Members →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
