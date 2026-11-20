# v0.6 — Database-driven encyclopedia

## One-time local upgrade

1. `git pull origin main`
2. `npm install`
3. `npx prisma migrate dev`
4. `npm run db:generate`
5. `npm run db:seed:encyclopedia`
6. `npm run dev`

Open `http://localhost:3000/editor` to edit article Markdown, save drafts, or mark an article for review/publication. Reader pages at `/topics` and `/topics/[slug]` load the database. Content updates no longer require Git.

## Data boundaries

- `EncyclopediaTopic`: a reusable subject, not a claim.
- `EncyclopediaArticle`: editable reader explanation in Markdown; `ArticleRevision` retains prior saves.
- `EncyclopediaAccount`: source-specific interpretation, speaker/questioner, passage locator, working URL and source status.
- `TopicConnection`: typed links between topics.
- Existing `Scripture`, `Passage`, `Claim`, `ClaimEvidence` remain intact for rigorous evidence tracking.

Initial import is idempotent and never overwrites existing article bodies. It imports the v0.5 topics and their source accounts, with expanded narrative drafts for Vasus and Rudras.

## Important limits

- Editor write actions are **disabled outside development** until authentication and authorization are added. Do not expose local development server to the internet.
- Markdown rendering is intentionally limited to headings, paragraphs, emphasis, and lists. It does not render raw HTML.
- Editing article text is available now. Account, source, relationship and topic editing will require additional forms.
- Article status is an editorial label, not an enforced multi-user approval workflow yet.
- The article about the 33 deities remains a code-backed overview; topic pages now use the database.
- Sanskrit base edition and recension for the working Upanishads.org.in reference remain unverified.
- A production deployment would need an accessible PostgreSQL database and authenticated editor.

## Troubleshooting

If `prisma migrate dev` reports drift from pre-existing manual schema changes, do not reset your database: stop and share the error so we can resolve it without data loss.
