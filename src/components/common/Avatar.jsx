import React from 'react';

/**
 * Avatar Component
 *
 * Reusable avatar component with support for images, initials, and different sizes
 *
 * @param {string} name - Full name for generating initials
 * @param {string} src - Image URL (optional)
 * @param {string} size - Avatar size (xs, sm, md, lg, xl)
 * @param {string} className - Additional CSS classes
 */
const Avatar = ({ name, src, size = 'md', className = '' }) => {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const initials = getInitials(name);

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-full
        bg-neutral-900
        text-white font-semibold
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
