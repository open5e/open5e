#!/usr/bin/env bash

export BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Checking for required inputs"
echo "....."

[ -z "$DJANGO_SECRET" ] && { echo "Missing required environment variable DJANGO_SECRET"; exit 1; }
[ -z "$OPEN5E_DEBUG" ] && { echo "Missing required environment variable OPEN5E_DEBUG"; exit 1; }
[ -z "$HOST" ] && { echo "Missing required environment variable HOST"; exit 1; }

docker build -f "$(dirname $BASE_DIR)/Dockerfile" \
  --build-arg DJANGO_SECRET="$DJANGO_SECRET" \
  --build-arg OPEN5E_DEBUG="$OPEN5E_DEBUG" \
  --build-arg HOST="$HOST" \
  -t open5e-api .
