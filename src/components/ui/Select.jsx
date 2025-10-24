import React, { forwardRef } from 'react';

/**
 * Select Component
 *
 * A flexible select/dropdown component for forms
 *
 * @param {string} label - Select label
 * @param {string} name - Select name
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {array} options - Array of {value, label} objects
 * @param {string} placeholder - Placeholder text
 * @param {string} error - Error message
 * @param {string} helpText - Help text below select
 * @param {boolean} required - Whether select is required
 * @param {boolean} disabled - Whether select is disabled
 * @param {string} className - Additional classes for select
 */
const Select = forwardRef(({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helpText,
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const selectClasses = `
    w-full px-4 py-2.5
    bg-white border rounded-lg
    text-sm text-neutral-900
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed
    appearance-none cursor-pointer
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/30' : 'border-neutral-300'}
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
        <select
          ref={ref}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown arrow icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
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

Select.displayName = 'Select';

export default Select;
