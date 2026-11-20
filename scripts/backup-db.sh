#!/usr/bin/env bash
set -euo pipefail
mkdir -p backups
file="backups/hindu_mythology_$(date +%Y%m%d_%H%M%S).dump"
docker compose exec -T postgres sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -U postgres -d hindu_mythology -Fc' > "$file"
echo "Backup saved: $file"
