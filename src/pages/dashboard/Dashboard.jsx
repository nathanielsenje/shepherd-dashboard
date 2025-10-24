import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
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

      {/* Quick Actions & Recent Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Members */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-neutral-900">Recent Members</h2>
            <Link
              to="/members"
              className="text-xs text-primary hover:text-primary-dark font-semibold"
            >
              View all →
            </Link>
          </div>

          {recentMembers.length === 0 ? (
            <div className="text-center py-8">
              <UserGroupIcon className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">No recent members</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentMembers.slice(0, 3).map((member) => (
                <Link
                  key={member.id}
                  to={`/members/${member.id}`}
                  className="flex items-center p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Avatar
                    name={`${member.firstName} ${member.lastName}`}
                    size="sm"
                    className="mr-2.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">{member.email || 'No email'}</p>
                  </div>
                  <StatusBadge status={member.status} size="sm" className="ml-2 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4">
          <h2 className="text-sm font-bold text-neutral-900 mb-3">Quick Actions</h2>
          <div className="space-y-2">
            {canCreateMember(user?.role) && (
              <Link
                to="/members/new"
                className="flex items-center p-2.5 rounded-lg border border-dashed border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="p-1.5 bg-primary/10 rounded-md mr-2.5">
                  <PlusIcon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-neutral-700 group-hover:text-primary">Add New Member</span>
              </Link>
            )}

            <Link
              to="/members/unconnected"
              className="flex items-center p-2.5 rounded-lg border border-dashed border-neutral-200 hover:border-warning hover:bg-warning/5 transition-all group"
            >
              <div className="p-1.5 bg-warning/10 rounded-md mr-2.5">
                <UserGroupIcon className="h-3.5 w-3.5 text-warning" />
              </div>
              <span className="text-xs font-semibold text-neutral-700 group-hover:text-warning">View Unconnected</span>
            </Link>

            <Link
              to="/members"
              className="flex items-center p-2.5 rounded-lg border border-dashed border-neutral-200 hover:border-info hover:bg-info/5 transition-all group"
            >
              <div className="p-1.5 bg-info/10 rounded-md mr-2.5">
                <UsersIcon className="h-3.5 w-3.5 text-info" />
              </div>
              <span className="text-xs font-semibold text-neutral-700 group-hover:text-info">View All Members</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
