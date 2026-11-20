# Hindu Mythology Encyclopedia

A file-based, English-first encyclopedia of Hindu scriptures, people, deities and concepts.

## Local development

Requires Node.js 22 or newer.

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

No PostgreSQL, Docker, Prisma, migrations or environment database variables are required.

## Content

- `content/pages/*.json`: independent wiki pages with stable IDs, Markdown articles, source-specific accounts and related-page links.
- `content/scriptures/*.json`: scripture overviews, chapter outlines and source links. Full English chapter readings will be added only after editorial verification.
- `/topics`: browse wiki pages.
- `/scriptures`: browse scripture pages.
- `/editor`: local-development-only editor for wiki article bodies.

The original `/articles/33-vedic-deities` remains intact.

## Editing

Use the local editor or edit JSON files directly. Changes made locally are stored in your working tree; commit them when you want them shared. Git records history. Never commit copyrighted translations without appropriate rights.

## Prior database

The former Prisma/PostgreSQL code was removed from the application, **not** from your local database. No database reset or deletion is performed. Historical code remains available in Git history. If you made edits to PostgreSQL that were not exported to the checked-in JSON files, preserve your local database and recover/export them from the previous revision before deleting any Docker volumes.

## Editorial approach

Tell the stories and explain teachings in accessible English, link only genuine connections, distinguish different scriptural accounts, and provide exact source references. Sanskrit text is optional.
