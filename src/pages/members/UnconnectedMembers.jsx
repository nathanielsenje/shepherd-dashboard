import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EyeIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export const UnconnectedMembers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['unconnected-members'],
    queryFn: () => membersAPI.getUnconnected(),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading unconnected members: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Unconnected Members</h1>
        <p className="text-sm text-gray-600 mt-1">
          Members who are not part of any connect group
        </p>
      </div>

      {/* Stats */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Unconnected</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{data?.count || 0}</p>
          </div>
          {data?.count > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-600">
                These members need follow-up to help them get connected to a community
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Members List */}
      <div className="card overflow-hidden p-0">
        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Loading unconnected members..." />
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Great! All members are connected to a group.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Visit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {member.email ? (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-accent hover:text-accent-hover"
                          >
                            {member.email}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {member.phone ? (
                          <a
                            href={`tel:${member.phone}`}
                            className="text-accent hover:text-accent-hover"
                          >
                            {member.phone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.firstVisitDate
                        ? format(new Date(member.firstVisitDate), 'MMM dd, yyyy')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/members/${member.id}`}
                        className="text-accent hover:text-accent-hover inline-flex items-center"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
