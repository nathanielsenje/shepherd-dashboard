import { useQuery } from '@tanstack/react-query';
import { membersAPI } from '../../api/members';
import {
  LoadingSpinner,
  Card,
  StatusBadge,
  Button,
  Alert,
  EmptyState
} from '../../components/ui';
import { EyeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export const UnconnectedMembers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['unconnected-members'],
    queryFn: () => membersAPI.getUnconnected(),
  });

  if (error) {
    return (
      <Alert
        variant="error"
        title="Error Loading Members"
        message={`Unable to load unconnected members: ${error.message}`}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Unconnected Members</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Members who are not part of any connect group
        </p>
      </div>

      {/* Stats Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Total Unconnected</p>
            <p className="text-3xl font-bold text-neutral-900 mt-1">{data?.count || 0}</p>
          </div>
          {data?.count > 0 && (
            <Alert
              variant="warning"
              message="These members need follow-up to help them get connected to a community"
              className="mb-0"
            />
          )}
        </div>
      </Card>

      {/* Members List */}
      <Card padding={false}>
        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Loading unconnected members..." />
          </div>
        ) : data?.data?.length === 0 ? (
          <EmptyState
            icon={<UsersIcon className="h-12 w-12" />}
            title="All Members Connected!"
            description="Great! All members are connected to a group."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    First Visit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {data?.data?.map((member) => (
                  <tr key={member.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">
                        {member.firstName} {member.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">
                        {member.email ? (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {member.email}
                          </a>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">
                        {member.phone ? (
                          <a
                            href={`tel:${member.phone}`}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {member.phone}
                          </a>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {member.firstVisitDate
                        ? format(new Date(member.firstVisitDate), 'MMM dd, yyyy')
                        : <span className="text-neutral-400">-</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        to={`/members/${member.id}`}
                        leftIcon={<EyeIcon className="h-5 w-5" />}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
