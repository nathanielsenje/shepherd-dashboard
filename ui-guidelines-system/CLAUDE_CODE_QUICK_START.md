# 🚀 UI Guidelines System - Claude Code Quick Start

**Get up and running with Claude Code in 5 minutes!**

---

## 📥 Step 1: Extract the Zip File

```bash
# Extract ui-guidelines-system.zip in your project
unzip ui-guidelines-system.zip

# Or on Windows, right-click → Extract All
```

After extraction, your project should look like:

```
your-project/
├── ui-guidelines-system/
│   ├── SKILL.md
│   ├── cli.py
│   ├── references/
│   ├── scripts/
│   └── ...
├── README.md
├── CLAUDE_CODE_GUIDE.md  ← Read this next
└── ... (other docs)
```

---

## 🎯 Step 2: Make Scripts Executable (Linux/Mac)

```bash
chmod +x install.sh
chmod +x ui-guidelines-system/scripts/validate-guidelines.py
chmod +x ui-guidelines-system/cli.py
```

---

## 🤖 Step 3: Use with Claude Code

### Option A: Direct Integration

```bash
# Run skill directly with Claude Code
claude --skill ./ui-guidelines-system

# Then ask Claude to use the skill
# "Extract UI guidelines from my template image"
# "Generate Button component with these variants..."
# "Review my component for compliance"
```

### Option B: CLI Commands

```bash
# Run commands directly
python ui-guidelines-system/cli.py generate-guidelines --input template.jpg
python ui-guidelines-system/cli.py build-component --type button --framework react
python ui-guidelines-system/cli.py validate-guidelines --file design-system.md
```

### Option C: With NPM Scripts (Recommended)

Add to your `package.json`:

```json
{
  "scripts": {
    "extract-guidelines": "python ui-guidelines-system/cli.py generate-guidelines --input",
    "generate-component": "python ui-guidelines-system/cli.py build-component",
    "validate-design": "python ui-guidelines-system/cli.py validate-guidelines --file design-system.md",
    "build-all-components": "python ui-guidelines-system/cli.py build-components --guidelines design-system.md --all"
  }
}
```

Then use:

```bash
npm run extract-guidelines -- --input template.jpg
npm run generate-component -- --type button
npm run validate-design
npm run build-all-components
```

---

## 📋 Step 4: Choose Your First Command

### Extract Guidelines First

```bash
# Upload your UI template image and run:
python ui-guidelines-system/cli.py generate-guidelines \
  --input your-ui-template.jpg \
  --output design-system.md \
  --detailed

# Result: design-system.md with all design tokens and components specs
```

### Or Generate a Component

```bash
# Generate a Button component
python ui-guidelines-system/cli.py build-component \
  --type button \
  --variants primary,secondary,tertiary,ghost \
  --sizes sm,md,lg \
  --framework react \
  --css tailwind \
  --typescript

# Result: Production-ready React component
```

### Or Review a Component

```bash
# Review your existing Button component
python ui-guidelines-system/cli.py review-component \
  --file src/components/Button.jsx \
  --guidelines design-system.md \
  --fix

# Result: Compliance report and fixed version
```

---

## 🎓 Common Commands

### Extract Guidelines

```bash
python ui-guidelines-system/cli.py generate-guidelines \
  --input template.jpg \
  --output design-system.md \
  --detailed
```

**Result:** Markdown file with all design tokens and component specs

### Generate Single Component

```bash
python ui-guidelines-system/cli.py build-component \
  --type button \
  --variants primary,secondary,tertiary \
  --sizes sm,md,lg \
  --framework react \
  --css tailwind \
  --typescript \
  --with-tests
```

**Result:** Button.tsx with all variants, states, and tests

### Generate All Components

```bash
python ui-guidelines-system/cli.py build-components \
  --guidelines design-system.md \
  --all \
  --output src/components/ \
  --framework react \
  --typescript
```

**Result:** All 13 components in src/components/

### Review Component Compliance

```bash
python ui-guidelines-system/cli.py review-component \
  --file src/components/Button.jsx \
  --guidelines design-system.md \
  --fix
```

**Result:** Compliance report and auto-fixed component

### Validate Guidelines

```bash
python ui-guidelines-system/cli.py validate-guidelines \
  --file design-system.md \
  --strict
```

**Result:** Validation report

---

## 📖 Available Options

### generate-guidelines

```
--input FILE              Path to UI template (required)
--output FILE             Output file (default: design-system.md)
--components LIST         Component types (default: all)
--format FORMAT           markdown|json|yaml (default: markdown)
--detailed                Include detailed specs and examples
```

### build-component

```
--type TYPE               Component type (required)
--variants LIST           Comma-separated variants
--sizes LIST              Comma-separated sizes
--framework FRAMEWORK     react|vue|html|web-component (default: react)
--css APPROACH            tailwind|cssmodules|styled (default: tailwind)
--output FILE             Output file path
--typescript              Generate TypeScript
--with-tests              Include test file
```

### build-components

```
--guidelines FILE         Path to guidelines (required)
--all                     Generate all component types
--types LIST              Specific types (comma-separated)
--output DIR              Output directory (default: ./components)
--framework FRAMEWORK     react|vue|html (default: react)
--css APPROACH            tailwind|cssmodules|styled (default: tailwind)
--with-docs               Include documentation
```

### review-component

```
--file FILE               Component file to review (required)
--guidelines FILE         Path to guidelines (required)
--output FILE             Output file (default: compliance-report.md)
--strict                  Fail on any deviations
--fix                     Auto-generate fixed version
```

### validate-guidelines

```
--file FILE               Guidelines markdown (required)
--strict                  Fail on warnings
--output FILE             Output validation report
```

---

## 🎯 Step-by-Step Workflow

### For New Design System

```bash
# 1. Extract guidelines from your template
python ui-guidelines-system/cli.py generate-guidelines \
  --input designs/template.jpg \
  --output design-system.md \
  --detailed

# 2. Validate the guidelines
python ui-guidelines-system/cli.py validate-guidelines \
  --file design-system.md \
  --strict

# 3. Generate all components
python ui-guidelines-system/cli.py build-components \
  --guidelines design-system.md \
  --all \
  --output src/components/ \
  --framework react \
  --typescript \
  --with-docs

# 4. Done! Commit to git
git add -A
git commit -m "feat: add design system and components"
```

### For Existing Components

```bash
# 1. Review each component
python ui-guidelines-system/cli.py review-component \
  --file src/components/Button.jsx \
  --guidelines design-system.md \
  --fix

# 2. Check compliance
python ui-guidelines-system/cli.py validate-guidelines \
  --file design-system.md

# 3. Commit updates
git add -A
git commit -m "fix: align components with design system"
```

---

## 🔧 Troubleshooting

### Python Not Found

```bash
# Install Python 3.7+
# macOS: brew install python3
# Windows: https://www.python.org/downloads/
# Linux: sudo apt-get install python3
```

### Permission Denied

```bash
# Make scripts executable
chmod +x ui-guidelines-system/cli.py
chmod +x ui-guidelines-system/scripts/*.py
```

### File Not Found

```bash
# Make sure you're in the right directory
cd your-project

# Check files exist
ls -la ui-guidelines-system/
ls -la design-system.md
```

### Claude Code Not Installed

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Or use npx to run without installing
npx @anthropic-ai/claude-code --help
```

---

## 💡 Pro Tips

### 1. Use in CI/CD

```yaml
# GitHub Actions example
- name: Validate Design System
  run: python ui-guidelines-system/cli.py validate-guidelines --file design-system.md --strict
```

### 2. Git Pre-commit Hook

```bash
# .git/hooks/pre-commit
#!/bin/bash
python ui-guidelines-system/cli.py validate-guidelines --file design-system.md --strict
if [ $? -ne 0 ]; then echo "Design system validation failed!"; exit 1; fi
```

### 3. Generate Components on Demand

```bash
# Add to package.json scripts
"generate": "python ui-guidelines-system/cli.py build-components --guidelines design-system.md --all"

# Run: npm run generate
```

### 4. Store Guidelines in Repo

```bash
# Version control your design system
git add design-system.md
git commit -m "docs: update design system"
```

---

## 📚 Next Steps

1. **Extract guidelines** with your UI template
2. **Generate components** for your project
3. **Review compliance** of existing components
4. **Validate** with the Python script
5. **Commit everything** to version control
6. **Use in CI/CD** for automated validation

---

## 📖 Full Documentation

- **CLAUDE_CODE_GUIDE.md** - Complete guide with all commands
- **README.md** - Overview of everything
- **UI_GUIDELINES_SKILL_GUIDE.md** - Detailed usage examples
- **EXAMPLE_EXTRACTED_GUIDELINES.md** - Real example output
- **ui-guidelines-system/SKILL.md** - Technical documentation

---

## ✅ You're Ready!

```bash
# Extract the zip
unzip ui-guidelines-system.zip

# Make scripts executable (Mac/Linux)
chmod +x install.sh && ./install.sh

# Run your first command
python ui-guidelines-system/cli.py generate-guidelines --help

# Start building! 🎨
```

---

## 🎉 Happy Coding!

Your design system is now ready to use with Claude Code.

**Questions?** Check the full documentation in the extracted files.

---

**UI Guidelines System v1.0 - Claude Code Ready** ✨
