import React from 'react';

/**
 * Card Component
 *
 * A container component with consistent styling
 *
 * @param {string} variant - Card style variant
 * @param {boolean} hoverable - Whether card has hover effect
 * @param {boolean} padding - Whether card has padding (default true)
 * @param {string} className - Additional classes
 * @param {node} children - Card content
 */
const Card = ({
  variant = 'default',
  hoverable = false,
  padding = true,
  className = '',
  children,
  ...props
}) => {
  // Variant styles
  const variantClasses = {
    default: 'bg-white border border-neutral-200',
    outlined: 'bg-white border-2 border-neutral-300',
    filled: 'bg-neutral-50 border border-neutral-200',
    elevated: 'bg-white shadow-md border border-neutral-100',
    warning: 'bg-amber-50 border border-amber-200',
    success: 'bg-green-50 border border-green-200',
    info: 'bg-blue-50 border border-blue-200',
    danger: 'bg-red-50 border border-red-200',
  };

  const baseClasses = `
    rounded-xl
    ${variantClasses[variant] || variantClasses.default}
    ${padding ? 'p-4' : ''}
    ${hoverable ? 'hover:shadow-md hover:border-neutral-300 transition-all duration-200' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

/**
 * CardHeader Component
 *
 * Header section for Card
 */
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardTitle Component
 *
 * Title for CardHeader
 */
const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-base font-bold text-neutral-900 ${className}`} {...props}>
      {children}
    </h3>
  );
};

/**
 * CardBody Component
 *
 * Body section for Card
 */
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 *
 * Footer section for Card
 */
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-4 pt-4 border-t border-neutral-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Export sub-components as properties of Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
