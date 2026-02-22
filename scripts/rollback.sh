#!/usr/bin/env bash
set -e

APP_NAME="InterFrieght"
PORT="3000"

echo "🔁 Rolling back $APP_NAME to previous version..."

# Stop and remove current container
docker stop "$APP_NAME" || true
docker rm "$APP_NAME" || true

# Start previous image
docker run -d \
  --name "$APP_NAME" \
  -p "$PORT:$PORT" \
  interfrieght:previous

echo "✅ Rollback complete for $APP_NAME"