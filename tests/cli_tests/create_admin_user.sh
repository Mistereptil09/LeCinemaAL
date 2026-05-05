#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"

EMAIL="${1:-${ADMIN_EMAIL:-admin@test.com}}"
PASSWORD="${2:-${ADMIN_PASS:-Password123!}}"
FIRST_NAME="${3:-${ADMIN_FIRST_NAME:-Admin}}"
LAST_NAME="${4:-${ADMIN_LAST_NAME:-User}}"

cd "$ROOT_DIR"
node ace create:admin-user \
  --email="$EMAIL" \
  --password="$PASSWORD" \
  --first-name="$FIRST_NAME" \
  --last-name="$LAST_NAME" \
  --upsert
