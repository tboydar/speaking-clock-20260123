#!/bin/bash

# Version Auto-Increment Script
# Usage: ./scripts/increment-version.sh

VERSION_FILE="VERSION"
CURRENT_VERSION=$(cat "$VERSION_FILE" 2>/dev/null || echo "v20260123.0")

# Extract version parts (format: vYYYYMMDD.patch)
VERSION_PREFIX="v20260123"
PATCH=$(echo "$CURRENT_VERSION" | sed "s/${VERSION_PREFIX}.//")

# Increment patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="${VERSION_PREFIX}.${NEW_PATCH}"

# Save new version
echo "$NEW_VERSION" > "$VERSION_FILE"

# Update version in index.astro
sed -i '' "s/v20260123\.[0-9]*/${NEW_VERSION}/" src/pages/index.astro

echo "Version incremented: $CURRENT_VERSION → $NEW_VERSION"
