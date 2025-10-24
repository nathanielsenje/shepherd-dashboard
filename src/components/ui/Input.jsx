import React, { forwardRef } from 'react';

/**
 * Input Component
 *
 * A flexible input component for forms with labels, errors, and help text
 *
 * @param {string} label - Input label
 * @param {string} name - Input name
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} placeholder - Input placeholder
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message
 * @param {string} helpText - Help text below input
 * @param {boolean} required - Whether input is required
 * @param {boolean} disabled - Whether input is disabled
 * @param {node} leftIcon - Icon to show on the left
 * @param {node} rightIcon - Icon to show on the right
 * @param {string} className - Additional classes for input
 */
const Input = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helpText,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  const inputClasses = `
    w-full px-4 py-2.5
    bg-white border rounded-lg
    text-sm text-neutral-900 placeholder-neutral-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/30' : 'border-neutral-300'}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-neutral-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-neutral-400">{leftIcon}</span>
          </div>
        )}

        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}

      {!error && helpText && (
        <p className="mt-1.5 text-sm text-neutral-500">{helpText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
