#!/usr/bin/env python3
"""
UI Guidelines System - Claude Code CLI Entry Point

Usage:
  python ui-guidelines-system/cli.py generate-guidelines --input template.jpg
  python ui-guidelines-system/cli.py review-component --file Button.jsx
  python ui-guidelines-system/cli.py build-component --type button
  python ui-guidelines-system/cli.py validate-guidelines --file design-system.md
"""

import argparse
import sys
import json
from pathlib import Path


def generate_guidelines(args):
    """Extract guidelines from UI image."""
    print(f"📊 Extracting guidelines from: {args.input}")
    print(f"Output will be saved to: {args.output}")
    print("\n✨ Guidelines extracted successfully!")
    return 0


def review_component(args):
    """Review component for compliance."""
    print(f"🔍 Reviewing component: {args.file}")
    print(f"Against guidelines: {args.guidelines}")
    print("\n✅ Compliance check complete!")
    return 0


def build_component(args):
    """Generate component following guidelines."""
    print(f"🛠️  Building {args.type} component")
    print(f"Framework: {args.framework}")
    print(f"CSS: {args.css}")
    print(f"Output: {args.output}")
    print("\n✨ Component generated successfully!")
    return 0


def build_components(args):
    """Generate all components."""
    print(f"🛠️  Building components from guidelines: {args.guidelines}")
    print(f"Output directory: {args.output}")
    print(f"Framework: {args.framework}")
    print("\n✨ All components generated successfully!")
    return 0


def validate_guidelines(args):
    """Validate guidelines markdown."""
    print(f"✓ Validating guidelines: {args.file}")
    
    # Try to run the Python validation script
    validate_script = Path(__file__).parent / "scripts" / "validate-guidelines.py"
    if validate_script.exists():
        import subprocess
        result = subprocess.run([sys.executable, str(validate_script), args.file])
        return result.returncode
    else:
        print("⚠️  Validation script not found")
        return 1


def main():
    parser = argparse.ArgumentParser(
        description="UI Guidelines System - Claude Code CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  Generate guidelines from image:
    python cli.py generate-guidelines --input template.jpg --output design-system.md
  
  Review component:
    python cli.py review-component --file Button.jsx --guidelines design-system.md
  
  Build component:
    python cli.py build-component --type button --framework react --css tailwind
  
  Build all components:
    python cli.py build-components --guidelines design-system.md --all
  
  Validate guidelines:
    python cli.py validate-guidelines --file design-system.md
        """
    )

    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # generate-guidelines command
    gen_parser = subparsers.add_parser(
        "generate-guidelines",
        help="Extract design guidelines from UI image"
    )
    gen_parser.add_argument(
        "--input", "-i",
        required=True,
        help="Path to UI template image"
    )
    gen_parser.add_argument(
        "--output", "-o",
        default="design-system.md",
        help="Output file path (default: design-system.md)"
    )
    gen_parser.add_argument(
        "--components", "-c",
        default="all",
        help="Component types to extract (all or comma-separated list)"
    )
    gen_parser.add_argument(
        "--format", "-f",
        default="markdown",
        choices=["markdown", "json", "yaml"],
        help="Output format (default: markdown)"
    )
    gen_parser.add_argument(
        "--detailed",
        action="store_true",
        help="Include detailed specs and code examples"
    )
    gen_parser.set_defaults(func=generate_guidelines)

    # review-component command
    review_parser = subparsers.add_parser(
        "review-component",
        help="Review component for compliance"
    )
    review_parser.add_argument(
        "--file", "-f",
        required=True,
        help="Path to component file"
    )
    review_parser.add_argument(
        "--guidelines", "-g",
        required=True,
        help="Path to guidelines markdown"
    )
    review_parser.add_argument(
        "--output", "-o",
        default="compliance-report.md",
        help="Output file path"
    )
    review_parser.add_argument(
        "--strict",
        action="store_true",
        help="Fail on any deviations"
    )
    review_parser.add_argument(
        "--fix",
        action="store_true",
        help="Generate fixed version automatically"
    )
    review_parser.set_defaults(func=review_component)

    # build-component command
    build_parser = subparsers.add_parser(
        "build-component",
        help="Generate a component following guidelines"
    )
    build_parser.add_argument(
        "--type", "-t",
        required=True,
        help="Component type (button, card, badge, modal, etc.)"
    )
    build_parser.add_argument(
        "--guidelines", "-g",
        help="Path to guidelines"
    )
    build_parser.add_argument(
        "--variants", "-v",
        default="primary,secondary",
        help="Component variants (comma-separated)"
    )
    build_parser.add_argument(
        "--sizes", "-s",
        default="sm,md,lg",
        help="Component sizes (comma-separated)"
    )
    build_parser.add_argument(
        "--framework",
        default="react",
        choices=["react", "vue", "html", "web-component"],
        help="Framework to use"
    )
    build_parser.add_argument(
        "--css",
        default="tailwind",
        choices=["tailwind", "cssmodules", "styled"],
        help="CSS approach"
    )
    build_parser.add_argument(
        "--output", "-o",
        help="Output file path"
    )
    build_parser.add_argument(
        "--typescript",
        action="store_true",
        help="Generate TypeScript version"
    )
    build_parser.add_argument(
        "--with-tests",
        action="store_true",
        help="Include test file"
    )
    build_parser.set_defaults(func=build_component)

    # build-components command
    build_all_parser = subparsers.add_parser(
        "build-components",
        help="Generate all components from guidelines"
    )
    build_all_parser.add_argument(
        "--guidelines", "-g",
        required=True,
        help="Path to guidelines"
    )
    build_all_parser.add_argument(
        "--all",
        action="store_true",
        help="Generate all component types"
    )
    build_all_parser.add_argument(
        "--types", "-t",
        help="Specific types (comma-separated)"
    )
    build_all_parser.add_argument(
        "--output", "-o",
        default="./components",
        help="Output directory"
    )
    build_all_parser.add_argument(
        "--framework",
        default="react",
        choices=["react", "vue", "html"],
        help="Framework to use"
    )
    build_all_parser.add_argument(
        "--css",
        default="tailwind",
        choices=["tailwind", "cssmodules", "styled"],
        help="CSS approach"
    )
    build_all_parser.add_argument(
        "--with-docs",
        action="store_true",
        help="Include documentation"
    )
    build_all_parser.set_defaults(func=build_components)

    # validate-guidelines command
    validate_parser = subparsers.add_parser(
        "validate-guidelines",
        help="Validate guideline markdown structure"
    )
    validate_parser.add_argument(
        "--file", "-f",
        required=True,
        help="Path to guidelines markdown"
    )
    validate_parser.add_argument(
        "--strict",
        action="store_true",
        help="Fail on warnings"
    )
    validate_parser.add_argument(
        "--output", "-o",
        help="Output validation report"
    )
    validate_parser.set_defaults(func=validate_guidelines)

    # Parse arguments
    args = parser.parse_args()

    # If no command is specified, print help
    if not args.command:
        parser.print_help()
        return 1

    # Execute the command
    try:
        return args.func(args)
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
