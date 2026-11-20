#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 1 || ! -f "$1" ]]; then
  echo "Usage: bash scripts/restore-db.sh backups/filename.dump" >&2
  exit 1
fi
echo "WARNING: This will overwrite objects in your local hindu_mythology database."
read -r -p "Type RESTORE to continue: " confirm
[[ "$confirm" == "RESTORE" ]] || exit 1
docker compose exec -T postgres sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" pg_restore -U postgres -d hindu_mythology --clean --if-exists --no-owner' < "$1"
echo "Restore completed."
