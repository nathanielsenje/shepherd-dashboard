# Shepherd Dashboard UI Toolkit

A comprehensive, reusable component library to ensure consistent UI/UX across the entire Shepherd Dashboard application.

## 📦 Installation

Import components from the UI toolkit:

```jsx
import { Button, Input, Card, Badge, Avatar } from '../../components/ui';
```

---

## 🎨 Design Tokens

Use design tokens for consistent styling:

```jsx
import tokens from '../../styles/tokens';

const { colors, spacing, fontSize } = tokens;
```

---

## 🧩 Components

### Button

A flexible button component with multiple variants and sizes.

**Props:**
- `variant`: `'primary'` | `'secondary'` | `'outline'` | `'ghost'` | `'danger'` | `'success'` | `'warning'` (default: `'primary'`)
- `size`: `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'md'`)
- `fullWidth`: boolean (default: `false`)
- `disabled`: boolean (default: `false`)
- `loading`: boolean (default: `false`)
- `to`: string (renders as React Router Link)
- `href`: string (renders as anchor tag)
- `onClick`: function
- `type`: `'button'` | `'submit'` | `'reset'` (default: `'button'`)
- `leftIcon`: React node
- `rightIcon`: React node

**Examples:**

```jsx
// Primary button
<Button variant="primary" size="md">
  Save Changes
</Button>

// Button with icon
<Button variant="primary" leftIcon={<PlusIcon className="h-4 w-4" />}>
  Add Member
</Button>

// Loading state
<Button variant="primary" loading>
  Saving...
</Button>

// Button as link
<Button variant="outline" to="/members">
  View All Members
</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// Full width button
<Button variant="primary" fullWidth>
  Continue
</Button>
```

---

### Input

A form input component with labels, errors, and help text.

**Props:**
- `label`: string
- `name`: string
- `type`: string (default: `'text'`)
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string (displays error message)
- `helpText`: string (displays help text)
- `required`: boolean (default: `false`)
- `disabled`: boolean (default: `false`)
- `leftIcon`: React node
- `rightIcon`: React node

**Examples:**

```jsx
// Basic input
<Input
  label="Email"
  name="email"
  type="email"
  placeholder="john@example.com"
  value={email}
  onChange={handleChange}
/>

// Required input
<Input
  label="First Name"
  name="firstName"
  required
  value={firstName}
  onChange={handleChange}
/>

// Input with error
<Input
  label="Password"
  name="password"
  type="password"
  value={password}
  onChange={handleChange}
  error="Password must be at least 8 characters"
/>

// Input with help text
<Input
  label="Username"
  name="username"
  helpText="Choose a unique username"
  value={username}
  onChange={handleChange}
/>

// Input with icon
<Input
  label="Search"
  name="search"
  placeholder="Search members..."
  leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
/>
```

---

### Select

A dropdown select component for forms.

**Props:**
- `label`: string
- `name`: string
- `value`: string
- `onChange`: function
- `options`: array of `{ value: string, label: string }`
- `placeholder`: string (default: `'Select an option'`)
- `error`: string
- `helpText`: string
- `required`: boolean (default: `false`)
- `disabled`: boolean (default: `false`)

**Examples:**

```jsx
// Basic select
<Select
  label="Status"
  name="status"
  value={status}
  onChange={handleChange}
  options={[
    { value: 'VISITOR', label: 'Visitor' },
    { value: 'MEMBER', label: 'Member' },
    { value: 'NEWCOMER', label: 'Newcomer' },
  ]}
/>

// Required select with error
<Select
  label="Gender"
  name="gender"
  required
  value={gender}
  onChange={handleChange}
  options={genderOptions}
  error="Please select a gender"
/>

// Custom placeholder
<Select
  label="Country"
  placeholder="Choose your country"
  options={countryOptions}
/>
```

---

### Card

A container component with consistent styling.

**Props:**
- `variant`: `'default'` | `'outlined'` | `'filled'` | `'elevated'` | `'warning'` | `'success'` | `'info'` | `'danger'` (default: `'default'`)
- `hoverable`: boolean (default: `false`)
- `padding`: boolean (default: `true`)

**Sub-components:**
- `Card.Header`
- `Card.Title`
- `Card.Body`
- `Card.Footer`

**Examples:**

```jsx
// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Card with structure
<Card>
  <Card.Header>
    <Card.Title>Member Details</Card.Title>
  </Card.Header>
  <Card.Body>
    <p>Content here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>

// Hoverable card
<Card hoverable>
  <p>Hover to see shadow effect</p>
</Card>

// Warning card
<Card variant="warning">
  <p>This is a warning message</p>
</Card>

// Card without padding
<Card padding={false}>
  <img src="..." alt="..." className="w-full" />
</Card>
```

---

### Badge

A small badge for labels and status indicators.

**Props:**
- `variant`: `'default'` | `'primary'` | `'success'` | `'warning'` | `'danger'` | `'info'` (default: `'default'`)
- `size`: `'sm'` | `'md'` | `'lg'` (default: `'md'`)

**Examples:**

```jsx
<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
<Badge variant="danger">3</Badge>
```

---

### StatusBadge

Specialized badge for member status with automatic color mapping.

**Props:**
- `status`: string (e.g., `'VISITOR'`, `'MEMBER'`, `'NEWCOMER'`)
- `size`: `'sm'` | `'md'` | `'lg'` (default: `'sm'`)

**Examples:**

```jsx
<StatusBadge status="VISITOR" />
<StatusBadge status="MEMBER" size="md" />
<StatusBadge status="NEWCOMER" />
```

---

### Avatar

Display user avatars with initials or images.

**Props:**
- `name`: string (required - generates initials)
- `src`: string (optional - image URL)
- `size`: `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'md'`)

**Examples:**

```jsx
<Avatar name="John Doe" />
<Avatar name="Jane Smith" size="lg" />
<Avatar name="Bob Wilson" src="/path/to/image.jpg" />
```

---

### EmptyState

Display empty states with icon, message, and optional action.

**Props:**
- `icon`: React node
- `title`: string
- `description`: string
- `actionLabel`: string
- `onAction`: function
- `actionTo`: string (for link)

**Examples:**

```jsx
<EmptyState
  icon={<UsersIcon className="h-12 w-12" />}
  title="No members found"
  description="Get started by adding your first member to the database."
  actionLabel="Add Member"
  actionTo="/members/new"
/>

<EmptyState
  icon={<InboxIcon className="h-12 w-12" />}
  title="No messages"
  description="You're all caught up!"
/>
```

---

### Alert

Display alerts and notifications.

**Props:**
- `variant`: `'success'` | `'warning'` | `'error'` | `'info'` (default: `'info'`)
- `title`: string
- `message`: string
- `dismissible`: boolean (default: `false`)
- `onDismiss`: function

**Examples:**

```jsx
// Success alert
<Alert
  variant="success"
  title="Success!"
  message="Member has been created successfully."
/>

// Warning alert
<Alert
  variant="warning"
  title="Warning"
  message="This action cannot be undone."
/>

// Dismissible alert
<Alert
  variant="info"
  message="New update available."
  dismissible
  onDismiss={handleDismiss}
/>

// Custom content
<Alert variant="error">
  <p>An error occurred. Please try again.</p>
</Alert>
```

---

### LoadingSpinner

Display a loading spinner with optional text.

**Props:**
- `size`: `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'md'`)
- `text`: string (optional loading message)
- `className`: string (additional CSS classes)

**Examples:**

```jsx
// Basic spinner
<LoadingSpinner />

// Large spinner with text
<LoadingSpinner size="lg" text="Loading members..." />

// Small spinner
<LoadingSpinner size="sm" />

// With custom styling
<LoadingSpinner className="my-8" text="Please wait..." />
```

---

### Modal

Full-screen modal dialog with backdrop.

**Props:**
- `open`: boolean (required - whether modal is open)
- `onClose`: function (required - close handler)
- `title`: string (modal title)
- `children`: React node (modal content)
- `size`: `'sm'` | `'md'` | `'lg'` | `'xl'` (default: `'md'`)
- `className`: string (additional CSS classes for content area)

**Examples:**

```jsx
// Basic modal
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Member"
>
  <p>Modal content goes here</p>
</Modal>

// Large modal
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Member Details"
  size="lg"
>
  <MemberForm />
</Modal>

// Modal with custom content styling
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  className="space-y-4"
>
  <p>Are you sure?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

---

### ConfirmDialog

Confirmation dialog for dangerous or important actions.

**Props:**
- `open`: boolean (required - whether dialog is open)
- `onClose`: function (required - close handler)
- `onConfirm`: function (required - confirm action handler)
- `title`: string (dialog title)
- `message`: string (dialog message)
- `confirmText`: string (default: `'Confirm'`)
- `cancelText`: string (default: `'Cancel'`)
- `type`: `'warning'` | `'danger'` | `'info'` (default: `'warning'`)
- `confirmVariant`: string (button variant override)

**Examples:**

```jsx
// Warning dialog
<ConfirmDialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="Delete Member?"
  message="This action cannot be undone."
  type="warning"
/>

// Danger dialog
<ConfirmDialog
  open={isOpen}
  onClose={handleClose}
  onConfirm={handlePermanentDelete}
  title="Permanently Delete?"
  message="This will permanently remove all member data."
  type="danger"
  confirmText="Delete Permanently"
/>

// Info dialog
<ConfirmDialog
  open={isOpen}
  onClose={handleClose}
  onConfirm={handleExport}
  title="Export Data?"
  message="This will export all member data to CSV."
  type="info"
  confirmText="Export"
/>
```

---

## 🎨 Design Tokens

### Colors

```jsx
import { colors } from '../../styles/tokens';

// Primary
colors.primary[500]  // #6366F1

// Neutral
colors.neutral[900]  // #171717

// Semantic
colors.success[500]  // #22C55E
colors.warning[500]  // #F59E0B
colors.danger[500]   // #EF4444
colors.info[500]     // #3B82F6
```

### Spacing

```jsx
import { spacing } from '../../styles/tokens';

spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 16px
spacing.lg   // 24px
spacing.xl   // 32px
```

### Typography

```jsx
import { fontSize, fontWeight } from '../../styles/tokens';

fontSize.xs    // 12px
fontSize.sm    // 14px
fontSize.base  // 16px
fontSize.lg    // 18px

fontWeight.normal    // 400
fontWeight.semibold  // 600
fontWeight.bold      // 700
```

---

## 📋 Usage Guidelines

### 1. Always Use Toolkit Components

❌ **Don't:**
```jsx
<button className="px-4 py-2 bg-blue-600 text-white rounded">
  Click Me
</button>
```

✅ **Do:**
```jsx
<Button variant="primary">
  Click Me
</Button>
```

### 2. Use Design Tokens

❌ **Don't:**
```jsx
<div className="text-[#6366F1]">...</div>
```

✅ **Do:**
```jsx
import { colors } from '../../styles/tokens';
<div style={{ color: colors.primary[500] }}>...</div>
// Or use Tailwind: text-indigo-600
```

### 3. Consistent Spacing

❌ **Don't:**
```jsx
<div className="mt-3 mb-5 px-7">...</div>
```

✅ **Do:**
```jsx
<div className="mt-3 mb-4 px-4">...</div>
// Use spacing scale: 1, 2, 3, 4, 6, 8, 12, 16
```

### 4. Component Composition

```jsx
// Compose components together
<Card variant="warning" hoverable>
  <Card.Header>
    <Card.Title>Alert</Card.Title>
  </Card.Header>
  <Card.Body>
    <Alert variant="warning" message="Action required" />
  </Card.Body>
  <Card.Footer>
    <Button variant="warning" fullWidth>
      Take Action
    </Button>
  </Card.Footer>
</Card>
```

---

## 🚀 Best Practices

1. **Import from index**: Always import from `'../../components/ui'`
2. **Consistent variants**: Use the same variant names across components
3. **Semantic HTML**: Components render proper HTML elements
4. **Accessibility**: All components include proper ARIA attributes
5. **Responsive**: Components work across all screen sizes
6. **Theme-aware**: All components use design tokens

---

## 📝 Examples

### Form Example

```jsx
import { Input, Select, Button, Card } from '../../components/ui';

function MemberForm() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Add Member</Card.Title>
      </Card.Header>

      <Card.Body>
        <div className="space-y-4">
          <Input
            label="First Name"
            name="firstName"
            required
            value={firstName}
            onChange={handleChange}
          />

          <Input
            label="Last Name"
            name="lastName"
            required
            value={lastName}
            onChange={handleChange}
          />

          <Select
            label="Status"
            name="status"
            required
            value={status}
            onChange={handleChange}
            options={statusOptions}
          />
        </div>
      </Card.Body>

      <Card.Footer>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Member
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
```

### Dashboard Card Example

```jsx
import { Card, Badge, Avatar } from '../../components/ui';

function StatsCard({ title, value, badge }) {
  return (
    <Card hoverable>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        {badge && <Badge variant="success">{badge}</Badge>}
      </div>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
    </Card>
  );
}
```

---

**Last Updated:** October 24, 2025
**Maintained by:** Shepherd Dashboard Team
