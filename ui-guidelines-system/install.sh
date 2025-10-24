#!/usr/bin/env bash
# UI Guidelines System Skill - Installation Script
# Run this to extract and set up the skill in your project

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  UI Guidelines System Skill - Installation                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if zip file exists
if [ ! -f "ui-guidelines-system.zip" ]; then
    echo "❌ Error: ui-guidelines-system.zip not found in current directory"
    echo "Please make sure ui-guidelines-system.zip is in your project root"
    exit 1
fi

# Extract the zip file
echo "📦 Extracting files..."
unzip -q ui-guidelines-system.zip -d . 2>/dev/null || true

# Verify extraction
if [ -d "ui-guidelines-system" ]; then
    echo "✅ Files extracted successfully"
else
    echo "⚠️  Warning: ui-guidelines-system directory not found"
fi

# Make Python script executable
if [ -f "ui-guidelines-system/scripts/validate-guidelines.py" ]; then
    chmod +x ui-guidelines-system/scripts/validate-guidelines.py
    echo "✅ Made validation script executable"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Installation Complete! ✨                                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📁 Directory Structure:"
echo "   ├── README.md (Start here!)"
echo "   ├── ui-guidelines-system/"
echo "   │   ├── SKILL.md"
echo "   │   ├── references/"
echo "   │   │   ├── guideline-template.md"
echo "   │   │   └── component-patterns.md"
echo "   │   └── scripts/"
echo "   │       └── validate-guidelines.py"
echo "   └── [Other documentation files]"
echo ""
echo "🚀 Next Steps:"
echo "   1. Read README.md for overview"
echo "   2. Run: code . (to open in VS Code)"
echo "   3. Use with Claude Code: claude ./ui-guidelines-system"
echo ""
echo "📝 Example Claude Code Commands:"
echo "   • claude generate-guidelines"
echo "   • claude review-component <path>"
echo "   • claude build-component <name>"
echo ""
echo "✅ You're ready to go!"
