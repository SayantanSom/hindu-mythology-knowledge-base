# Local database setup

Prerequisites: Node.js 20+, npm, PostgreSQL 15+.

1. Copy `.env.example` to `.env` and update `DATABASE_URL` with local credentials.
2. Create the PostgreSQL database named in the URL.
3. Run `npm install`.
4. Run `npm run db:generate`.
5. Run `npm run db:migrate -- --name initial_catalogue`.
6. Run `npm run db:seed`.
7. Run `npm run db:studio` to browse/edit records.

**Important:** This is a database/research starter, not yet a Next.js website. No database has been provisioned and no migration has been executed in the connected GitHub repository. Seed records are examples with provisional classifications; they are not a verified corpus of scripture passages.

Before production, add authenticated editorial access, migration checks, structured bibliography, explicit rights metadata, and tests. Do not expose database credentials in Git.
