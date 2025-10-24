# Component Quick Reference

## 🎯 Quick Import

```jsx
import {
  Avatar,
  Badge,
  StatusBadge,
  Button,
  Input,
  Select,
  Card,
  EmptyState,
  Alert,
  LoadingSpinner,
  Modal,
  ConfirmDialog,
} from '../../components/ui';
```

---

## Component Overview

### 🔘 Button
**7 Variants:** primary, secondary, outline, ghost, danger, success, warning
**5 Sizes:** xs, sm, md, lg, xl
**Features:** Icons, loading state, links, full width

### ✏️ Input
**Features:** Labels, errors, help text, icons, validation

### 📋 Select
**Features:** Labels, errors, help text, custom options

### 📦 Card
**8 Variants:** default, outlined, filled, elevated, warning, success, info, danger
**Sub-components:** Header, Title, Body, Footer

### 🏷️ Badge
**6 Variants:** default, primary, success, warning, danger, info
**3 Sizes:** sm, md, lg

### 📊 StatusBadge
**Auto-colored** based on member status
**Statuses:** VISITOR, NEWCOMER, MEMBER, etc.

### 👤 Avatar
**5 Sizes:** xs, sm, md, lg, xl
**Features:** Initials, images, solid black background

### 🎨 EmptyState
**Features:** Icon, title, description, action button

### ⚠️ Alert
**4 Variants:** success, warning, error, info
**Features:** Title, message, dismissible

### ⏳ LoadingSpinner
**4 Sizes:** sm, md, lg, xl
**Features:** Optional text, customizable

### 🪟 Modal
**4 Sizes:** sm, md, lg, xl
**Features:** Backdrop, title, custom content

### ✅ ConfirmDialog
**3 Types:** warning, danger, info
**Features:** Icon, custom buttons, actions

---

## Color Palette

### Primary
- `bg-indigo-600` / `text-indigo-600`
- Used for: Primary actions, links, active states

### Neutral (Black/Gray)
- `bg-neutral-900` / `text-neutral-900` (Black)
- `bg-neutral-50` / `text-neutral-50` (Light Gray)
- Used for: Text, backgrounds, borders

### Success (Green)
- `bg-green-600` / `text-green-600`
- Used for: Newcomers, success states

### Warning (Amber)
- `bg-amber-600` / `text-amber-600`
- Used for: Unconnected members, warnings

### Danger (Red)
- `bg-red-600` / `text-red-600`
- Used for: Delete actions, errors

### Info (Blue)
- `bg-blue-600` / `text-blue-600`
- Used for: Visitors, information

---

## Spacing Scale

- `gap-1` / `p-1` / `m-1` = 4px
- `gap-2` / `p-2` / `m-2` = 8px
- `gap-3` / `p-3` / `m-3` = 12px
- `gap-4` / `p-4` / `m-4` = 16px
- `gap-6` / `p-6` / `m-6` = 24px
- `gap-8` / `p-8` / `m-8` = 32px

---

## Text Sizes

- `text-xs` = 12px
- `text-sm` = 14px
- `text-base` = 16px
- `text-lg` = 18px
- `text-xl` = 20px
- `text-2xl` = 24px

---

## Font Weights

- `font-normal` = 400
- `font-medium` = 500
- `font-semibold` = 600
- `font-bold` = 700

---

## Border Radius

- `rounded-lg` = 12px
- `rounded-xl` = 16px
- `rounded-full` = circle

---

## Common Patterns

### Form Field
```jsx
<Input
  label="Field Name"
  name="fieldName"
  required
  value={value}
  onChange={onChange}
  error={error}
/>
```

### Action Button
```jsx
<Button variant="primary" leftIcon={<Icon />}>
  Action
</Button>
```

### Info Card
```jsx
<Card hoverable>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Status Display
```jsx
<StatusBadge status="VISITOR" size="sm" />
```

### User Display
```jsx
<Avatar name="John Doe" size="md" />
```

### Alert Message
```jsx
<Alert variant="warning" message="Important info" />
```

---

## ✅ Do's and ❌ Don'ts

### ✅ Do:
- Use toolkit components consistently
- Use design tokens for colors
- Follow spacing scale (1, 2, 3, 4, 6, 8)
- Import from `'../../components/ui'`

### ❌ Don't:
- Create custom buttons with inline styles
- Use arbitrary values like `text-[13px]`
- Mix gray-* and neutral-* classes
- Use colorful gradient avatars (use solid black)

---

## Status Color Guide

| Status | Color | Variant |
|--------|-------|---------|
| Visitor | Blue | info |
| Newcomer | Green | success |
| Member | Indigo | primary |
| Unconnected | Amber | warning |
| Inactive | Amber | warning |
| Error | Red | danger |

---

## Layout Patterns

### Dashboard Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
  {/* Cards */}
</div>
```

### Form Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Form fields */}
</div>
```

### List Item
```jsx
<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50">
  <Avatar />
  <div className="flex-1">...</div>
  <StatusBadge />
</div>
```

---

**Quick Tip:** Use Tailwind IntelliSense in VS Code for auto-completion!
