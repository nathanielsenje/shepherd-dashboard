import React from 'react';

/**
 * Reusable Badge Component
 *
 * A flexible badge component with multiple variants and sizes
 *
 * @param {string} variant - Badge style variant (default, primary, success, warning, danger, info)
 * @param {string} size - Badge size (sm, md, lg)
 * @param {string} children - Badge content
 * @param {string} className - Additional CSS classes
 */
const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className = ''
}) => {
  // Variant styles
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-semibold rounded-full
        ${variantClasses[variant] || variantClasses.default}
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
