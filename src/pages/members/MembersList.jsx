import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { canCreateMember, canDeleteMember } from '../../utils/permissions';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'NEWCOMER', label: 'Newcomer' },
  { value: 'VISITOR', label: 'Visitor' },
  { value: 'REGULAR_ATTENDER', label: 'Regular Attender' },
  { value: 'MEMBER', label: 'Member' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const MembersList = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isChildFilter, setIsChildFilter] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['members', page, statusFilter, isChildFilter],
    queryFn: () =>
      membersAPI.getAll({
        page,
        limit: 20,
        ...(statusFilter && { status: statusFilter }),
        ...(isChildFilter && { isChild: isChildFilter === 'true' }),
      }),
  });

  const handleDelete = async () => {
    try {
      await membersAPI.delete(memberToDelete.id);
      toast.success('Member deleted successfully');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete member');
    }
  };

  const filteredMembers = data?.data?.filter((member) =>
    search
      ? `${member.firstName} ${member.lastName} ${member.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      : true
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading members: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your church members and their information
          </p>
        </div>
        {canCreateMember(user?.role) && (
          <Link to="/members/new" className="btn-primary">
            <PlusIcon className="h-5 w-5 inline mr-2" />
            Add Member
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={isChildFilter}
              onChange={(e) => setIsChildFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All</option>
              <option value="false">Adults</option>
              <option value="true">Children</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setIsChildFilter('');
              }}
              className="btn-outline w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="card overflow-hidden p-0">
        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Loading members..." />
          </div>
        ) : filteredMembers?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No members found</p>
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers?.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.email || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.isChild ? 'Child' : 'Adult'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        to={`/members/${member.id}`}
                        className="text-secondary hover:text-secondary-light inline-flex items-center"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/members/${member.id}/edit`}
                        className="text-accent hover:text-accent-hover inline-flex items-center"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      {canDeleteMember(user?.role) && (
                        <button
                          onClick={() => {
                            setMemberToDelete(member);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-600 hover:text-red-800 inline-flex items-center"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {data?.pagination && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-outline disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === data.pagination.totalPages}
                className="btn-outline disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{page}</span> of{' '}
                  <span className="font-medium">{data.pagination.totalPages}</span>
                  {' '}({data.pagination.total} total members)
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="btn-outline rounded-r-none disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === data.pagination.totalPages}
                    className="btn-outline rounded-l-none disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setMemberToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Member"
        message={`Are you sure you want to delete ${memberToDelete?.firstName} ${memberToDelete?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};
