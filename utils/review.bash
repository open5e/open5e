#!/bin/bash

# Usage: review [pr<#>|<COMMITISH>] <COMPARISON>
#
# Checks out the commit as a new worktree, builds from scratch,
# then walks you through reviewing the changes in a browser and in diffs
# against the ref <COMPARISON> (defaults to master)
#
# NB: Mac-only

# Parse args and set vars
repo_path="$(git rev-parse --show-toplevel)"
comparison="${2-master}"

if [[ "$1" == pr* ]]; then
  prnum=${1#pr}
  git fetch origin pull/$prnum/head:pr-$prnum
  ref=pr-$prnum
else
  ref="$1"
fi

reviewpath="$repo_path"/../$(basename "$repo_path")-"$ref"-review
comparepath="$repo_path"/../$(basename "$repo_path")-"$comparison"-review

#Get to work
git worktree add -f "$reviewpath" "$ref"
git worktree add -f "$comparepath" "$comparison"

make -C "$reviewpath" html &
make -C "$comparepath" html &
wait

files=($(git --no-pager diff --name-only "$comparison".."$ref"))
for i in ${!files[@]}; do
  f="${files[$i]}"
  echo $i $f

  if [[ "$f" != source/* ]] || [[ "$f" != *.rst ]]; then
    echo "$f, a non-text file was changed! You should review it separately."
    continue
  fi

  htmlname="${f#source/}"
  htmlname="build/html/${htmlname%.rst}.html"
  open "$reviewpath/$htmlname"
  open "$comparepath/$htmlname"
  git --no-pager diff "$comparison".."$ref" "$f"
  read -p "Reviewing file $i of ${#files[@]}. Enter to continue or e to exit: " response
  [ "$response" = "e" ] && break
done

# Cleanup
rm -rf "$reviewpath"
rm -rf "$comparepath"
git worktree prune