# Local setup — file-based wiki

## Requirements

- Git
- Node.js 22 or newer
- npm

## Run

```powershell
git pull origin main
npm install
npm run dev
```

Open http://localhost:3000.

There is **no database, Prisma client, Docker Compose service, migration, or seed command** in the active application. Content is stored in `content/pages/*.json` and `content/scriptures/*.json`.

Edit wiki articles at http://localhost:3000/editor in local development or modify JSON files directly. Changes made in the browser write to the local files, not automatically to GitHub; commit them to share.

## Preserving old local PostgreSQL data

Removing the database code from Git does **not** delete your existing local PostgreSQL volume. Do not delete it if you have unexported edits you want to keep. The previous export scripts and schema can be recovered from Git history if necessary. The initial seeded encyclopedia articles were committed as JSON files, but later local DB-only edits were not automatically imported.

The earlier research-dashboard and database-design documents are historical planning material, not current setup instructions.
