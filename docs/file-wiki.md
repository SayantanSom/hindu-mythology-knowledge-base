# File-based encyclopedia

All active encyclopedia content is stored as local JSON files. There is no runtime database dependency.

- `content/pages/*.json` — stable page IDs, Markdown bodies, references and related-page links.
- `content/scriptures/*.json` — scripture introductions and chapter outlines.
- `/editor` — local development editor, saves the article body into its JSON file.

Do not invent complete English chapter translations: add verified readings with translation attribution or explicitly marked explanatory retellings.

Previous Prisma/PostgreSQL work remains in Git history. Local database data is not deleted by this refactor. If unexported database edits matter, retrieve the historical export script from Git history before removing the local database.
