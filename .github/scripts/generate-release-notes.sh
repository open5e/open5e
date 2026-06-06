#!/usr/bin/env bash
set -euo pipefail

base_ref="${1:-origin/staging}"
previous_tag="$(git tag -l 'v*' --sort=-v:refname | head -n1 || true)"

if [[ -z "$previous_tag" ]]; then
  echo "## Changes"
  git log "$base_ref" --pretty=format:'- %s (%h)' --no-merges
elif git merge-base --is-ancestor "$previous_tag" "$base_ref"; then
  echo "## Changes since ${previous_tag}"
  git log "${previous_tag}..${base_ref}" --pretty=format:'- %s (%h)' --no-merges
else
  echo "## Changes"
  echo "- Release ${base_ref} (${base_ref#origin/})"
fi
