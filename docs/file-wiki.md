# Local-file wiki (first phase)

The encyclopedia topic pages at `/topics` and `/topics/[slug]` now read `content/pages/<slug>.json`, not PostgreSQL. Each page has a stable `id`, a human-readable `slug`, a title, Markdown body, source-specific accounts and links to other existing pages. Missing links are not rendered. The original `/articles/33-vedic-deities` page remains unchanged.

## Edit

Use `/editor` in local development to edit the Markdown body, or edit the JSON directly to change metadata, citations, accounts and links. The local editor writes to the working tree. Commit file changes when ready to share or deploy. A local edit does not automatically push to GitHub.

## Preserving earlier database edits

If you edited articles or source accounts in PostgreSQL after the initial seed, run `npm run wiki:export-db` **once**, after pulling this change and before making new file-based edits. This overwrites the corresponding JSON files with database versions and writes a `.before-db-export.bak` backup beside each file. Review the diff before committing. If you never edited database content, do not run the export; the checked-in JSON files contain the original seeded article text. The database is not dropped or reset.

## Scope

This first phase converts the encyclopedia topics and their editor. The existing scripture catalogue at `/scriptures` and its creation/detail pages still use Prisma/PostgreSQL. They are not yet converted to chapter-wise local scripture pages. Do not remove PostgreSQL or Prisma until those routes have been migrated. The local JSON format is deliberately simple and can be imported into a database or object store later.
