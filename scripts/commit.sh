#!/bin/bash

# Smart Commit Script with Auto-Versioning
# Usage: ./scripts/commit.sh "commit message"

# Run version increment
./scripts/increment-version.sh

# Stage all changes including version updates
git add -A

# Create commit with provided message
git commit -m "$1" -m "Co-Authored-By: Claude <noreply@anthropic.com>"

# Show the new version
echo "✅ Committed with version: $(cat VERSION)"
