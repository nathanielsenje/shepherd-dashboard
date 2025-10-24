---
name: UI Guidelines System
description: Extract, analyze, and apply UI design guidelines from sample images to existing or new components. Generate comprehensive style documentation (MD format), review component compliance, and recreate components following the extracted design system including typography, colors, spacing, shadows, and interactive elements.
---

# UI Guidelines System

This skill enables you to establish and maintain a consistent design system by extracting design guidelines from sample UI images and applying them across all components—new or existing.

## Workflow Overview

The skill supports three primary workflows:

1. **Extract Guidelines** - Analyze UI sample images to derive a comprehensive design system (colors, typography, spacing, shadows, component patterns)
2. **Review Components** - Evaluate existing components against extracted guidelines and flag compliance issues
3. **Generate/Recreate Components** - Build new components or recreate existing ones using extracted guidelines

## Quick Start: Extracting Guidelines

When given a UI sample image, follow these steps:

### Step 1: Visual Analysis
Extract the core design characteristics by examining:
- **Color palette**: Primary colors, accents, neutrals, gradients
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Padding, margins, gaps between elements
- **Shadows/Depth**: Shadow sizes, blur, spread, opacity
- **Borders/Radius**: Border thickness, corner radius patterns
- **Component states**: Default, hover, active, disabled, error states

### Step 2: Document in Markdown
Generate a comprehensive guidelines document covering all components listed below. See `references/guideline-template.md` for the standard format.

### Step 3: Store & Reference
Save the extracted guidelines as a markdown file that can be referenced for all future component work.

## Supported Components

Your design system should document styling for these component types:

- **Buttons** - Primary, secondary, tertiary, ghost; sizes and states
- **Cards** - Container layouts, shadows, padding, hover effects
- **Badges** - Inline labels, color variants, sizing
- **Modals** - Overlay, header, body, footer, close actions
- **Sidebar Navigation** - Menu items, active states, icons, collapsible sections
- **Tags/Status Tags** - Semantic colors, text/icon combinations
- **Forms** - Inputs, labels, validation states, helper text
- **Text Styles** - Headings, body text, captions, quotes
- **Images** - Aspect ratios, borders, lazy loading patterns
- **Tooltips** - Positioning, delay, dark/light variants
- **Tables** - Headers, rows, striping, pagination, sorting
- **Counters** - Badge style counts, increment/decrement
- **Charts** - Colors, legends, interactive elements

## Workflow Patterns

### Pattern 1: Extract from Image → Generate Guidelines

```
User provides UI sample image
  ↓
Analyze visual design systematically
  ↓
Extract design tokens (colors, typography, spacing, shadows)
  ↓
Create comprehensive MD guidelines document
  ↓
Deliver guidelines with component specifications
```

### Pattern 2: Review Components → Check Compliance

```
User provides component code (React/HTML)
  ↓
Load extracted guidelines from references/
  ↓
Compare component styling against guidelines
  ↓
Identify deviations and generate compliance report
  ↓
Suggest corrections in imperative format
```

### Pattern 3: Recreate → Build New Components

```
User provides existing components or requests new builds
  ↓
Load extracted guidelines from references/
  ↓
Generate component code (React/Vue/HTML)
  ↓
Apply design tokens consistently
  ↓
Include component variants and state handling
  ↓
Deliver production-ready code
```

## Design Token Reference

When documenting guidelines, organize tokens into these categories:

**Colors**
- Primary, Secondary, Accent
- Semantic (Success, Warning, Error, Info)
- Neutral (Text, Background, Border)
- Gradients (with color stops)

**Typography**
- Font families (primary, secondary, mono)
- Font scales (h1-h6, body, small, caption)
- Font weights (light, regular, semibold, bold)
- Line heights and letter spacing

**Spacing**
- Base unit (e.g., 8px, 4px)
- Scale (xs, sm, md, lg, xl)
- Component-specific padding/margins

**Shadows**
- Elevation levels (shadow-sm, shadow-md, shadow-lg)
- Shadow values (blur, spread, offset, opacity)

**Borders**
- Border radius scale (sm, md, lg, full)
- Border width (thin, medium, thick)
- Border colors (by semantic purpose)

**Interactions**
- Transition durations (fast, normal, slow)
- Hover/focus states
- Disabled state opacity/color shifts
- Active state styling

## Output Format

Generate guidelines as a single markdown file with:

1. **Header section** - Design system name, version, last updated
2. **Color palette** - Visual swatches with hex/rgb values
3. **Typography** - Font stack definitions, size/weight combinations
4. **Spacing scale** - Base unit and multipliers with visual reference
5. **Component sections** - One section per component type with:
   - Visual examples or descriptions
   - CSS/Tailwind class specifications
   - Props/variations
   - State handling (hover, active, disabled, error)
   - Code snippets
6. **Design tokens table** - Reference of all tokens in structured format
7. **Implementation guide** - Best practices and usage notes

See `references/guideline-template.md` for a complete template structure.

## Component Code Generation

When generating or recreating component code:

1. **Use consistent patterns** - All components follow the same structure and naming
2. **Apply tokens systematically** - Every color, size, spacing value comes from design tokens
3. **Include state variants** - Show default, hover, active, disabled, and error states
4. **Document props** - Clearly list all component props and their effects
5. **Provide examples** - Include usage examples for each component

### Supported Output Formats

- **React/JSX** - With Tailwind or CSS modules
- **Vue/SFC** - With scoped styles
- **HTML/CSS** - Vanilla implementation
- **Web Components** - Custom elements

## Guidelines for Consistency

When working with components:

- **Never deviate from extracted design tokens** without explicit user approval
- **Maintain spacing consistency** - Use the established spacing scale exclusively
- **Shadow hierarchy** - Use only documented shadow elevations
- **Color semantics** - Apply colors by their intended semantic meaning
- **Typography hierarchy** - Respect the documented font scale
- **Responsive design** - Include mobile breakpoints consistent with guidelines

## Files in This Skill

- `references/guideline-template.md` - Template structure for generated guidelines
- `references/component-patterns.md` - Common patterns for component implementation
- `scripts/validate-guidelines.py` - Validates generated guideline documents

## Next Steps

1. **Provide a UI sample image** to analyze
2. **Specify which components** to prioritize
3. **Choose output format** (React, Vue, HTML)
4. **Request specific workflow** (extract, review, or recreate)

The skill will generate comprehensive, reusable guidelines and component implementations based on your design system.
