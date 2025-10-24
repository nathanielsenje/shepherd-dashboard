import { useQuery } from '@tanstack/react-query';
import { membersAPI } from '../../api/members';
import { Card, LoadingSpinner, Alert } from '../../components/ui';
import {
  ChartBarIcon,
  UsersIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { format, subDays, subMonths } from 'date-fns';

/**
 * Analytics Component
 *
 * Dashboard for viewing member statistics and trends
 */
export const Analytics = () => {
  // Fetch all members for analytics
  const { data: membersData, isLoading, error } = useQuery({
    queryKey: ['members', 'analytics'],
    queryFn: () => membersAPI.getAll({ limit: 1000 }),
  });

  // Fetch unconnected members
  const { data: unconnectedData } = useQuery({
    queryKey: ['unconnected-analytics'],
    queryFn: () => membersAPI.getUnconnected(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        variant="error"
        title="Failed to load analytics"
        message="There was an error loading analytics data. Please try again."
      />
    );
  }

  const members = membersData?.data || [];
  const unconnectedCount = unconnectedData?.count || 0;

  // Calculate statistics
  const totalMembers = members.length;

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  const newcomers = statusCounts['NEWCOMER'] || 0;
  const visitors = statusCounts['VISITOR'] || 0;
  const regularAttenders = statusCounts['REGULAR_ATTENDER'] || 0;
  const officialMembers = statusCounts['MEMBER'] || 0;
  const inactive = statusCounts['INACTIVE'] || 0;

  // Calculate children vs adults
  const children = members.filter(m => m.isChild).length;
  const adults = totalMembers - children;

  // Calculate recent growth (last 30 days)
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentMembers = members.filter(m =>
    new Date(m.createdAt) >= thirtyDaysAgo
  ).length;

  // Calculate growth percentage
  const previousTotal = totalMembers - recentMembers;
  const growthPercentage = previousTotal > 0
    ? ((recentMembers / previousTotal) * 100).toFixed(1)
    : 0;

  const stats = [
    {
      name: 'Total Members',
      value: totalMembers,
      icon: UsersIcon,
      change: `+${recentMembers} this month`,
      changeType: 'positive',
    },
    {
      name: 'Official Members',
      value: officialMembers,
      icon: UserGroupIcon,
      subtext: `${((officialMembers / totalMembers) * 100).toFixed(1)}% of total`,
    },
    {
      name: 'Unconnected',
      value: unconnectedCount,
      icon: UserGroupIcon,
      change: 'Need follow-up',
      changeType: unconnectedCount > 0 ? 'warning' : 'neutral',
    },
    {
      name: 'Growth Rate',
      value: `${growthPercentage}%`,
      icon: ArrowTrendingUpIcon,
      change: 'Last 30 days',
      changeType: growthPercentage > 0 ? 'positive' : 'neutral',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Member statistics and engagement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-neutral-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-bold text-neutral-900">
                        {stat.value}
                      </div>
                    </dd>
                    {stat.change && (
                      <dd className={`text-sm mt-1 ${
                        stat.changeType === 'positive'
                          ? 'text-green-600'
                          : stat.changeType === 'warning'
                          ? 'text-amber-600'
                          : 'text-neutral-600'
                      }`}>
                        {stat.change}
                      </dd>
                    )}
                    {stat.subtext && (
                      <dd className="text-sm text-neutral-600 mt-1">
                        {stat.subtext}
                      </dd>
                    )}
                  </dl>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Status Breakdown */}
        <Card>
          <Card.Header>
            <Card.Title>Member Status Distribution</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <StatusBar
                label="Newcomers"
                count={newcomers}
                total={totalMembers}
                color="bg-blue-600"
              />
              <StatusBar
                label="Visitors"
                count={visitors}
                total={totalMembers}
                color="bg-indigo-600"
              />
              <StatusBar
                label="Regular Attenders"
                count={regularAttenders}
                total={totalMembers}
                color="bg-purple-600"
              />
              <StatusBar
                label="Members"
                count={officialMembers}
                total={totalMembers}
                color="bg-green-600"
              />
              <StatusBar
                label="Inactive"
                count={inactive}
                total={totalMembers}
                color="bg-neutral-400"
              />
            </div>
          </Card.Body>
        </Card>

        {/* Demographics */}
        <Card>
          <Card.Header>
            <Card.Title>Demographics</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <StatusBar
                label="Adults"
                count={adults}
                total={totalMembers}
                color="bg-indigo-600"
              />
              <StatusBar
                label="Children"
                count={children}
                total={totalMembers}
                color="bg-pink-600"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-2xl font-bold text-neutral-900">{adults}</p>
                  <p className="text-sm text-neutral-600 mt-1">Adults</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-2xl font-bold text-neutral-900">{children}</p>
                  <p className="text-sm text-neutral-600 mt-1">Children</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <Card.Title>
            <CalendarIcon className="h-5 w-5 inline mr-2" />
            Recent Activity
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-neutral-200">
              <div>
                <p className="text-sm font-medium text-neutral-900">New Members (Last 30 days)</p>
                <p className="text-xs text-neutral-600">Growth in membership</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neutral-900">{recentMembers}</p>
                <p className="text-xs text-green-600">+{growthPercentage}% growth</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-neutral-200">
              <div>
                <p className="text-sm font-medium text-neutral-900">Unconnected Members</p>
                <p className="text-xs text-neutral-600">Members not in connect groups</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neutral-900">{unconnectedCount}</p>
                {unconnectedCount > 0 && (
                  <p className="text-xs text-amber-600">Needs attention</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-neutral-900">Conversion Rate</p>
                <p className="text-xs text-neutral-600">Visitors to members</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neutral-900">
                  {visitors > 0 ? ((officialMembers / visitors) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-xs text-neutral-600">Success rate</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

/**
 * StatusBar Component
 *
 * Displays a horizontal bar chart for status distribution
 */
const StatusBar = ({ label, count, total, color }) => {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-medium text-neutral-700">{label}</span>
        <span className="text-neutral-600">
          {count} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
