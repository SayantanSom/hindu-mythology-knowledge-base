# Research dashboard v0.3

## Added

- Recension creation linked to each scripture.
- Edition metadata (editor, publisher, year, source URL, rights).
- Passage locators and optional rights-aware original text.
- Translation metadata (not copyrighted full translations).
- Proposed claims linked to specific edition passages.
- Research notes with draft/review statuses.

## Run locally (Windows PowerShell)

From the repository folder:

```powershell
git pull origin main
npm install
npm run db:generate
npm run db:migrate -- --name research_notes
npm run dev
```

Open http://localhost:3000/scriptures, select a scripture, then click **Research & evidence**.

## Important safeguards and limitations

- **Do not enter unverified recension names, editions, or passages as established facts.** The forms intentionally begin empty.
- Claims are always created with status `PROPOSED`; do not promote them without editorial verification.
- A text field is not proof of a citation. Record a traceable edition and exact locator before making claims.
- The schema currently supports one passage per claim through this form, although additional evidence links can be added in the database.
- Research note review states are manual labels, not authenticated scholarly approval.
- No authentication, audit log, deletion workflow, claim verification UI, or automatic rights checking yet.
- The development server must remain local/private. **Do not expose this admin interface publicly.**
- Existing six scripture records are preserved by the additive Prisma migration.
- Back up your database before migrations: `bash scripts/backup-db.sh` in Git Bash/WSL.
- The code has been committed to GitHub but not yet run or tested on your local machine.
