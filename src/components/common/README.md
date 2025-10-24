# Reusable UI Components

This directory contains reusable UI components used throughout the Shepherd Dashboard application.

## Components

### Badge

A flexible badge component with multiple variants and sizes.

**Props:**
- `variant` (string, optional): Badge style variant
  - Options: `'default'`, `'primary'`, `'success'`, `'warning'`, `'danger'`, `'info'`
  - Default: `'default'`
- `size` (string, optional): Badge size
  - Options: `'sm'`, `'md'`, `'lg'`
  - Default: `'md'`
- `children` (node, required): Badge content
- `className` (string, optional): Additional CSS classes

**Usage:**
```jsx
import Badge from '../../components/common/Badge';

// Basic usage
<Badge>Default</Badge>

// With variant and size
<Badge variant="success" size="sm">Active</Badge>

// With custom className
<Badge variant="danger" className="ml-2">3</Badge>
```

**Example Variants:**
```jsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

---

### StatusBadge

Specialized badge for displaying member status with appropriate colors.

**Props:**
- `status` (string, required): Member status
  - Supported: `'VISITOR'`, `'NEWCOMER'`, `'REGULAR_ATTENDER'`, `'MEMBER'`, `'COVENANT_PARTNER'`, `'INACTIVE'`, `'MOVED_AWAY'`
- `size` (string, optional): Badge size
  - Options: `'sm'`, `'md'`, `'lg'`
  - Default: `'sm'`
- `className` (string, optional): Additional CSS classes

**Usage:**
```jsx
import StatusBadge from '../../components/common/StatusBadge';

// Basic usage
<StatusBadge status="VISITOR" />

// With custom size
<StatusBadge status="MEMBER" size="md" />

// With additional className
<StatusBadge status="NEWCOMER" className="ml-2" />
```

**Status Color Mapping:**
- `VISITOR` → Blue (info)
- `NEWCOMER` → Green (success)
- `REGULAR_ATTENDER` → Indigo (primary)
- `MEMBER` → Indigo (primary)
- `COVENANT_PARTNER` → Green (success)
- `INACTIVE` → Yellow (warning)
- `MOVED_AWAY` → Gray (default)

---

### Avatar

Reusable avatar component with support for images, initials, and different sizes.

**Props:**
- `name` (string, required): Full name for generating initials
- `src` (string, optional): Image URL
- `size` (string, optional): Avatar size
  - Options: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`
  - Default: `'md'`
- `className` (string, optional): Additional CSS classes

**Usage:**
```jsx
import Avatar from '../../components/common/Avatar';

// Basic usage with initials
<Avatar name="John Doe" />

// With custom size
<Avatar name="Jane Smith" size="lg" />

// With image
<Avatar name="John Doe" src="/path/to/image.jpg" size="md" />

// With additional className
<Avatar name="John Doe" size="sm" className="mr-2" />
```

**Size Reference:**
- `xs` → 24px (w-6 h-6)
- `sm` → 32px (w-8 h-8)
- `md` → 40px (w-10 h-10)
- `lg` → 48px (w-12 h-12)
- `xl` → 64px (w-16 h-16)

**Initials Generation:**
- For names with 2+ parts: First letter of first name + First letter of last name
- For single names: First 2 letters
- Uppercased automatically

---

## Design System

### Color Palette

**Neutral Colors:**
- Used throughout for consistent gray tones
- Range: `neutral-50` to `neutral-900`

**Primary Colors:**
- Primary: `#6366F1` (Indigo)
- Accent: Gradient from primary to purple/pink

**Status Colors:**
- Success: Green (`green-100`, `green-700`)
- Warning: Yellow (`yellow-100`, `yellow-800`)
- Danger: Red (`red-100`, `red-600`)
- Info: Blue (`blue-100`, `blue-700`)

### Typography

**Text Sizes (Tailwind):**
- `text-xs` → 12px
- `text-sm` → 14px
- `text-base` → 16px
- `text-lg` → 18px
- `text-xl` → 20px

**Font Weights:**
- `font-medium` → 500
- `font-semibold` → 600
- `font-bold` → 700

### Spacing

**Common Gaps:**
- `gap-1.5` → 6px
- `gap-2` → 8px
- `gap-3` → 12px
- `gap-4` → 16px

**Padding:**
- `p-2` → 8px
- `p-3` → 12px
- `p-4` → 16px

---

## Best Practices

1. **Consistency**: Always use these reusable components instead of inline implementations
2. **Size Uniformity**: Use consistent sizes across similar UI elements
3. **Color Scheme**: Stick to the neutral color palette for consistency
4. **Accessibility**: Components include proper semantic HTML and ARIA attributes
5. **Responsiveness**: Components are mobile-first and responsive by default

---

## Migration Guide

### From Inline Avatar to Avatar Component

**Before:**
```jsx
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary">
  <span className="text-xs text-white">
    {firstName?.[0]}{lastName?.[0]}
  </span>
</div>
```

**After:**
```jsx
<Avatar name={`${firstName} ${lastName}`} size="sm" />
```

### From Inline Status Badge to StatusBadge

**Before:**
```jsx
<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
  {status?.substring(0, 3)}
</span>
```

**After:**
```jsx
<StatusBadge status={status} size="sm" />
```

### From Inline Badge to Badge Component

**Before:**
```jsx
<span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
  5
</span>
```

**After:**
```jsx
<Badge variant="danger" size="sm">5</Badge>
```

---

## Future Enhancements

- [ ] Add image support to Avatar component
- [ ] Add tooltip support to all components
- [ ] Create Button component with variants
- [ ] Create Input component with validation states
- [ ] Create Card component for consistent layouts

---

**Last Updated:** October 24, 2025
**Maintained by:** Shepherd Dashboard Team
