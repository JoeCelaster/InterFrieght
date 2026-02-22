#!/usr/bin/env bash
set -e

PORT="3000"
HEALTH_URL="http://localhost:$PORT/health"

echo "🩺 Running health check at $HEALTH_URL ..."

# Try for up to ~30 seconds
for i in {1..10}; do
  if curl -fsS "$HEALTH_URL" > /dev/null; then
    echo "✅ Health check passed"
    exit 0
  fi
  echo "⏳ Waiting for app to become healthy..."
  sleep 3
done

echo "❌ Health check failed"
exit 1