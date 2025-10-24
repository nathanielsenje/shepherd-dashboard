# Component Implementation Patterns

This document outlines proven patterns for implementing UI components consistent with extracted guidelines.

## React/JSX Pattern

### Basic Component Structure

```jsx
import React from 'react';
import styles from './Button.module.css';

/**
 * Button Component
 * Supports multiple variants and sizes
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'tertiary'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Disabled state
 * @param {ReactNode} children - Button content
 * @param {function} onClick - Click handler
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[`button-${variant}`]}
        ${styles[`button-${size}`]}
        ${disabled ? styles.disabled : ''}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### CSS Modules Pattern

```css
/* Button.module.css */

.button {
  /* Base styles from design tokens */
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  white-space: nowrap;
  user-select: none;
}

/* Variant styles */
.button-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
}

.button-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}

.button-primary:active:not(:disabled) {
  box-shadow: var(--shadow-sm);
  transform: scale(0.98);
}

.button-primary:focus:not(:disabled) {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}

/* Size variants */
.button-sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-small);
}

.button-lg {
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--font-size-body-large);
}

/* Disabled state */
.button:disabled,
.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Tailwind CSS Pattern

```jsx
// Using Tailwind classes
export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-200 inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md disabled:opacity-50',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50',
    tertiary: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 disabled:opacity-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## State Management Pattern

### Component with States

```jsx
export const Card = ({
  title,
  children,
  onHover,
  isActive = false,
  isDisabled = false,
  isLoading = false,
  hasError = false,
}) => {
  return (
    <div
      className={`
        card
        ${isActive ? 'card--active' : ''}
        ${isDisabled ? 'card--disabled' : ''}
        ${isLoading ? 'card--loading' : ''}
        ${hasError ? 'card--error' : ''}
      `}
      onMouseEnter={onHover}
    >
      <div className="card__header">
        {isLoading && <Spinner />}
        <h3 className="card__title">{title}</h3>
      </div>
      <div className="card__body">
        {hasError ? (
          <ErrorMessage />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
```

---

## Composition Pattern

### Building Complex Components from Simpler Ones

```jsx
// Modal composition
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ title, onClose }) => (
  <div className="modal-header">
    <h2 className="modal-title">{title}</h2>
    <button className="modal-close" onClick={onClose}>×</button>
  </div>
);

export const ModalBody = ({ children }) => (
  <div className="modal-body">{children}</div>
);

export const ModalFooter = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Usage
<Modal isOpen={open} onClose={handleClose}>
  <ModalHeader title="Confirm Action" onClose={handleClose} />
  <ModalBody>Are you sure?</ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

---

## Form Component Pattern

### Controlled Input with Validation

```jsx
export const FormInput = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  required = false,
}) => {
  const hasError = !!error;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`form-input ${hasError ? 'form-input--error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
      />
      {error && <div className="error-message">{error}</div>}
      {helperText && !error && (
        <div className="helper-text">{helperText}</div>
      )}
    </div>
  );
};

// Usage
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value) => {
  if (!value) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
  return '';
};

<FormInput
  label="Email"
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setEmailError(validateEmail(email))}
  error={emailError}
  helperText="We'll never share your email"
  required
/>
```

---

## List/Array Pattern

### Rendering Collections

```jsx
export const Table = ({ data, columns, onRowClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="table-header">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={row.id || idx}
            className="table-row"
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((col) => (
              <td key={col.key} className="table-cell">
                {typeof col.render === 'function'
                  ? col.render(row[col.key], row)
                  : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Usage
<Table
  data={candidates}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => <StatusTag status={status} />,
    },
  ]}
  onRowClick={(row) => navigate(`/candidate/${row.id}`)}
/>
```

---

## Conditional Rendering Pattern

### Badge/Tag Variants

```jsx
export const Badge = ({ variant, children, icon: Icon, removable, onRemove }) => {
  const variantStyles = {
    success: 'badge--success',
    warning: 'badge--warning',
    error: 'badge--error',
    info: 'badge--info',
    neutral: 'badge--neutral',
  };

  return (
    <span className={`badge ${variantStyles[variant]}`}>
      {Icon && <Icon className="badge-icon" />}
      <span className="badge-text">{children}</span>
      {removable && (
        <button
          className="badge-remove"
          onClick={onRemove}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
};

// Usage
<Badge variant="success" icon={CheckIcon}>Active</Badge>
<Badge variant="error" removable onRemove={handleRemove}>Error</Badge>
```

---

## Tooltip/Popover Pattern

### Positioning with Portal

```jsx
export const Tooltip = ({
  content,
  children,
  placement = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setTimeout(() => setIsVisible(true), delay)}
        onMouseLeave={() => setIsVisible(false)}
        className="tooltip-trigger"
      >
        {children}
      </span>
      {isVisible && (
        <TooltipPortal
          content={content}
          targetRef={triggerRef}
          placement={placement}
        />
      )}
    </>
  );
};

const TooltipPortal = ({ content, targetRef, placement }) => {
  const positionStyles = calculatePosition(targetRef, placement);

  return ReactDOM.createPortal(
    <div className={`tooltip tooltip--${placement}`} style={positionStyles}>
      {content}
    </div>,
    document.body
  );
};
```

---

## Animation Pattern

### CSS Transitions and Keyframes

```css
/* Transition utilities */
.transition-fast {
  transition: all 150ms ease-in-out;
}

.transition-normal {
  transition: all 300ms ease-in-out;
}

.transition-slow {
  transition: all 500ms ease-in-out;
}

/* Fade animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 300ms ease-in-out;
}

/* Slide animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 300ms ease-in-out;
}

/* Scale animation */
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn 300ms ease-in-out;
}
```

---

## Responsive Design Pattern

### Mobile-First Approach

```jsx
// Mobile-first with breakpoint utilities
export const ResponsiveCard = ({ data }) => {
  return (
    <div className="card card--responsive">
      {/* Mobile: Full width, stacked */}
      {/* Tablet (md): 2 columns */}
      {/* Desktop (lg): 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card key={item.id}>{item}</Card>
        ))}
      </div>
    </div>
  );
};
```

---

## Accessibility Pattern

### ARIA Attributes and Semantic HTML

```jsx
export const Button = ({ variant, disabled, children, onClick, ...props }) => {
  return (
    <button
      type="button"
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      aria-pressed={/* if toggle button */}
      {...props}
    >
      {children}
    </button>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={`modal ${isOpen ? 'modal--open' : ''}`}
    >
      <h2 id="modal-title" className="modal-title">
        {title}
      </h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        Close
      </button>
    </div>
  );
};
```

---

## Testing Pattern

### Component Snapshot & Behavior Tests

```jsx
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders with primary variant', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders all size variants', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      const { container: comp } = render(
        <Button size={size}>Button</Button>
      );
      expect(comp).toMatchSnapshot();
    });
  });
});
```

---

## Key Takeaways

1. **Consistency** - All components follow the same structural patterns
2. **Props Over CSS Classes** - Use props for variants, not direct class application
3. **Composition** - Build complex components from simpler ones
4. **States** - Handle all possible states (default, hover, active, disabled, error, loading)
5. **Accessibility** - Always include ARIA attributes and semantic HTML
6. **Testing** - Test component props, states, and user interactions
7. **Tokens** - Use CSS variables for all design token values
