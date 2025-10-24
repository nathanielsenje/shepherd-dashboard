# UI Guidelines Template

This template shows the standard structure for generated UI guidelines documents.

## Document Structure

```markdown
# [Project Name] Design System
Version: 1.0 | Last Updated: [DATE]

## Overview
Brief description of the design system and its principles.

---

## Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary | #[HEX] | rgb(r, g, b) | Main brand color |
| Secondary | #[HEX] | rgb(r, g, b) | Supporting actions |
| Accent | #[HEX] | rgb(r, g, b) | Highlights and emphasis |

### Semantic Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Success | #[HEX] | rgb(r, g, b) | Positive feedback |
| Warning | #[HEX] | rgb(r, g, b) | Caution messages |
| Error | #[HEX] | rgb(r, g, b) | Error states |
| Info | #[HEX] | rgb(r, g, b) | Informational content |

### Neutral Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Text Primary | #[HEX] | rgb(r, g, b) | Main text |
| Text Secondary | #[HEX] | rgb(r, g, b) | Secondary text |
| Background | #[HEX] | rgb(r, g, b) | Page background |
| Border | #[HEX] | rgb(r, g, b) | Borders and dividers |

### Gradients
| Name | Direction | Colors | Usage |
|------|-----------|--------|-------|
| [Gradient Name] | [Direction] | From #[HEX] to #[HEX] | [Usage] |

---

## Typography

### Font Stacks
| Type | Font Family | Fallback | Usage |
|------|-----------|----------|--------|
| Primary | [Font Name] | [Fallback] | Headings, UI text |
| Secondary | [Font Name] | [Fallback] | Body text |
| Mono | [Font Name] | [Fallback] | Code, technical text |

### Type Scale
| Level | Font Size | Font Weight | Line Height | Letter Spacing | Usage |
|-------|-----------|-----------|------------|-----------------|-------|
| H1 | [size] | Bold | [height] | [spacing] | Page titles |
| H2 | [size] | Bold | [height] | [spacing] | Section titles |
| H3 | [size] | Semibold | [height] | [spacing] | Subsection titles |
| Body | [size] | Regular | [height] | [spacing] | Body text |
| Caption | [size] | Regular | [height] | [spacing] | Small labels |

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | [value] | Minimal spacing |
| sm | [value] | Small gaps |
| md | [value] | Medium gaps (default) |
| lg | [value] | Large gaps |
| xl | [value] | Extra large gaps |

---

## Shadows & Elevation

| Level | Shadow Value | Usage |
|-------|--------------|-------|
| Shadow SM | [value] | Subtle depth |
| Shadow MD | [value] | Medium elevation |
| Shadow LG | [value] | Strong elevation |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| None | 0 | Sharp corners |
| SM | [value] | Slightly rounded |
| MD | [value] | Medium roundness |
| LG | [value] | Round corners |
| Full | 9999px | Pill-shaped |

---

## Components

### Buttons

#### Primary Button
```
Size: [dimensions]
Padding: [values]
Background: [color]
Text: [color/style]
Border: [style]
Border Radius: [value]
Shadow: [shadow]
Transition: [duration]
```

**States:**
- Default: [description]
- Hover: [color changes, shadow changes]
- Active: [styling]
- Disabled: [opacity/color]
- Focus: [ring/outline]

**Variants:**
- Large: [size changes]
- Medium: [size changes]
- Small: [size changes]

**Code Example:**
```jsx
<Button variant="primary" size="md">
  Click me
</Button>
```

#### Secondary Button
[Similar structure]

#### Tertiary Button / Ghost Button
[Similar structure]

---

### Cards

#### Card Container
```
Background: [color]
Border: [style]
Border Radius: [value]
Padding: [values]
Shadow: [shadow]
Transition: [duration]
```

**States:**
- Default: [description]
- Hover: [effects]
- Active: [effects]
- Disabled: [effects]

**Variations:**
- Elevated: [shadow value]
- Flat: [no shadow]
- Bordered: [border style]

**Code Example:**
```jsx
<Card>
  <CardHeader title="Title" />
  <CardBody>Content here</CardBody>
</Card>
```

---

### Badges

#### Semantic Badges
```
Background: [color]
Text: [color]
Padding: [values]
Border Radius: [value]
Font Size: [size]
Font Weight: [weight]
```

**Variants:**
- Success: [colors]
- Warning: [colors]
- Error: [colors]
- Info: [colors]
- Neutral: [colors]

**Code Example:**
```jsx
<Badge variant="success">Active</Badge>
```

---

### Modals

#### Modal Structure
```
Overlay: [color/opacity]
Container: [dimensions, background]
Header: [padding, typography]
Body: [padding, scrolling]
Footer: [layout, button alignment]
Border Radius: [value]
Shadow: [shadow]
Transition: [animation]
```

**States:**
- Closed: [hidden]
- Open: [visible, animation]
- Loading: [spinner state]

**Code Example:**
```jsx
<Modal isOpen={open} onClose={handleClose}>
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Content</ModalBody>
  <ModalFooter>Actions</ModalFooter>
</Modal>
```

---

### Sidebar Navigation

#### Menu Item
```
Height: [value]
Padding: [values]
Typography: [size, weight]
Icon: [size, color]
Text Color: [default/hover/active]
Background: [default/hover/active]
Border Left: [active state]
Transition: [duration]
```

**States:**
- Default: [styling]
- Hover: [styling]
- Active: [styling]
- Disabled: [styling]

**Code Example:**
```jsx
<SidebarNav>
  <NavItem icon={HomeIcon} active>Home</NavItem>
  <NavItem icon={DocumentIcon}>Documents</NavItem>
</SidebarNav>
```

---

### Tags & Status Tags

#### Status Tag
```
Background: [color by status]
Text: [color]
Padding: [values]
Border Radius: [value]
Font Size: [size]
Icon: [size, presence]
```

**Status Variants:**
- Pending: [color scheme]
- In Progress: [color scheme]
- Completed: [color scheme]
- Failed: [color scheme]

**Code Example:**
```jsx
<StatusTag status="in-progress">In Progress</StatusTag>
```

---

### Forms

#### Form Input
```
Height: [value]
Padding: [values]
Border: [style, color]
Border Radius: [value]
Background: [color]
Typography: [size, color]
Transition: [duration]
```

**States:**
- Default: [styling]
- Focus: [border color, shadow]
- Disabled: [opacity/background]
- Error: [border color, error message color]
- Success: [border color]

#### Form Label
```
Font Size: [size]
Font Weight: [weight]
Color: [color]
Margin Bottom: [value]
```

#### Helper Text / Error Message
```
Font Size: [size]
Color: [color]
Margin Top: [value]
```

**Code Example:**
```jsx
<FormGroup>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  <HelperText>We'll never share your email.</HelperText>
</FormGroup>
```

---

### Text Styles

| Style | Font Size | Weight | Line Height | Usage |
|-------|-----------|--------|-------------|--------|
| Heading 1 | [size] | Bold | [height] | Main page title |
| Heading 2 | [size] | Bold | [height] | Section title |
| Heading 3 | [size] | Semibold | [height] | Subsection |
| Body Large | [size] | Regular | [height] | Main content |
| Body Regular | [size] | Regular | [height] | Standard text |
| Body Small | [size] | Regular | [height] | Secondary text |
| Caption | [size] | Regular | [height] | Meta information |
| Quote | [size] | Regular | [height] | Quoted content |

---

### Images

#### Image Container
```
Aspect Ratio: [ratio or auto]
Border Radius: [value]
Border: [style/color]
Shadow: [shadow if applicable]
Background: [placeholder color]
Object Fit: [cover/contain/fill]
```

**Variants:**
- Thumbnail: [size, border radius]
- Full Width: [width, height constraints]
- Avatar: [size, border radius, border]

---

### Tooltips

#### Tooltip
```
Background: [color]
Text: [color, size]
Padding: [values]
Border Radius: [value]
Shadow: [shadow]
Arrow: [size, color]
Max Width: [width]
Animation: [fade in/duration]
```

**Positioning:**
- Top: [offset]
- Right: [offset]
- Bottom: [offset]
- Left: [offset]

**Code Example:**
```jsx
<Tooltip content="Helper text" placement="top">
  <HelpIcon />
</Tooltip>
```

---

### Tables

#### Table Container
```
Border Collapse: [value]
Width: [100%]
Background: [color]
```

#### Table Header
```
Background: [color]
Typography: [size, weight, color]
Padding: [values]
Border Bottom: [style]
Sticky: [top position]
```

#### Table Row
```
Border Bottom: [style]
Hover Background: [color]
Transition: [duration]
Height: [min-height]
```

#### Table Cell
```
Padding: [values]
Text Align: [default alignment]
Vertical Align: [middle]
```

**States:**
- Default: [styling]
- Hover: [background change]
- Sorted: [icon indicator]
- Selected: [background color]

**Code Example:**
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* rows */}
  </TableBody>
</Table>
```

---

### Counters / Badges with Count

#### Counter Badge
```
Background: [color]
Text: [color]
Width: [min-width]
Height: [min-height]
Border Radius: [full/rounded]
Typography: [size, weight]
Padding: [values or centered]
Position: [absolute for badge overlay]
```

**Variants:**
- Numeric: [color by severity]
- Dot: [small indicator]
- Custom: [flexible sizing]

**Code Example:**
```jsx
<Badge count={5}>
  <BellIcon />
</Badge>
```

---

### Charts

#### Chart Container
```
Width: [responsive]
Height: [aspect ratio maintained]
Background: [color]
Padding: [values]
Border Radius: [value]
Shadow: [shadow]
```

#### Chart Elements
```
Bar/Line Color: [color by data series]
Legend Text: [size, color]
Axis Labels: [size, color]
Grid Lines: [color, opacity]
Tooltip: [background, text color]
```

**Interactive States:**
- Hover: [highlight data point]
- Focus: [outline/ring]

**Code Example:**
```jsx
<Chart type="bar" data={chartData}>
  <Legend />
  <Tooltip />
</Chart>
```

---

## Design Tokens Table

| Token Category | Token Name | Value | CSS Variable |
|---|---|---|---|
| Color | Primary | #[HEX] | --color-primary |
| Color | Success | #[HEX] | --color-success |
| Space | md | [value] | --space-md |
| Typography | Body Size | [size] | --font-size-body |
| Shadow | lg | [shadow value] | --shadow-lg |

---

## Implementation Guidelines

1. **Consistency First** - Always use tokens from this guideline, never hardcode values
2. **Naming Conventions** - Follow the naming patterns established here for variables, classes, and props
3. **Responsive Design** - Maintain spacing and sizing relationships across breakpoints
4. **Accessibility** - Ensure sufficient color contrast (WCAG AA minimum)
5. **Component Reusability** - Build components with props to support variations
6. **Documentation** - Document component props and state clearly
7. **Testing** - Test all component states (hover, active, disabled, error)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [Date] | Initial system |

```

## Usage Notes

- Replace all `[values]`, `[color]`, `[HEX]` placeholders with actual design values
- Add visual examples or screenshots where helpful
- Expand component sections as needed
- Keep the structure consistent across all components
- Reference this template when generating guidelines from UI samples
