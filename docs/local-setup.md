# Local-first development setup

## Prerequisites

- Git
- Docker Desktop (or Docker Engine with Compose)
- Node.js 20+ and npm

## Start the database

1. Clone the private GitHub repository and open its directory.
2. Copy `.env.example` to `.env`.
3. Run `docker compose up -d`.
4. Run `docker compose ps` and wait for the PostgreSQL container to become healthy.
5. Run `npm install`.
6. Run `npm run db:generate`.
7. Run `npm run db:migrate -- --name initial_catalogue`.
8. Run `npm run db:seed`.
9. Run `npm run db:studio` to browse the seeded records locally.

The example password is **development-only**. Change both the Compose `POSTGRES_PASSWORD` setting and the password in your local `.env` before storing sensitive data. The PostgreSQL port binds to localhost only.

## Stop and restart

- Stop without deleting data: `docker compose down`
- Restart: `docker compose up -d`
- **Do not** use `docker compose down -v` unless you intentionally want to delete the database volume.

## Backups and migration

- Backup: `bash scripts/backup-db.sh`
- Restore into a compatible local database: `bash scripts/restore-db.sh backups/<filename>.dump`
- The backup scripts require Bash and Docker Compose. On Windows, use Git Bash or WSL.
- The `backups/` directory is ignored by Git. Store backup copies securely elsewhere.
- To move hosting later, provision a PostgreSQL instance, transfer data using pg_dump/pg_restore, configure `DATABASE_URL`, run verified migrations, and deploy the same application code. Test restore before relying on backups.

## Current implementation status

This repository currently includes a Prisma database schema and sample catalogue seed data. It does **not** yet contain a Next.js web application or admin UI. Docker/Prisma commands have not been executed on your machine from this chat; local installation and validation remain necessary.
