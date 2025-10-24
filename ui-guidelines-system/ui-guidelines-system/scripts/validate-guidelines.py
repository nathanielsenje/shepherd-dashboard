#!/usr/bin/env python3
"""
Validate UI Guidelines Markdown document structure and content.
Ensures generated guidelines follow the template format and contain required sections.
"""

import re
import sys
from pathlib import Path


class GuidelineValidator:
    """Validates UI guidelines markdown documents."""

    REQUIRED_SECTIONS = [
        "Color Palette",
        "Typography",
        "Spacing Scale",
        "Components",
        "Buttons",
        "Cards",
    ]

    COMPONENT_SECTIONS = [
        "Buttons",
        "Cards",
        "Badges",
        "Modals",
        "Sidebar Navigation",
        "Tags",
        "Forms",
        "Text Styles",
        "Images",
        "Tooltips",
        "Tables",
        "Counters",
        "Charts",
    ]

    def __init__(self, filepath):
        self.filepath = Path(filepath)
        self.content = None
        self.errors = []
        self.warnings = []

    def load(self):
        """Load markdown file."""
        try:
            self.content = self.filepath.read_text()
            return True
        except FileNotFoundError:
            self.errors.append(f"File not found: {self.filepath}")
            return False

    def validate(self):
        """Run all validation checks."""
        if not self.load():
            return False

        self.check_frontmatter()
        self.check_sections()
        self.check_color_palette()
        self.check_typography()
        self.check_components()
        self.check_tables()
        self.check_code_examples()

        return len(self.errors) == 0

    def check_frontmatter(self):
        """Verify markdown has frontmatter."""
        if not self.content.startswith("---"):
            self.warnings.append("Document should start with YAML frontmatter (---)")

    def check_sections(self):
        """Check for required main sections."""
        for section in self.REQUIRED_SECTIONS:
            pattern = rf"^#{{{1,3}}}\s+{re.escape(section)}"
            if not re.search(pattern, self.content, re.MULTILINE):
                self.errors.append(f"Missing required section: {section}")

    def check_color_palette(self):
        """Validate color palette section."""
        if "Color Palette" in self.content:
            # Check for hex color values
            hex_pattern = r"#[0-9A-Fa-f]{6}\b"
            if not re.search(hex_pattern, self.content):
                self.warnings.append(
                    "Color Palette section should include hex color values"
                )

    def check_typography(self):
        """Validate typography section."""
        if "Typography" in self.content:
            # Check for font size mentions
            if not re.search(r"(font-size|px|rem)", self.content, re.IGNORECASE):
                self.warnings.append(
                    "Typography section should include font size specifications"
                )

    def check_components(self):
        """Validate component documentation."""
        components_found = []
        for component in self.COMPONENT_SECTIONS:
            pattern = rf"^#{{{2,4}}}\s+{re.escape(component)}"
            if re.search(pattern, self.content, re.MULTILINE):
                components_found.append(component)

        if not components_found:
            self.errors.append("No component sections found")
        else:
            print(f"✓ Found documentation for: {', '.join(components_found)}")

    def check_tables(self):
        """Verify tables are properly formatted."""
        table_pattern = r"\|.*?\|.*?\n\s*\|.*?\|"
        if not re.search(table_pattern, self.content):
            self.warnings.append(
                "Guideline should include structured tables for design tokens"
            )

    def check_code_examples(self):
        """Verify code examples are present."""
        code_pattern = r"```(\w+)"
        if not re.search(code_pattern, self.content):
            self.warnings.append("Guideline should include code examples")

    def report(self):
        """Print validation report."""
        print("\n" + "=" * 60)
        print("GUIDELINE VALIDATION REPORT")
        print("=" * 60)
        print(f"File: {self.filepath}\n")

        if self.errors:
            print("❌ ERRORS:")
            for error in self.errors:
                print(f"  • {error}")
            print()

        if self.warnings:
            print("⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"  • {warning}")
            print()

        if not self.errors and not self.warnings:
            print("✅ All validation checks passed!")
            print()

        status = "PASS" if not self.errors else "FAIL"
        print(f"Status: {status}")
        print("=" * 60 + "\n")


def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print("Usage: validate-guidelines.py <guideline-file.md>")
        sys.exit(1)

    validator = GuidelineValidator(sys.argv[1])

    if validator.validate():
        validator.report()
        sys.exit(0)
    else:
        validator.report()
        sys.exit(1)


if __name__ == "__main__":
    main()
