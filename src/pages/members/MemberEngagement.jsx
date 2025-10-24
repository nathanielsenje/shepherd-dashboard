import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { membersAPI } from '../../api/members';
import {
  LoadingSpinner,
  Card,
  Badge,
  Button,
  Alert
} from '../../components/ui';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export const MemberEngagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: engagement, isLoading, error } = useQuery({
    queryKey: ['member-engagement', id],
    queryFn: () => membersAPI.getEngagement(id),
  });

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" text="Loading engagement data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert
          variant="error"
          title="Error Loading Engagement"
          message={`Unable to load engagement data: ${error.message}`}
        />
        <Button onClick={() => navigate(`/members/${id}`)}>
          Back to Member
        </Button>
      </div>
    );
  }

  const { member, engagement: engagementData, summary } = engagement;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/members/${id}`)}
          className="text-neutral-400 hover:text-neutral-600"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {member.firstName} {member.lastName} - Engagement
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Complete overview of member involvement and activities
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm font-medium text-neutral-500">Connect Groups</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">{summary.totalGroups}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-neutral-500">Serving Teams</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">{summary.totalTeams}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-neutral-500">Ministries</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">{summary.totalMinistries}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-neutral-500">Completed Milestones</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">
            {summary.completedMilestones}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connect Groups */}
        <Card>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Connect Groups</h2>
          {engagementData.connectGroups.length === 0 ? (
            <p className="text-sm text-neutral-500">Not part of any connect group</p>
          ) : (
            <div className="space-y-3">
              {engagementData.connectGroups.map((group) => (
                <div key={group.id} className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-neutral-900">{group.groupName}</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        Role: <span className="font-medium">{group.role}</span>
                      </p>
                    </div>
                    {group.joinDate && (
                      <p className="text-xs text-neutral-500">
                        Since {format(new Date(group.joinDate), 'MMM yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Serving Teams */}
        <Card>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Serving Teams</h2>
          {engagementData.servingTeams.length === 0 ? (
            <p className="text-sm text-neutral-500">Not serving on any team</p>
          ) : (
            <div className="space-y-3">
              {engagementData.servingTeams.map((team) => (
                <div key={team.id} className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-neutral-900">{team.teamName}</p>
                      {team.rolePosition && (
                        <p className="text-sm text-neutral-500 mt-1">{team.rolePosition}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      {team.onboardingCompleted && (
                        <Badge variant="success" size="sm">
                          <CheckCircleIcon className="h-3 w-3 mr-1 inline" />
                          Onboarded
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Ministries */}
        <Card>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Ministries</h2>
          {engagementData.ministries.length === 0 ? (
            <p className="text-sm text-neutral-500">Not involved in any ministry</p>
          ) : (
            <div className="space-y-3">
              {engagementData.ministries.map((ministry) => (
                <div key={ministry.id} className="p-4 bg-neutral-50 rounded-lg">
                  <p className="font-medium text-neutral-900">{ministry.ministryName}</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Role: <span className="font-medium">{ministry.role}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Milestones */}
        <Card>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Milestones Progress
          </h2>
          <div className="space-y-3">
            {engagementData.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {milestone.status === 'COMPLETED' ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <ClockIcon className="h-6 w-6 text-neutral-400" />
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">
                      {milestone.milestoneType.replace('_', ' ')}
                    </p>
                    {milestone.achievedDate && (
                      <p className="text-xs text-neutral-500">
                        {format(new Date(milestone.achievedDate), 'MMM dd, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
                <Badge
                  variant={
                    milestone.status === 'COMPLETED'
                      ? 'success'
                      : milestone.status === 'IN_PROGRESS'
                      ? 'warning'
                      : 'default'
                  }
                  size="sm"
                >
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Covenant Partnership */}
      {engagementData.covenantPartnership && (
        <Card>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Covenant Partnership
          </h2>
          <div className="flex items-center space-x-4">
            <Badge
              variant={engagementData.covenantPartnership.status === 'ACTIVE' ? 'success' : 'default'}
              size="lg"
            >
              {engagementData.covenantPartnership.status}
            </Badge>
            {engagementData.covenantPartnership.signatureDate && (
              <p className="text-sm text-neutral-600">
                Signed on{' '}
                {format(
                  new Date(engagementData.covenantPartnership.signatureDate),
                  'MMM dd, yyyy'
                )}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Skills */}
      {engagementData.skills && engagementData.skills.length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Skills & Abilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {engagementData.skills.map((skill, index) => (
              <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                <p className="font-medium text-neutral-900">{skill.skillName}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-neutral-500">{skill.proficiencyLevel}</p>
                  {skill.availableToServe && (
                    <Badge variant="success" size="sm">
                      Available
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
