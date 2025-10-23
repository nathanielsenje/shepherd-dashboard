import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  UsersIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { canCreateMember } from '../../utils/permissions';

export const Dashboard = () => {
  const { user } = useAuth();

  const { data: membersData, isLoading } = useQuery({
    queryKey: ['members-summary'],
    queryFn: () => membersAPI.getAll({ page: 1, limit: 5 }),
  });

  const { data: unconnectedData } = useQuery({
    queryKey: ['unconnected-members'],
    queryFn: () => membersAPI.getUnconnected(),
  });

  const totalMembers = membersData?.pagination?.total || 0;
  const unconnectedCount = unconnectedData?.count || 0;
  const recentMembers = membersData?.data || [];

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Gradient Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-4">
                <SparklesIcon className="h-4 w-4" />
                <span className="text-sm font-semibold">Monthly Report</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName}!
              </h2>
              <p className="text-white/90 text-base max-w-2xl">
                You're doing a wonderful job maintaining your church community. Here's a thorough and
                clear view of all activities happening at your church today.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow-lg">
                  Try AI
                </button>
                <Link
                  to="/analytics"
                  className="text-white hover:text-white/90 font-medium text-sm flex items-center space-x-1"
                >
                  <span>Learn More</span>
                  <ArrowTrendingUpIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="hidden lg:block">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                <div className="absolute inset-4 bg-white/10 rounded-full"></div>
                <div className="absolute inset-8 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-500 mb-1">Total Members</p>
              <p className="text-3xl font-bold text-neutral-900 mb-2">{totalMembers}</p>
              <div className="flex items-center space-x-1">
                <span className="badge badge-success">
                  <ArrowTrendingUpIcon className="h-3 w-3" />
                  <span>12%</span>
                </span>
                <span className="text-xs text-neutral-500">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-500 mb-1">Unconnected</p>
              <p className="text-3xl font-bold text-neutral-900 mb-2">{unconnectedCount}</p>
              <div className="flex items-center space-x-1">
                <span className="badge badge-warning">
                  <span>Need action</span>
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl group-hover:scale-110 transition-transform">
              <UserGroupIcon className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-500 mb-1">Active Groups</p>
              <p className="text-3xl font-bold text-neutral-900 mb-2">12</p>
              <div className="flex items-center space-x-1">
                <span className="badge badge-info">
                  <span>6 new</span>
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-info/10 to-info/5 rounded-xl group-hover:scale-110 transition-transform">
              <UserGroupIcon className="h-6 w-6 text-info" />
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-500 mb-1">This Month</p>
              <p className="text-3xl font-bold text-neutral-900 mb-2">+{recentMembers.length}</p>
              <div className="flex items-center space-x-1">
                <span className="badge badge-success">
                  <span>New members</span>
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-success/10 to-success/5 rounded-xl group-hover:scale-110 transition-transform">
              <ChartBarIcon className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Members */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Recent Members</h2>
              <p className="text-sm text-neutral-500 mt-0.5">Latest additions to your community</p>
            </div>
            <Link
              to="/members"
              className="text-sm text-primary hover:text-primary-dark font-semibold"
            >
              View all →
            </Link>
          </div>

          {recentMembers.length === 0 ? (
            <div className="text-center py-12">
              <UserGroupIcon className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">No recent members</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMembers.map((member) => (
                <Link
                  key={member.id}
                  to={`/members/${member.id}`}
                  className="flex items-center p-4 rounded-xl hover:bg-neutral-50 transition-colors border border-neutral-100"
                >
                  <div className="avatar mr-4">
                    <span>
                      {member.firstName?.[0]}{member.lastName?.[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-neutral-500 truncate">{member.email || 'No email'}</p>
                  </div>
                  <span className="badge badge-primary ml-3">
                    {member.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-bold text-neutral-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {canCreateMember(user?.role) && (
              <Link
                to="/members/new"
                className="flex items-center p-4 rounded-xl border-2 border-dashed border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <PlusIcon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-neutral-700 group-hover:text-primary">Add New Member</span>
              </Link>
            )}

            <Link
              to="/members/unconnected"
              className="flex items-center p-4 rounded-xl border-2 border-dashed border-neutral-200 hover:border-warning hover:bg-warning/5 transition-all group"
            >
              <div className="p-2 bg-warning/10 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <UserGroupIcon className="h-5 w-5 text-warning" />
              </div>
              <span className="font-semibold text-neutral-700 group-hover:text-warning">View Unconnected</span>
            </Link>

            <Link
              to="/members"
              className="flex items-center p-4 rounded-xl border-2 border-dashed border-neutral-200 hover:border-info hover:bg-info/5 transition-all group"
            >
              <div className="p-2 bg-info/10 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                <UsersIcon className="h-5 w-5 text-info" />
              </div>
              <span className="font-semibold text-neutral-700 group-hover:text-info">View All Members</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Unconnected Alert */}
      {unconnectedCount > 0 && (
        <div className="card bg-warning/5 border-l-4 border-warning">
          <div className="flex items-start">
            <div className="p-2 bg-warning/10 rounded-lg mr-4">
              <UserGroupIcon className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">
                {unconnectedCount} Unconnected Member{unconnectedCount !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-neutral-600 mb-3">
                There {unconnectedCount === 1 ? 'is' : 'are'} {unconnectedCount} member
                {unconnectedCount !== 1 ? 's' : ''} who {unconnectedCount === 1 ? 'is' : 'are'} not
                part of any connect group. Consider reaching out to help them get connected.
              </p>
              <Link
                to="/members/unconnected"
                className="inline-flex items-center text-sm font-semibold text-warning hover:text-warning-dark"
              >
                View unconnected members →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
