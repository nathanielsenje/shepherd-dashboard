# UI Guidelines System Skill - Getting Started Guide

Welcome! This skill helps you establish and maintain a consistent design system by extracting design guidelines from sample UI images and applying them across all your components.

## What This Skill Does

The **UI Guidelines System** skill provides three primary workflows:

### 1. 📊 **Extract Guidelines from UI Images**
Analyze a UI sample (like the Sence Point template you provided) to automatically derive:
- Complete color palette with semantic meanings
- Typography system (font families, scales, weights)
- Spacing and sizing scales
- Shadow and elevation system
- Border radius patterns
- Component specifications for all UI elements

**Output:** A comprehensive markdown file with design tokens and component documentation.

### 2. 🔍 **Review Components for Compliance**
Take existing React/Vue/HTML components and:
- Check them against your extracted guidelines
- Identify deviations and inconsistencies
- Generate compliance reports
- Suggest specific corrections

**Output:** Detailed compliance report with recommendations.

### 3. 🛠️ **Generate or Recreate Components**
Build new components or recreate existing ones that:
- Follow your extracted design guidelines exactly
- Use design tokens consistently
- Include all component variants and states
- Provide production-ready code

**Output:** Ready-to-use component code in React/Vue/HTML.

---

## Quick Start: How to Use This Skill

### Scenario 1: Extract Guidelines from Your UI Image

You have the Sence Point template image and want comprehensive design guidelines.

**What to do:**
```
"Please extract UI guidelines from my design template image. 
I need a comprehensive markdown document covering:
- Colors (primary, semantic, neutral, gradients)
- Typography (fonts, scales, weights)
- Spacing scale
- Shadows and elevation
- Border radius
- All 13 component types: buttons, cards, badges, modals, 
  sidebar navigation, tags, forms, text styles, images, 
  tooltips, tables, counters, and charts.

Output as a single markdown file."
```

**The skill will:**
1. Analyze your template image visually
2. Extract all design characteristics
3. Generate a markdown guideline document following the template structure
4. Provide design tokens for each category
5. Document each component with specifications and code examples

**You'll receive:**
- A `.md` file with complete design system documentation
- Ready-to-reference design tokens
- Component specifications for all 13 types

---

### Scenario 2: Review Your Existing Components

You have React components built and want to ensure they follow guidelines.

**What to do:**
```
"I have extracted design guidelines saved in this file [paste guidelines]. 
Please review my React Button component [paste code] for compliance.
Check against the guidelines for:
- Color tokens usage
- Spacing/padding consistency
- Typography
- State handling (hover, active, disabled, focus)
- Shadow elevation usage"
```

**The skill will:**
1. Load your extracted guidelines
2. Analyze your component code
3. Compare against each design token
4. Identify all deviations
5. Generate a detailed compliance report with specific fixes

**You'll receive:**
- Compliance analysis
- List of deviations with line numbers
- Suggested corrections
- Patterns to apply across other components

---

### Scenario 3: Recreate Components Using Guidelines

You want your existing components rebuilt to strictly follow guidelines.

**What to do:**
```
"Using these extracted guidelines [paste guidelines], 
please recreate my Button components in React/Tailwind.
Build all variants:
- Sizes: sm, md, lg
- Variants: primary, secondary, tertiary, ghost
- States: default, hover, active, disabled, focus, loading

Output production-ready code with:
- All design tokens applied
- Full state handling
- Component props documented
- Usage examples"
```

**The skill will:**
1. Parse your guidelines for token values
2. Generate components with token applications
3. Include all specified variants and states
4. Add comprehensive JSDoc comments
5. Provide ready-to-copy code

**You'll receive:**
- Production-ready component files
- All variants implemented
- Clear prop documentation
- Copy-paste ready code

---

## Supported Component Types

The skill handles all 13 component types from your request:

1. **Buttons** - Primary, secondary, tertiary, ghost; multiple sizes
2. **Cards** - Container layouts, shadows, hover effects
3. **Badges** - Inline labels, color variants
4. **Modals** - Dialog boxes with overlay
5. **Sidebar Navigation** - Menu items, active states, collapsible sections
6. **Tags & Status Tags** - Semantic color badges
7. **Forms** - Inputs, labels, validation states
8. **Text Styles** - Typography hierarchy (h1-h6, body, captions)
9. **Images** - Aspect ratios, borders, containers
10. **Tooltips** - Hover information with positioning
11. **Tables** - Headers, rows, pagination, sorting
12. **Counters** - Badge-style count indicators
13. **Charts** - Data visualization components

---

## Output Formats

### Markdown Guidelines (Recommended)

Your extracted guidelines will be formatted as a markdown file containing:

```
# [Design System Name] Design System

## Color Palette
- Primary colors table
- Semantic colors table
- Neutral colors table
- Gradients list

## Typography
- Font stacks
- Type scale (h1-h6, body, captions)
- Font weights and line heights

## Spacing Scale
- Base unit and multipliers

## Shadows & Elevation
- Shadow definitions by level

## Components
- Detailed specs for each of 13 components
- Visual descriptions
- CSS/Tailwind classes
- Props and variations
- State handling

## Design Tokens Reference
- Structured table of all tokens

## Implementation Guide
- Best practices
- Usage patterns
```

### Component Code Formats

The skill can generate components in:
- **React/JSX** with Tailwind CSS or CSS Modules
- **Vue/SFC** with scoped styles
- **HTML/CSS** vanilla implementation
- **Web Components** custom elements

---

## Workflow Examples

### Example 1: Fresh Start (Image → Guidelines → Components)

```
Step 1: "Extract complete design guidelines from this UI template"
        → You get: design-system.md with all tokens and specs

Step 2: "Generate all Button component variants following these guidelines"
        → You get: Button.jsx with all variants ready

Step 3: "Generate Card component with all documented variations"
        → You get: Card.jsx production-ready code

Step 4: "Generate Form components (Input, Label, HelperText)"
        → You get: Form components collection
```

### Example 2: Review & Update (Existing Components → Compliance → Fixed Code)

```
Step 1: "Review my existing Button component against the guidelines"
        → You get: Compliance report with issues

Step 2: "Here are the issues found. Recreate the Button fixing these."
        → You get: Updated Button.jsx

Step 3: "Apply the same fixes to my Card and Form components"
        → You get: Updated components
```

### Example 3: Guideline-First Development (Guidelines → New Components)

```
Step 1: Have extracted guidelines in your reference
Step 2: For each new component: "Build [component] following guidelines"
Step 3: Component is created with 100% token compliance
```

---

## Files Included in This Skill

### Main Skill File
- **SKILL.md** - Main skill documentation with workflows and patterns

### References (Load as needed)
- **references/guideline-template.md** - Standard structure for generated guidelines
- **references/component-patterns.md** - Proven patterns for component implementation

### Scripts
- **scripts/validate-guidelines.py** - Validates generated guideline markdown files

---

## Key Features

✅ **Comprehensive Analysis** - Extracts colors, typography, spacing, shadows, borders, and component patterns

✅ **Production Ready** - Generated guidelines and components are ready to use immediately

✅ **Consistent System** - All design tokens centralized and referenceable

✅ **Compliance Checking** - Validate components against guidelines

✅ **Multiple Output Formats** - React, Vue, HTML, Web Components

✅ **Detailed Documentation** - Every guideline includes specs, variants, and examples

✅ **State Handling** - Includes default, hover, active, disabled, error, focus states

✅ **Accessibility** - Recommends ARIA attributes and semantic HTML patterns

---

## Best Practices

### When Extracting Guidelines:
1. Provide a clear, high-quality UI image
2. Request all 13 component types
3. Ask for design tokens in markdown format
4. Request code examples for each component

### When Reviewing Components:
1. Paste full component code
2. Reference specific guideline sections
3. Ask for explicit compliance issues
4. Request corrected code

### When Generating Components:
1. Be specific about framework (React, Vue, etc.)
2. List all needed variants upfront
3. Request all component states
4. Ask for both TypeScript/JSDoc documentation and examples

---

## Common Requests Template

### Request: Extract Full Design System

```markdown
"Please extract UI design guidelines from my design template image.
Create a comprehensive markdown document with:

Colors:
- Primary, secondary, accent
- Semantic (success, warning, error, info)
- Neutral (text, background, border)
- Any gradients used

Typography:
- Font families (primary, secondary, mono)
- Font scales (h1-h6, body, caption)
- Font weights and line heights

Spacing:
- Base unit and scale multipliers

Visual Effects:
- Shadows by elevation level
- Border radius scales
- Transitions/animations

Components (all 13):
- Buttons, Cards, Badges, Modals
- Sidebar Navigation, Tags/Status Tags
- Forms (inputs, labels, helpers)
- Text Styles, Images, Tooltips
- Tables, Counters, Charts

For each component document:
- Visual description
- CSS/Tailwind specifications
- All variants
- All states (hover, active, disabled, error)
- Code example

Output format: Single markdown file with design tokens table"
```

### Request: Review Component Compliance

```markdown
"I have extracted design guidelines [paste guidelines].

Please review this component for compliance:
[paste component code]

Check for:
- Design token usage (colors, spacing, typography)
- State handling consistency
- Accessibility attributes
- Shadow elevation usage
- Border radius consistency

Provide:
- List of deviations with specific line references
- Corrected code
- Pattern recommendations"
```

### Request: Generate Component from Guidelines

```markdown
"Using these design guidelines [paste guidelines],
generate a production-ready React component for [component name].

Include:
- All specified variants
- All states (default, hover, active, disabled, error, focus)
- TypeScript types or JSDoc comments
- Usage examples
- Component props clearly documented

Use Tailwind CSS for styling with variables from the guidelines."
```

---

## Tips for Best Results

1. **Be Specific** - The more detail you provide, the better the output
2. **Reference Guidelines** - Always include or reference your guidelines when working with components
3. **Progressive Building** - Build one component at a time, then scale up
4. **Verify Output** - Review generated guidelines and code before adopting
5. **Iterate** - If something isn't right, provide feedback and corrections
6. **Store Guidelines** - Keep your extracted guidelines accessible for all future work

---

## Getting Help

If you need the skill to:
- **Extract from an image** - Upload the image and request guidelines extraction
- **Review code** - Provide both guidelines and code in your message
- **Generate components** - Provide guidelines and detailed component specifications
- **Validate** - Run `scripts/validate-guidelines.py` on your guidelines markdown file

---

## Next Steps

1. **Prepare your UI template image** (like your Sence Point example)
2. **Request guideline extraction** with all 13 component types
3. **Review the generated markdown file** with design tokens
4. **Start requesting component generation** following the guidelines
5. **Build your component library** with 100% design consistency

---

## Questions?

This skill is designed to be self-guided and comprehensive. Reference the included files for:
- **Workflow details**: See SKILL.md
- **Template structure**: See references/guideline-template.md
- **Component patterns**: See references/component-patterns.md
- **Validation**: Use scripts/validate-guidelines.py

Happy designing! 🎨
