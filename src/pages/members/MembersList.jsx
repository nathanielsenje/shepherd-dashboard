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
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import Badge from '../../components/common/Badge';
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
    <div className="space-y-3 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-lg font-bold text-neutral-900">Members</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Filters
          </button>
          {canCreateMember(user?.role) && (
            <Link to="/members/new" className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-br from-primary to-accent rounded-lg hover:shadow-md transition-all">
              + Add Member
            </Link>
          )}
        </div>
      </div>

      {/* Filters - Compact Row */}
      <div className="bg-white border border-neutral-200 rounded-xl p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary"
              />
              <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={isChildFilter}
            onChange={(e) => setIsChildFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            <option value="">All Types</option>
            <option value="false">Adults</option>
            <option value="true">Children</option>
          </select>

          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('');
              setIsChildFilter('');
            }}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Members Grid */}
      {isLoading ? (
        <div className="py-8">
          <LoadingSpinner size="md" text="Loading members..." />
        </div>
      ) : filteredMembers?.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 mb-3">
            <MagnifyingGlassIcon className="h-6 w-6 text-neutral-400" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-1">No members found</h3>
          <p className="text-xs text-neutral-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Results count */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-neutral-600">
              <span className="font-semibold text-neutral-900">{filteredMembers?.length}</span> members
            </p>
            {data?.pagination && (
              <p className="text-xs text-neutral-500">
                Page {page} of {data.pagination.totalPages}
              </p>
            )}
          </div>

          {/* Member Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {filteredMembers?.map((member) => (
              <div key={member.id} className="bg-white border border-neutral-200 rounded-xl p-3 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="flex items-start gap-2.5 mb-3">
                  {/* Avatar */}
                  <Avatar
                    name={`${member.firstName} ${member.lastName}`}
                    size="sm"
                    className="flex-shrink-0"
                  />

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-neutral-900 truncate mb-0.5">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-xs text-neutral-500 truncate">
                      {member.email || 'No email'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                {member.phone && (
                  <p className="text-xs text-neutral-600 mb-2 truncate">
                    📞 {member.phone}
                  </p>
                )}

                {/* Status & Type Badges */}
                <div className="flex items-center gap-1.5 mb-3">
                  <StatusBadge status={member.status} size="sm" />
                  {member.isChild && (
                    <Badge variant="info" size="sm">
                      Child
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/members/${member.id}`}
                    className="flex-1 inline-flex items-center justify-center px-2 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <EyeIcon className="h-3 w-3 mr-1" />
                    View
                  </Link>
                  <Link
                    to={`/members/${member.id}/edit`}
                    className="flex-1 inline-flex items-center justify-center px-2 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <PencilIcon className="h-3 w-3 mr-1" />
                    Edit
                  </Link>
                  {canDeleteMember(user?.role) && (
                    <button
                      onClick={() => {
                        setMemberToDelete(member);
                        setDeleteDialogOpen(true);
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete member"
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="bg-white border border-neutral-200 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-600">
                  Page <span className="font-semibold">{page}</span> of{' '}
                  <span className="font-semibold">{data.pagination.totalPages}</span>
                  {' '}• {data.pagination.total} total
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === data.pagination.totalPages}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
