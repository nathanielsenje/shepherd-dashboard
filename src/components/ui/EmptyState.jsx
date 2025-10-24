import React from 'react';
import Button from './Button';

/**
 * EmptyState Component
 *
 * Display empty states with icon, message, and optional action
 *
 * @param {node} icon - Icon to display
 * @param {string} title - Main title text
 * @param {string} description - Description text
 * @param {string} actionLabel - Label for action button
 * @param {function} onAction - Action button click handler
 * @param {string} actionTo - Link destination for action button
 * @param {string} className - Additional classes
 */
const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionTo,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
            {icon}
          </div>
        </div>
      )}

      {title && (
        <h3 className="text-base font-semibold text-neutral-900 mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm text-neutral-500 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}

      {(actionLabel && (onAction || actionTo)) && (
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
          to={actionTo}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
