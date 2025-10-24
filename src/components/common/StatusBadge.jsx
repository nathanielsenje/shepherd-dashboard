import React from 'react';
import Badge from './Badge';

/**
 * StatusBadge Component
 *
 * Specialized badge for displaying member status with appropriate colors
 *
 * @param {string} status - Member status (VISITOR, MEMBER, NEWCOMER, REGULAR_ATTENDER, etc.)
 * @param {string} size - Badge size (sm, md, lg)
 * @param {string} className - Additional CSS classes
 */
const StatusBadge = ({ status, size = 'sm', className = '' }) => {
  if (!status) return null;

  // Map status to badge variants and display text
  const getStatusConfig = (status) => {
    const statusUpper = status.toUpperCase();

    const configs = {
      VISITOR: { variant: 'info', label: 'Visitor' },
      NEWCOMER: { variant: 'success', label: 'Newcomer' },
      REGULAR_ATTENDER: { variant: 'primary', label: 'Regular Attender' },
      MEMBER: { variant: 'primary', label: 'Member' },
      COVENANT_PARTNER: { variant: 'success', label: 'Covenant Partner' },
      INACTIVE: { variant: 'warning', label: 'Inactive' },
      MOVED_AWAY: { variant: 'default', label: 'Moved Away' },
    };

    return configs[statusUpper] || { variant: 'default', label: status.replace(/_/g, ' ') };
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} size={size} className={className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
