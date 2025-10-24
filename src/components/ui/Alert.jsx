import React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

/**
 * Alert Component
 *
 * Display alerts and notifications with different variants
 *
 * @param {string} variant - Alert type (success, warning, error, info)
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {boolean} dismissible - Whether alert can be dismissed
 * @param {function} onDismiss - Dismiss handler
 * @param {node} children - Custom content (overrides title/message)
 * @param {string} className - Additional classes
 */
const Alert = ({
  variant = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  children,
  className = '',
}) => {
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
      message: 'text-green-700',
      IconComponent: CheckCircleIcon,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-600',
      title: 'text-amber-900',
      message: 'text-amber-700',
      IconComponent: ExclamationTriangleIcon,
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-600',
      title: 'text-red-900',
      message: 'text-red-700',
      IconComponent: XCircleIcon,
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      message: 'text-blue-700',
      IconComponent: InformationCircleIcon,
    },
  };

  const config = variants[variant] || variants.info;
  const Icon = config.IconComponent;

  return (
    <div className={`rounded-lg border p-4 ${config.container} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.icon}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1">
          {children || (
            <>
              {title && (
                <h3 className={`text-sm font-semibold mb-1 ${config.title}`}>
                  {title}
                </h3>
              )}
              {message && (
                <p className={`text-sm ${config.message}`}>
                  {message}
                </p>
              )}
            </>
          )}
        </div>

        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ${config.icon} hover:opacity-75 transition-opacity`}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
