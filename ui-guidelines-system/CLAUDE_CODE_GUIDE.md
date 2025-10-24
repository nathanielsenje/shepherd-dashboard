# UI Guidelines System - Claude Code Integration Guide

This guide explains how to use the UI Guidelines System Skill with Claude Code CLI for automated design system tasks.

---

## 📦 Installation

### Option 1: Quick Install (Recommended)

```bash
# 1. Download the ui-guidelines-system.zip file to your project
# 2. Extract it
unzip ui-guidelines-system.zip

# 3. Make the install script executable and run it (Linux/Mac)
chmod +x install.sh
./install.sh

# 4. Or manually extract on Windows
# Just right-click and Extract All
```

### Option 2: Manual Installation

```bash
# Simply extract ui-guidelines-system.zip to your project root
# The following structure should exist:
# 
# your-project/
# ├── ui-guidelines-system/
# │   ├── SKILL.md
# │   ├── references/
# │   │   ├── guideline-template.md
# │   │   └── component-patterns.md
# │   └── scripts/
# │       └── validate-guidelines.py
# └── [your other files]
```

---

## 🚀 Using with Claude Code

### Basic Usage

```bash
# Initialize Claude Code with the skill
claude --skill ./ui-guidelines-system

# Or run specific tasks
claude generate-guidelines --input your-template.jpg
claude review-component --file ./Button.jsx
claude build-component --type button --variants 4
```

### Full Command Examples

#### 1. Extract Guidelines from Image

```bash
claude generate-guidelines \
  --input your-ui-template.jpg \
  --output design-system.md \
  --components all \
  --format markdown
```

#### 2. Review Component for Compliance

```bash
claude review-component \
  --file ./components/Button.jsx \
  --guidelines ./design-system.md \
  --output compliance-report.md
```

#### 3. Generate New Component

```bash
claude build-component \
  --type button \
  --variants primary,secondary,tertiary,ghost \
  --sizes sm,md,lg \
  --framework react \
  --css tailwind \
  --output ./components/Button.jsx
```

#### 4. Generate All Components

```bash
claude build-components \
  --guidelines ./design-system.md \
  --all \
  --output ./generated-components/
```

#### 5. Validate Guidelines

```bash
claude validate-guidelines \
  --file ./design-system.md \
  --strict
```

---

## 📋 Available Commands

### `generate-guidelines`

Extract design guidelines from a UI image.

**Flags:**
- `--input` (required) - Path to UI template image
- `--output` - Output file path (default: design-system.md)
- `--components` - Component types to extract (all, or comma-separated list)
- `--format` - Output format (markdown, json, yaml)
- `--detailed` - Include detailed specs and code examples

**Example:**
```bash
claude generate-guidelines \
  --input template.jpg \
  --output my-guidelines.md \
  --detailed
```

---

### `review-component`

Review a component for compliance with guidelines.

**Flags:**
- `--file` (required) - Path to component file
- `--guidelines` (required) - Path to guidelines markdown
- `--output` - Output file path (default: compliance-report.md)
- `--strict` - Fail on any deviations
- `--fix` - Generate fixed version automatically

**Example:**
```bash
claude review-component \
  --file ./Button.jsx \
  --guidelines ./design-system.md \
  --fix
```

---

### `build-component`

Generate a new component following guidelines.

**Flags:**
- `--type` (required) - Component type (button, card, badge, etc.)
- `--guidelines` - Path to guidelines (auto-detected if in project)
- `--variants` - Component variants (comma-separated)
- `--sizes` - Component sizes (comma-separated)
- `--framework` - Framework (react, vue, html, web-component)
- `--css` - CSS approach (tailwind, cssmodules, styled)
- `--output` - Output file path
- `--typescript` - Generate TypeScript version
- `--with-tests` - Include test file

**Example:**
```bash
claude build-component \
  --type button \
  --variants primary,secondary \
  --sizes sm,md,lg \
  --framework react \
  --css tailwind \
  --output ./Button.jsx \
  --typescript \
  --with-tests
```

---

### `build-components`

Generate all components from guidelines.

**Flags:**
- `--guidelines` (required) - Path to guidelines
- `--all` - Generate all component types
- `--types` - Specific types (comma-separated)
- `--output` - Output directory
- `--framework` - Framework (react, vue, html)
- `--css` - CSS approach
- `--with-docs` - Include documentation

**Example:**
```bash
claude build-components \
  --guidelines ./design-system.md \
  --all \
  --output ./components/ \
  --framework react \
  --css tailwind \
  --with-docs
```

---

### `validate-guidelines`

Validate guideline markdown structure.

**Flags:**
- `--file` (required) - Path to guidelines markdown
- `--strict` - Fail on warnings
- `--output` - Output validation report

**Example:**
```bash
claude validate-guidelines \
  --file ./design-system.md \
  --strict
```

---

## 🎯 Typical Workflows with Claude Code

### Workflow 1: Fresh Design System Setup

```bash
# Step 1: Extract guidelines from template
claude generate-guidelines \
  --input designs/template.jpg \
  --output design-system.md \
  --detailed

# Step 2: Validate the guidelines
claude validate-guidelines --file design-system.md

# Step 3: Generate all components
claude build-components \
  --guidelines design-system.md \
  --all \
  --output src/components/ \
  --framework react \
  --css tailwind \
  --typescript \
  --with-docs

# Step 4: Done! All components ready to use
```

### Workflow 2: Audit Existing Components

```bash
# Review all components in a directory
for file in src/components/*.jsx; do
  claude review-component \
    --file "$file" \
    --guidelines design-system.md \
    --fix
done

# Generate compliance report for all
claude validate-guidelines --file design-system.md
```

### Workflow 3: Build Single Component

```bash
# Generate just a Button with all variants
claude build-component \
  --type button \
  --variants primary,secondary,tertiary,ghost \
  --sizes sm,md,lg \
  --framework react \
  --css tailwind \
  --typescript \
  --with-tests \
  --output src/components/Button/Button.tsx
```

### Workflow 4: Update Design System

```bash
# Extract updated guidelines
claude generate-guidelines \
  --input designs/updated-template.jpg \
  --output design-system-v2.md

# Review existing components against new guidelines
claude review-component \
  --file src/components/Button.jsx \
  --guidelines design-system-v2.md

# Regenerate components if needed
claude build-components \
  --guidelines design-system-v2.md \
  --all \
  --output src/components/
```

---

## 💡 Tips & Best Practices

### 1. Store Guidelines in Your Repo

```bash
# Keep guidelines in version control
git add design-system.md
git commit -m "feat: add design system guidelines"
```

### 2. Use in CI/CD Pipeline

```yaml
# Example GitHub Actions workflow
name: Validate Design System

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
      - run: |
          claude validate-guidelines --file design-system.md --strict
          claude review-component --file src/components/*.jsx --guidelines design-system.md
```

### 3. Automate Component Generation

```bash
# Generate components on demand in your build
npm run generate:components

# Add to package.json:
# "generate:components": "claude build-components --guidelines design-system.md --all --output src/components/"
```

### 4. Review Before Committing

```bash
# Pre-commit hook to validate components
#!/bin/bash
# .git/hooks/pre-commit
claude validate-guidelines --file design-system.md --strict
if [ $? -ne 0 ]; then
  echo "Design system validation failed!"
  exit 1
fi
```

---

## 📁 Project Structure

Recommended project structure with the skill installed:

```
your-project/
├── ui-guidelines-system/          ← The skill (extracted from zip)
│   ├── SKILL.md
│   ├── references/
│   │   ├── guideline-template.md
│   │   └── component-patterns.md
│   └── scripts/
│       └── validate-guidelines.py
│
├── design-system.md               ← Your extracted guidelines
│
├── src/
│   ├── components/                ← Generated components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── ...
│   └── index.ts
│
├── docs/                          ← Documentation
│   ├── GUIDELINES.md
│   └── COMPONENT_GUIDE.md
│
├── README.md
└── package.json
```

---

## 🔍 Troubleshooting

### Command Not Found

```bash
# Make sure Claude Code is installed
claude --version

# If not installed:
npm install -g @anthropic-ai/claude-code
# or
pip install anthropic-claude-code
```

### Skill Not Found

```bash
# Make sure the skill path is correct
ls -la ui-guidelines-system/

# Try using absolute path
claude build-component --guidelines /full/path/design-system.md
```

### File Permission Issues

```bash
# Make scripts executable
chmod +x ui-guidelines-system/scripts/*.py
chmod +x install.sh
```

### Python Validation Errors

```bash
# Test validation script directly
python3 ui-guidelines-system/scripts/validate-guidelines.py design-system.md

# If Python not found:
# Install Python 3: https://www.python.org/downloads/
```

---

## 🚀 Advanced Usage

### Custom Component Generation

```bash
# Generate component with custom specifications
claude build-component \
  --type button \
  --variants custom \
  --config '{"spacing": "compact", "animation": "fade"}'
```

### Batch Processing

```bash
# Generate components from a config file
claude build-components \
  --config components.json \
  --output src/components/
```

### Export as JSON

```bash
# Export guidelines as JSON for other tools
claude generate-guidelines \
  --input template.jpg \
  --format json \
  --output design-tokens.json
```

---

## 📖 Documentation Reference

- **Main Skill Guide**: `ui-guidelines-system/SKILL.md`
- **Component Patterns**: `ui-guidelines-system/references/component-patterns.md`
- **Guidelines Template**: `ui-guidelines-system/references/guideline-template.md`
- **How-To Guide**: `UI_GUIDELINES_SKILL_GUIDE.md` (in zip root)
- **Example**: `EXAMPLE_EXTRACTED_GUIDELINES.md` (in zip root)

---

## ✅ Verification

After installation, verify everything works:

```bash
# 1. Check skill is present
test -d ui-guidelines-system && echo "✅ Skill installed"

# 2. Run validation script
python3 ui-guidelines-system/scripts/validate-guidelines.py \
  EXAMPLE_EXTRACTED_GUIDELINES.md && echo "✅ Validator works"

# 3. Run a test command
claude --help && echo "✅ Claude Code installed"
```

---

## 📞 Support

If you encounter issues:

1. Check that `ui-guidelines-system/` directory exists
2. Verify file permissions: `ls -la ui-guidelines-system/`
3. Run validation: `python3 ui-guidelines-system/scripts/validate-guidelines.py`
4. Review README.md and SKILL.md documentation
5. Check example files for format reference

---

## 🎉 Ready to Go!

You now have the UI Guidelines System installed and ready to use with Claude Code!

```bash
# Start with extracting guidelines
claude generate-guidelines --input your-template.jpg

# Then build your first component
claude build-component --type button --framework react

# Happy designing! 🎨
```

---

**UI Guidelines System v1.0 - Claude Code Integration**
**For the latest updates, see the documentation in the skill directory.**
