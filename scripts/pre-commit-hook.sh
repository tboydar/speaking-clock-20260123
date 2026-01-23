#!/bin/bash

# Auto-increment version on commit
# Run this as part of your git workflow

./scripts/increment-version.sh

# Stage the updated files
git add VERSION src/pages/index.astro 2>/dev/null || true
