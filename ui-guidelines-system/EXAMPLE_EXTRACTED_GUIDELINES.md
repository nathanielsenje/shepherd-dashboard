---
name: Sence Point Design System
version: 1.0
lastUpdated: October 2025
---

# Sence Point Design System

A modern, professional design system for recruitment and HR management platform. Built on purple/pink gradients with clean, accessible components.

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Purple | #7C5CFF | rgb(124, 92, 255) | Main brand color, primary actions |
| Primary Dark Purple | #6B4FE6 | rgb(107, 79, 230) | Hover state for primary |
| Primary Light | #E8E3FF | rgb(232, 227, 255) | Background tints |
| Accent Pink | #FF50D9 | rgb(255, 80, 217) | Highlights, emphasis |
| Accent Pink Light | #FFB3E6 | rgb(255, 179, 230) | Secondary highlights |

### Semantic Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Success Green | #4CAF50 | rgb(76, 175, 80) | Positive actions, completed states |
| Success Light | #E8F5E9 | rgb(232, 245, 233) | Success background |
| Warning Orange | #FF9800 | rgb(255, 152, 0) | Warnings, attention needed |
| Warning Light | #FFF3E0 | rgb(255, 243, 224) | Warning background |
| Error Red | #F44336 | rgb(244, 67, 54) | Errors, destructive actions |
| Error Light | #FFEBEE | rgb(255, 235, 238) | Error background |
| Info Blue | #2196F3 | rgb(33, 150, 243) | Information, neutral alerts |

### Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Text Primary | #1A1A2E | rgb(26, 26, 46) | Main text, highest contrast |
| Text Secondary | #6B7280 | rgb(107, 114, 128) | Secondary text, labels |
| Text Muted | #9CA3AF | rgb(156, 163, 175) | Disabled text, hints |
| Background White | #FFFFFF | rgb(255, 255, 255) | Primary background |
| Background Light | #F9FAFB | rgb(249, 250, 251) | Secondary background |
| Background Dark | #F3F4F6 | rgb(243, 244, 246) | Tertiary background |
| Border Default | #E5E7EB | rgb(229, 231, 235) | Default borders |
| Border Light | #F0F1F3 | rgb(240, 241, 243) | Light borders |

### Gradients

| Name | Direction | Colors | Usage |
|------|-----------|--------|-------|
| Purple to Pink | 135deg | From #7C5CFF to #FF50D9 | Feature cards, headers, overlays |
| Subtle Purple | 180deg | From #E8E3FF to #FFB3E6 | Light backgrounds, accents |
| Dark Purple | 225deg | From #6B4FE6 to #7C5CFF | Dark overlays, modals |

---

## Typography

### Font Stacks

| Type | Font Family | Fallback | Usage |
|------|-----------|----------|--------|
| Primary | Inter, Segoe UI | -apple-system, BlinkMacSystemFont | Headings, UI text, primary |
| Body | Inter | -apple-system, BlinkMacSystemFont | Body text, standard text |
| Mono | JetBrains Mono, Courier New | monospace | Code, technical text |

### Type Scale

| Level | Font Size | Font Weight | Line Height | Letter Spacing | Usage |
|-------|-----------|-----------|------------|-----------------|-------|
| H1 | 32px / 2rem | Bold (700) | 1.3 | -0.5px | Page titles |
| H2 | 28px / 1.75rem | Bold (700) | 1.3 | -0.25px | Section titles |
| H3 | 24px / 1.5rem | Semibold (600) | 1.4 | 0px | Subsection titles |
| H4 | 20px / 1.25rem | Semibold (600) | 1.4 | 0px | Card titles |
| Body Large | 16px / 1rem | Regular (400) | 1.6 | 0px | Main content, large text |
| Body | 14px / 0.875rem | Regular (400) | 1.5 | 0px | Standard text |
| Body Small | 12px / 0.75rem | Regular (400) | 1.5 | 0.25px | Small labels, captions |
| Caption | 11px / 0.6875rem | Regular (400) | 1.4 | 0.3px | Meta info, timestamps |
| Quote | 16px / 1rem | Regular (400) | 1.8 | 0px | Quoted content |

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Spacing Scale

Base unit: **8px** (0.5rem)

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px (0.25rem) | Minimal spacing, internal padding |
| sm | 8px (0.5rem) | Small gaps between elements |
| md | 16px (1rem) | Medium gaps, default spacing |
| lg | 24px (1.5rem) | Large gaps between sections |
| xl | 32px (2rem) | Extra large gaps, major sections |
| 2xl | 48px (3rem) | Large padding for containers |

---

## Shadows & Elevation

| Level | Shadow Value | Usage |
|-------|--------------|-------|
| Shadow SM | 0 1px 2px 0 rgba(0, 0, 0, 0.05) | Subtle depth, default hover |
| Shadow MD | 0 4px 6px -1px rgba(0, 0, 0, 0.1) | Medium elevation, cards |
| Shadow LG | 0 10px 15px -3px rgba(0, 0, 0, 0.15) | Strong elevation, modals |
| Shadow XL | 0 20px 25px -5px rgba(0, 0, 0, 0.2) | Overlay shadows, top layers |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| None | 0 | Sharp corners |
| SM | 4px | Slightly rounded inputs |
| MD | 8px | Default cards and buttons |
| LG | 12px | Large containers |
| XL | 16px | Extra rounded containers |
| Full | 9999px | Completely round (pills, avatars) |

---

## Transitions

| Transition | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Fast | 100ms | ease-in-out | Quick interactions |
| Normal | 200ms | ease-in-out | Standard interactions |
| Slow | 300ms | ease-in-out | Modal opens, major changes |

---

## Components

### Buttons

#### Primary Button

**Specifications:**
```
Size: 40px height (default medium)
Padding: 10px 16px (vertical, horizontal)
Background: Linear gradient(135deg, #7C5CFF → #FF50D9) or solid #7C5CFF
Text: #FFFFFF, 14px, Semibold (600)
Border: None
Border Radius: 8px
Shadow: 0 4px 6px -1px rgba(124, 92, 255, 0.3)
Transition: all 200ms ease-in-out
Display: Inline-flex
Align Items: Center
Justify Content: Center
```

**States:**
- **Default:** Gradient background, shadow
- **Hover:** Darker purple (#6B4FE6), enhanced shadow (Shadow MD)
- **Active:** Reduced shadow, slight scale down (0.98)
- **Disabled:** 50% opacity, cursor not-allowed
- **Focus:** 2px outline in primary light, 2px offset

**Variants:**
- **Small:** 32px height, 8px 12px padding, 12px font-size
- **Large:** 48px height, 12px 20px padding, 16px font-size

**Code Example (React/Tailwind):**
```jsx
<Button variant="primary" size="md">
  Create
</Button>
```

---

#### Secondary Button

**Specifications:**
```
Size: 40px height
Padding: 10px 16px
Background: #F3F4F6 (light gray)
Text: #1A1A2E, 14px, Semibold (600)
Border: 1px solid #E5E7EB
Border Radius: 8px
Shadow: None
Transition: all 200ms ease-in-out
```

**States:**
- **Default:** Light gray background, subtle border
- **Hover:** #E5E7EB background, darker border
- **Active:** #D1D5DB background
- **Disabled:** 50% opacity

---

#### Ghost Button

**Specifications:**
```
Size: 40px height
Padding: 10px 16px
Background: Transparent
Text: #7C5CFF, 14px, Semibold (600)
Border: None
Border Radius: 8px
Shadow: None
```

**States:**
- **Default:** Transparent, purple text
- **Hover:** #E8E3FF background (light purple)
- **Active:** #E0D9FF background
- **Disabled:** Gray text, 50% opacity

---

### Cards

#### Card Container

**Specifications:**
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border Radius: 12px
Padding: 16px (internal spacing)
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Transition: all 200ms ease-in-out
```

**States:**
- **Default:** Soft shadow, border visible
- **Hover:** Enhanced shadow (Shadow MD), border-color lighter
- **Active:** Deeper shadow, border-color primary light

**Variations:**
- **Elevated:** Extra shadow (Shadow LG), increased padding
- **Flat:** No shadow, lighter border
- **Bordered:** Thicker border (2px), primary color

**Code Example:**
```jsx
<Card>
  <CardHeader>
    <h4 className="font-semibold">Wade Warren</h4>
    <span className="text-secondary text-sm">Front End Developer</span>
  </CardHeader>
  <CardBody>
    <div className="space-y-2">
      {/* Content */}
    </div>
  </CardBody>
</Card>
```

---

### Badges

#### Success Badge

```
Background: #E8F5E9
Text: #2E7D32 (dark green)
Padding: 4px 12px
Border Radius: 12px (MD)
Font Size: 12px
Font Weight: 500
Icon: Check icon (green)
```

#### Warning Badge

```
Background: #FFF3E0
Text: #E65100 (dark orange)
Padding: 4px 12px
Border Radius: 12px
Font Size: 12px
Font Weight: 500
```

#### Info Badge / Count

```
Background: #E3F2FD
Text: #1565C0 (dark blue)
Padding: 4px 8px
Border Radius: Full (9999px)
Font Size: 11px
Font Weight: 600
```

**Code Example:**
```jsx
<Badge variant="success" icon={CheckIcon}>
  Hired
</Badge>
```

---

### Modals

#### Modal Structure

**Specifications:**
```
Overlay:
  Background: rgba(0, 0, 0, 0.5)
  Position: Fixed, full screen
  Transition: Fade 200ms

Container:
  Width: 90% max, max-width 512px
  Background: #FFFFFF
  Border Radius: 12px
  Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2)
  Position: Centered (fixed, 50% 50%)
  Transition: Scale 200ms ease-in-out
  
Header:
  Padding: 24px
  Border Bottom: 1px solid #E5E7EB
  Display: Flex, space-between, align-center
  Title: 20px, Bold (700)
  
Body:
  Padding: 24px
  Max Height: 60vh
  Overflow Y: Auto
  
Footer:
  Padding: 16px 24px
  Border Top: 1px solid #E5E7EB
  Display: Flex, justify-end, gap-12px
```

**States:**
- **Open:** Overlay visible, container scale 1, opacity 1
- **Closed:** Hidden
- **Loading:** Spinner in header

**Code Example:**
```jsx
<Modal isOpen={open} onClose={handleClose}>
  <ModalHeader title="Confirm Action" onClose={handleClose} />
  <ModalBody>Content here</ModalBody>
  <ModalFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </ModalFooter>
</Modal>
```

---

### Sidebar Navigation

#### Menu Item

**Specifications:**
```
Height: 40px
Padding: 8px 12px
Typography: 14px, Regular (400)
Icon: 20px × 20px, left aligned
Text Color:
  Default: #6B7280 (secondary)
  Hover: #1A1A2E (primary)
  Active: #7C5CFF (purple)
  
Background:
  Default: Transparent
  Hover: #F3F4F6
  Active: #E8E3FF
  
Border Left:
  Default: None
  Active: 3px solid #7C5CFF
  
Transition: all 200ms ease-in-out
```

**States:**
- **Default:** Gray text, transparent background
- **Hover:** Dark text, light background
- **Active:** Purple text, light purple background, left border
- **Disabled:** Muted text, 50% opacity

**Code Example:**
```jsx
<SidebarNav>
  <NavItem 
    icon={HomeIcon} 
    active={location === '/'}
  >
    Dashboard
  </NavItem>
  <NavItem icon={DocumentIcon}>
    Documents
  </NavItem>
</SidebarNav>
```

---

### Tags & Status Tags

#### Status Tag

**Specifications by Status:**

**Screening:**
```
Background: #E3F2FD (light blue)
Text: #1565C0 (dark blue)
Icon: Document/Screening icon
```

**Technical Round:**
```
Background: #F3E5F5 (light purple)
Text: #6A1B9A (dark purple)
Icon: Code icon
```

**Pair Programming:**
```
Background: #C8E6C9 (light green)
Text: #2E7D32 (dark green)
Icon: Programming icon
```

**All variants:**
```
Padding: 6px 12px
Border Radius: 6px
Font Size: 12px
Font Weight: 500
Icon Size: 14px
Icon Margin Right: 4px
```

**Code Example:**
```jsx
<StatusTag status="technical-round">
  Technical Round
</StatusTag>
```

---

### Forms

#### Form Input

**Specifications:**
```
Height: 40px
Width: 100% or constrained
Padding: 10px 12px
Border: 1px solid #E5E7EB
Border Radius: 8px
Background: #FFFFFF
Typography: 14px, Regular (400)
Color: #1A1A2E
Placeholder Color: #9CA3AF
Transition: all 200ms ease-in-out
```

**States:**
- **Default:** Light border, white background
- **Focus:** 2px solid primary border (purple), shadow sm
- **Disabled:** #F3F4F6 background, gray border, cursor not-allowed
- **Error:** 2px solid #F44336 border, background #FFEBEE tint
- **Success:** 2px solid #4CAF50 border

#### Form Label

```
Font Size: 14px
Font Weight: 600
Color: #1A1A2E
Margin Bottom: 8px
Required indicator: Red asterisk
```

#### Helper Text / Error Message

```
Font Size: 12px
Color: #6B7280 (normal) or #F44336 (error)
Margin Top: 4px
```

**Code Example:**
```jsx
<FormGroup>
  <Label htmlFor="email">
    Email Address
    <span className="required">*</span>
  </Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email"
  />
  <HelperText>We'll never share your email.</HelperText>
</FormGroup>
```

---

### Text Styles

| Style | Font Size | Weight | Line Height | Usage |
|-------|-----------|--------|-------------|--------|
| Heading 1 | 32px | Bold | 1.3 | Page titles |
| Heading 2 | 28px | Bold | 1.3 | Section titles |
| Heading 3 | 24px | Semibold | 1.4 | Subsections |
| Heading 4 | 20px | Semibold | 1.4 | Card/component titles |
| Body Large | 16px | Regular | 1.6 | Important content |
| Body | 14px | Regular | 1.5 | Standard text |
| Body Small | 12px | Regular | 1.5 | Secondary text |
| Caption | 11px | Regular | 1.4 | Meta information |

---

### Images

#### Image Container

```
Aspect Ratio: 1:1 (default), or auto
Border Radius: 8px (default)
Border: 1px solid #E5E7EB (optional)
Shadow: None (default) or Shadow SM
Background: #F3F4F6 (placeholder)
Object Fit: Cover
Width: 100% or constrained
```

**Variants:**
- **Thumbnail:** 48px × 48px, rounded full
- **Avatar:** 40px × 40px, rounded full, 2px border primary
- **Banner:** 100% width, 300px height, 12px radius
- **Card Image:** 100% width, aspect-ratio 16:9

---

### Tooltips

#### Tooltip

```
Background: #1A1A2E (dark)
Text: #FFFFFF, 12px, Regular
Padding: 8px 12px
Border Radius: 6px
Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2)
Max Width: 200px
Word Wrap: Break-word
Z-Index: 1000

Arrow:
  Size: 6px
  Color: Inherit from background
  Position: Points toward trigger
```

**Positioning:**
- Top: 8px offset above element
- Right: 8px offset right of element
- Bottom: 8px offset below element
- Left: 8px offset left of element

**Animation:**
- Fade in: 100ms ease-in-out
- Fade out: 100ms ease-in-out
- Delay on hover: 200ms before appear

**Code Example:**
```jsx
<Tooltip content="Helper information" placement="top">
  <HelpCircleIcon />
</Tooltip>
```

---

### Tables

#### Table Container

```
Width: 100%
Border Collapse: Collapse
Background: #FFFFFF
```

#### Table Header

```
Background: #F3F4F6
Typography: 12px, Semibold (600), #6B7280
Padding: 12px 16px
Border Bottom: 2px solid #E5E7EB
Sticky: Position sticky, top 0
Text Align: Left (default)
```

#### Table Row

```
Border Bottom: 1px solid #E5E7EB
Hover Background: #F9FAFB
Transition: all 200ms ease-in-out
Min Height: 40px
```

#### Table Cell

```
Padding: 12px 16px
Text Align: Left (default)
Vertical Align: Middle
Typography: 14px, Regular
```

**States:**
- **Default:** White background, border
- **Hover:** Light gray background
- **Selected:** Light purple background (#E8E3FF)
- **Sorted:** Icon indicator in header

**Code Example:**
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Role</TableCell>
      <TableCell>Status</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {candidates.map(candidate => (
      <TableRow key={candidate.id}>
        <TableCell>{candidate.name}</TableCell>
        <TableCell>{candidate.role}</TableCell>
        <TableCell>
          <StatusTag status={candidate.status} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

### Counters / Badge Count

#### Counter Badge

```
Background: #7C5CFF
Text: #FFFFFF
Width: Min-width 24px
Height: 24px
Border Radius: Full (9999px)
Typography: 11px, Bold (700)
Padding: 0 8px (centered)
Display: Flex, align-center, justify-center
Position: Absolute, top-right (when on icon)
Z-Index: 10
```

**Variants:**
- **Numeric:** Shows number, background color by severity
- **Dot:** Small indicator without number
- **Custom:** Flexible sizing for larger numbers

**Code Example:**
```jsx
<Badge count={5}>
  <BellIcon />
</Badge>

// Or standalone
<CounterBadge count={12} />
```

---

### Charts

#### Chart Container

```
Width: 100% or constrained
Height: Auto or fixed (maintains aspect ratio)
Background: #FFFFFF or transparent
Padding: 16px
Border Radius: 8px
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Border: 1px solid #E5E7EB (optional)
```

#### Chart Elements

```
Bar/Line Color: 
  Primary series: #7C5CFF
  Secondary series: #FF50D9
  Tertiary series: #2196F3
  
Legend:
  Typography: 12px, Regular
  Text Color: #6B7280
  Spacing: 8px between items
  
Axis Labels:
  Typography: 12px, Regular
  Color: #9CA3AF
  
Grid Lines:
  Color: #E5E7EB
  Opacity: 0.5
  
Tooltip:
  Background: #1A1A2E
  Text: #FFFFFF, 12px
  Padding: 8px 12px
  Border Radius: 6px
```

**Interactive States:**
- **Hover:** Highlight data point, show tooltip
- **Focus:** Outline or ring on chart element

**Code Example:**
```jsx
<Chart type="bar" data={data}>
  <XAxis />
  <YAxis />
  <Bar dataKey="value" fill="#7C5CFF" />
  <Legend />
  <Tooltip />
</Chart>
```

---

## Design Tokens Reference

| Token Category | Token Name | Value | CSS Variable |
|---|---|---|---|
| **Color - Primary** | Primary Purple | #7C5CFF | --color-primary |
| | Primary Dark | #6B4FE6 | --color-primary-dark |
| | Primary Light | #E8E3FF | --color-primary-light |
| **Color - Accent** | Accent Pink | #FF50D9 | --color-accent |
| | Accent Pink Light | #FFB3E6 | --color-accent-light |
| **Color - Semantic** | Success | #4CAF50 | --color-success |
| | Warning | #FF9800 | --color-warning |
| | Error | #F44336 | --color-error |
| | Info | #2196F3 | --color-info |
| **Color - Neutral** | Text Primary | #1A1A2E | --color-text-primary |
| | Text Secondary | #6B7280 | --color-text-secondary |
| | Text Muted | #9CA3AF | --color-text-muted |
| | Background | #FFFFFF | --color-background |
| | Background Light | #F9FAFB | --color-background-light |
| | Border | #E5E7EB | --color-border |
| **Spacing** | xs | 4px | --space-xs |
| | sm | 8px | --space-sm |
| | md | 16px | --space-md |
| | lg | 24px | --space-lg |
| | xl | 32px | --space-xl |
| | 2xl | 48px | --space-2xl |
| **Typography** | Font Family Body | Inter | --font-family-body |
| | Font Size H1 | 32px | --font-size-h1 |
| | Font Size Body | 14px | --font-size-body |
| | Font Weight Bold | 700 | --font-weight-bold |
| | Font Weight Semibold | 600 | --font-weight-semibold |
| | Line Height Tight | 1.3 | --line-height-tight |
| | Line Height Normal | 1.5 | --line-height-normal |
| **Shadows** | Shadow SM | 0 1px 2px 0 rgba(0,0,0,0.05) | --shadow-sm |
| | Shadow MD | 0 4px 6px -1px rgba(0,0,0,0.1) | --shadow-md |
| | Shadow LG | 0 10px 15px -3px rgba(0,0,0,0.15) | --shadow-lg |
| **Borders** | Border Radius MD | 8px | --border-radius-md |
| | Border Radius LG | 12px | --border-radius-lg |
| | Border Radius Full | 9999px | --border-radius-full |
| **Transitions** | Transition Normal | 200ms ease-in-out | --transition-normal |
| | Transition Slow | 300ms ease-in-out | --transition-slow |

---

## Implementation Guide

### Consistency Principles

1. **Always use tokens** - Never hardcode colors, sizes, or spacing
2. **Maintain hierarchy** - Follow typography scale exactly
3. **State consistency** - All components handle states the same way
4. **Responsive design** - Scale layout but maintain token relationships
5. **Accessibility** - Maintain color contrast (WCAG AA minimum)

### Usage Examples

**Never hardcode:**
```jsx
// ❌ Wrong
<Button style={{ backgroundColor: '#7C5CFF' }}>
```

**Always use tokens:**
```jsx
// ✅ Correct with Tailwind
<Button className="bg-primary hover:bg-primary-dark">

// ✅ Correct with CSS variables
<Button style={{ backgroundColor: 'var(--color-primary)' }}>
```

### Testing Checklist

- [ ] All colors use design tokens
- [ ] All spacing uses scale (xs, sm, md, lg, xl, 2xl)
- [ ] Typography follows scale (h1-h4, body, caption)
- [ ] Shadows use elevation levels (sm, md, lg, xl)
- [ ] Border radius uses scale (sm, md, lg, full)
- [ ] All states documented (default, hover, active, disabled, error, focus)
- [ ] Component props clearly defined
- [ ] Accessibility attributes present (ARIA, semantic HTML)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | October 2025 | Initial design system extraction from Sence Point template |

---

**Created with UI Guidelines System Skill**
**Last Updated:** October 24, 2025
