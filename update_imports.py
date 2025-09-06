#!/usr/bin/env python3
"""
Update styled-system imports to use workspace project package.

This script finds and replaces all styled-system import statements in TypeScript/TSX files
to use the new workspace package.
"""

import os
import re
from pathlib import Path
from typing import List, Tuple

# Configuration
WORKSPACE_PACKAGE = "@ryangreenup/panda-daisy-components-styled-system"


def find_typescript_files(root_dir: str) -> List[Path]:
    """
    Find all TypeScript and TSX files in the given directory and subdirectories.

    Args:
        root_dir: Root directory to search

    Returns:
        List of Path objects for TypeScript/TSX files
    """
    root = Path(root_dir)
    typescript_files = []

    for pattern in ["**/*.ts", "**/*.tsx", "**/*.mdx"]:
        typescript_files.extend(root.glob(pattern))

    return typescript_files


def update_styled_system_imports(file_path: Path) -> Tuple[bool, int]:
    """
    Update styled-system imports in a single file.

    Args:
        file_path: Path to the file to update

    Returns:
        Tuple of (was_modified, num_replacements)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except (OSError, UnicodeDecodeError) as e:
        print(f"Error reading {file_path}: {e}")
        return False, 0

    original_content = content
    replacements = 0

    # Pattern to match styled-system imports with relative paths
    # Matches patterns like: "../../styled-system/css", "../styled-system/jsx", etc.
    patterns = [
        # Match css imports: { css, cx } from "path/styled-system/css"
        (
            r'(import\s*{\s*[^}]*(?:css|cx)[^}]*}\s*from\s*["\'])(?:\.{1,2}/)*styled-system/css(["\'])',
            rf'\1{WORKSPACE_PACKAGE}/css\2'
        ),
        # Match jsx imports: { styled } from "path/styled-system/jsx"
        (
            r'(import\s*{\s*[^}]*styled[^}]*}\s*from\s*["\'])(?:\.{1,2}/)*styled-system/jsx(["\'])',
            rf'\1{WORKSPACE_PACKAGE}/jsx\2'
        ),
        # Match other css imports like: { cva, sva } from "path/styled-system/css"
        (
            r'(import\s*{\s*[^}]*(?:cva|sva)[^}]*}\s*from\s*["\'])(?:\.{1,2}/)*styled-system/css(["\'])',
            rf'\1{WORKSPACE_PACKAGE}/css\2'
        ),
        # Match type imports: import type { ... } from "path/styled-system/css"
        (
            r'(import\s+type\s*{\s*[^}]*}\s*from\s*["\'])(?:\.{1,2}/)*styled-system/(css|jsx)(["\'])',
            rf'\1{WORKSPACE_PACKAGE}/\2\3'
        ),
    ]

    for pattern, replacement in patterns:
        new_content, count = re.subn(pattern, replacement, content)
        content = new_content
        replacements += count

    # Write back only if changes were made
    if content != original_content:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, replacements
        except OSError as e:
            print(f"Error writing {file_path}: {e}")
            return False, 0

    return False, 0


def main():
    """Main function to update all styled-system imports."""
    # Get the current working directory
    root_dir = os.getcwd()
    for dir in ['src', 'stories']:
        src_dir = os.path.join(root_dir, 'src')

        # Check if src directory exists
        if not os.path.exists(src_dir):
            print(f"Error: 'src' directory not found in {root_dir}")
            print("Please run this script from the project root directory.")
            return 1

        print(f"Searching for TypeScript files in: {src_dir}")

        # Find all TypeScript files
        typescript_files = find_typescript_files(src_dir)

        if not typescript_files:
            print("No TypeScript/TSX files found.")
            return 0

        print(f"Found {len(typescript_files)} TypeScript/TSX files")

        # Update imports in each file
        total_files_modified = 0
        total_replacements = 0

        for file_path in typescript_files:
            was_modified, replacements = update_styled_system_imports(file_path)

            if was_modified:
                total_files_modified += 1
                total_replacements += replacements
                print(f"Updated {file_path.relative_to(Path(root_dir))}: {replacements} import(s) replaced")

        # Summary
        print(f"\nSummary:")
        print(f"  Files processed: {len(typescript_files)}")
        print(f"  Files modified: {total_files_modified}")
        print(f"  Total imports replaced: {total_replacements}")

        if total_files_modified > 0:
            print(f"\nSuccessfully updated styled-system imports to use:")
            print(f"  {WORKSPACE_PACKAGE}/css")
            print(f"  {WORKSPACE_PACKAGE}/jsx")

    return 0


if __name__ == "__main__":
    exit(main())
