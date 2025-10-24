import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { membersAPI } from '../../api/members';
import {
  LoadingSpinner,
  Card,
  Avatar,
  StatusBadge,
  Badge,
  Button,
  EmptyState,
  Alert,
} from '../../components/ui';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

/**
 * SearchResults Component
 *
 * Displays search results for members across the site
 */
export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => membersAPI.search(query),
    enabled: !!query, // Only run query if there's a search term
  });

  useEffect(() => {
    // Scroll to top when search results load
    window.scrollTo(0, 0);
  }, [query]);

  if (!query) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Search</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Enter a search term to find members
          </p>
        </div>
        <EmptyState
          icon={<MagnifyingGlassIcon className="h-12 w-12" />}
          title="No Search Query"
          description="Please enter a search term in the search bar above to find members."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Search Results</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Searching for: <span className="font-semibold">"{query}"</span>
          </p>
        </div>
        <Alert
          variant="error"
          title="Search Error"
          message={`Unable to perform search: ${error.message}`}
        />
      </div>
    );
  }

  const members = data?.data || [];
  const totalResults = data?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Search Results</h1>
        <p className="text-sm text-neutral-600 mt-1">
          {isLoading ? (
            'Searching...'
          ) : (
            <>
              Found <span className="font-semibold">{totalResults}</span> result
              {totalResults !== 1 ? 's' : ''} for:{' '}
              <span className="font-semibold">"{query}"</span>
            </>
          )}
        </p>
      </div>

      {/* Results */}
      {isLoading ? (
        <Card>
          <div className="py-12">
            <LoadingSpinner size="lg" text="Searching members..." />
          </div>
        </Card>
      ) : members.length === 0 ? (
        <EmptyState
          icon={<MagnifyingGlassIcon className="h-12 w-12" />}
          title="No Results Found"
          description={`No members found matching "${query}". Try a different search term.`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {members.map((member) => (
            <Card key={member.id} hoverable>
              <div className="flex items-center gap-4 p-4">
                {/* Avatar */}
                <Avatar
                  name={`${member.firstName} ${member.lastName}`}
                  size="lg"
                  className="flex-shrink-0"
                />

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-neutral-900 truncate">
                      {member.firstName} {member.lastName}
                    </h3>
                    <StatusBadge status={member.status} />
                    {member.isChild && (
                      <Badge variant="info" size="sm">
                        Child
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <EnvelopeIcon className="h-4 w-4 text-neutral-400" />
                        <a
                          href={`mailto:${member.email}`}
                          className="text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          {member.email}
                        </a>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <PhoneIcon className="h-4 w-4 text-neutral-400" />
                        <a
                          href={`tel:${member.phone}`}
                          className="text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          {member.phone}
                        </a>
                      </div>
                    )}
                    {member.firstVisitDate && (
                      <p className="text-xs text-neutral-500">
                        First visit: {format(new Date(member.firstVisitDate), 'MMM dd, yyyy')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    to={`/members/${member.id}`}
                    leftIcon={<EyeIcon className="h-4 w-4" />}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    to={`/members/${member.id}/edit`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Show more indicator if there are more results */}
      {!isLoading && members.length > 0 && totalResults > members.length && (
        <Card>
          <div className="text-center py-4">
            <p className="text-sm text-neutral-600">
              Showing {members.length} of {totalResults} results
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Refine your search to see more specific results
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
